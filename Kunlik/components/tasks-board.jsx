// ===== Live shifts board with working filters + app modal =====
const PARTNERS = [
  { name: 'Korzinka', letter: 'K', color: '#E8362E' },
  { name: 'Texnomart', letter: 'T', color: '#F58220' },
  { name: 'Max Way', letter: 'M', color: '#0A8F4E' },
  { name: 'EVOS', letter: 'E', color: '#D81F26' },
  { name: 'Makro', letter: 'Mk', color: '#0072BC' },
  { name: 'Anglesey Food', letter: 'A', color: '#6D28D9' },
];
const SERVICES = ['Выкладка товара', 'Сборка заказов', 'Фасовка', 'Контроль выкладки', 'Кассир-приёмщик', 'Инвентаризация', 'Доставка товаров'];
const ADDRESSES = [
  'Чиланзарский р-н, ул. Бунёдкор, 12', 'Яккасарайский р-н, ул. Шота Руставели, 18',
  'Мирзо-Улугбекский р-н, ул. Буюк Ипак Йули, 75', 'Юнусабадский р-н, ул. Амира Темура, 108',
  'Себзар, ул. Зарбог, 4', 'Сергелийский р-н, ул. Янги Сергели, 30',
  'Алмазарский р-н, ул. Дурмон Йули, 22', 'Учтепинский р-н, ул. Катартал, 25',
];

function fmt(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
function shiftKind(h) { return h < 6 ? 'Ночь' : h < 12 ? 'Утро' : h < 18 ? 'День' : 'Вечер'; }
function pad(n) { return (n < 10 ? '0' : '') + n; }

// deterministic dataset — ~6 shifts per day, 7 days
const SHIFTS = (() => {
  const out = [];
  let id = 0;
  for (let day = 0; day < 7; day++) {
    const count = [6, 6, 5, 5, 4, 3, 3][day];
    for (let i = 0; i < count; i++) {
      const k = (day * 7 + i * 3) % SERVICES.length;
      const p = PARTNERS[(day * 2 + i) % PARTNERS.length];
      const startH = [6, 8, 9, 12, 14, 18][(i + day) % 6];
      const dur = [4, 5, 6, 8][(i * 2 + day) % 4];
      const base = 110000 + ((day * 3 + i * 7) % 9) * 14000;
      const range = (i % 3 !== 0);
      out.push({
        id: id++, day, service: SERVICES[k], partner: p,
        address: ADDRESSES[(day + i * 3) % ADDRESSES.length],
        startH, endH: (startH + dur) % 24, dur,
        kind: shiftKind(startH),
        payMin: base, payMax: range ? base + dur * 26000 : null,
      });
    }
  }
  return out;
})();

const RU_WD = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const RU_MON = ['янв', 'фев', 'мар', 'апр', 'мая', 'июня', 'июля', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const WEEK = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(2026, 5, 1 + i);
  return { idx: i, wd: RU_WD[d.getDay()], dd: pad(d.getDate()), mon: RU_MON[d.getMonth()] };
});

const SORTS = [['pay', 'По оплате'], ['time', 'По времени начала'], ['dur', 'По длительности']];
const KINDS = ['Утро', 'День', 'Вечер', 'Ночь'];
const DURS = [['s', 'До 4 часов'], ['m', '4–8 часов'], ['l', 'Более 8 часов']];

function TaskBoard() {
  const [day, setDay] = React.useState(1);
  const [sort, setSort] = React.useState('pay');
  const [svc, setSvc] = React.useState([]);
  const [prt, setPrt] = React.useState([]);
  const [kinds, setKinds] = React.useState([]);
  const [durs, setDurs] = React.useState([]);
  const [modal, setModal] = React.useState(null); // selected shift or null
  const [openSec, setOpenSec] = React.useState('svc');

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  const durBucket = h => h < 4 ? 's' : h <= 8 ? 'm' : 'l';

  const list = React.useMemo(() => {
    let r = SHIFTS.filter(s => s.day === day);
    if (svc.length) r = r.filter(s => svc.includes(s.service));
    if (prt.length) r = r.filter(s => prt.includes(s.partner.name));
    if (kinds.length) r = r.filter(s => kinds.includes(s.kind));
    if (durs.length) r = r.filter(s => durs.includes(durBucket(s.dur)));
    r = [...r];
    if (sort === 'pay') r.sort((a, b) => (b.payMax || b.payMin) - (a.payMax || a.payMin));
    if (sort === 'time') r.sort((a, b) => a.startH - b.startH);
    if (sort === 'dur') r.sort((a, b) => b.dur - a.dur);
    return r;
  }, [day, svc, prt, kinds, durs, sort]);

  const activeCount = svc.length + prt.length + kinds.length + durs.length;
  const reset = () => { setSvc([]); setPrt([]); setKinds([]); setDurs([]); };

  return (
    <section className="board sec-pad" id="board">
      <div className="wrap">
        <h2 className="board-title">Более <span className="hl">8 000</span> смен каждый день</h2>

        <div className="board-grid">
          <aside className="board-side">
            {/* date picker */}
            <div className="datecard">
              <div className="dc-head">
                <b>{WEEK[day].dd} {WEEK[day].mon}, {WEEK[day].wd}</b>
                <span className="dc-nav">
                  <button onClick={() => setDay(d => Math.max(0, d - 1))} aria-label="Раньше">‹</button>
                  <button onClick={() => setDay(d => Math.min(6, d + 1))} aria-label="Позже">›</button>
                </span>
              </div>
              <div className="dc-week">
                {WEEK.map(w => (
                  <button key={w.idx} className={'dc-day' + (w.idx === day ? ' on' : '')} onClick={() => setDay(w.idx)}>
                    <span className="dc-wd">{w.wd}</span>
                    <span className="dc-dd">{w.dd}</span>
                  </button>
                ))}
              </div>
              <div className="dc-today">Сегодня 01 июня</div>
            </div>

            {/* filters */}
            <div className="filters">
              <FilterSec title="Сортировка" open={openSec === 'sort'} onToggle={() => setOpenSec(openSec === 'sort' ? '' : 'sort')}>
                {SORTS.map(([k, l]) => (
                  <label key={k} className="frow radio-row">
                    <input type="radio" name="sort" checked={sort === k} onChange={() => setSort(k)} />
                    <span className="rdot"></span>{l}
                  </label>
                ))}
              </FilterSec>

              <FilterSec title="Услуга" count={SERVICES.length} open={openSec === 'svc'} onToggle={() => setOpenSec(openSec === 'svc' ? '' : 'svc')}>
                {SERVICES.map(s => (
                  <label key={s} className="frow">
                    <input type="checkbox" checked={svc.includes(s)} onChange={() => toggle(svc, setSvc, s)} />
                    <span className="cbox"></span>{s}
                  </label>
                ))}
              </FilterSec>

              <FilterSec title="Партнёр" count={PARTNERS.length} open={openSec === 'prt'} onToggle={() => setOpenSec(openSec === 'prt' ? '' : 'prt')}>
                {PARTNERS.map(p => (
                  <label key={p.name} className="frow">
                    <input type="checkbox" checked={prt.includes(p.name)} onChange={() => toggle(prt, setPrt, p.name)} />
                    <span className="cbox"></span>{p.name}
                  </label>
                ))}
              </FilterSec>

              <FilterSec title="Начало задания" open={openSec === 'kind'} onToggle={() => setOpenSec(openSec === 'kind' ? '' : 'kind')}>
                {KINDS.map(k => (
                  <label key={k} className="frow">
                    <input type="checkbox" checked={kinds.includes(k)} onChange={() => toggle(kinds, setKinds, k)} />
                    <span className="cbox"></span>{k}
                  </label>
                ))}
              </FilterSec>

              <FilterSec title="Продолжительность" open={openSec === 'dur'} onToggle={() => setOpenSec(openSec === 'dur' ? '' : 'dur')} last>
                {DURS.map(([k, l]) => (
                  <label key={k} className="frow">
                    <input type="checkbox" checked={durs.includes(k)} onChange={() => toggle(durs, setDurs, k)} />
                    <span className="cbox"></span>{l}
                  </label>
                ))}
              </FilterSec>
            </div>
          </aside>

          {/* cards */}
          <div className="board-main">
            <div className="board-bar">
              <span className="board-found">Найдено смен: <b>{list.length}</b></span>
              {activeCount > 0 && <button className="board-reset" onClick={reset}>Сбросить фильтры ({activeCount})</button>}
            </div>
            {list.length === 0 ? (
              <div className="board-empty">
                <span className="be-ic">∅</span>
                <b>На этот день смен по фильтрам нет</b>
                <p>Попробуйте выбрать другой день или сбросить фильтры.</p>
              </div>
            ) : (
              <div className="cards">
                {list.map(s => (
                  <article className="taskcard" key={s.id}>
                    <div className="tc-top">
                      <h3>{s.service}</h3>
                      <span className="tc-logo" style={{ background: s.partner.color }}>{s.partner.letter}</span>
                    </div>
                    <div className="tc-meta">{WEEK[s.day].dd} {WEEK[s.day].mon} · {pad(s.startH)}:00–{pad(s.endH)}:00 · {s.kind.toLowerCase()}</div>
                    <div className="tc-place">
                      <b>{s.partner.name}</b>
                      <span>{s.address}</span>
                    </div>
                    <div className="tc-divider"></div>
                    <div className="tc-bottom">
                      <div className="tc-pay">
                        <span className="mono">{s.payMax ? `от ${fmt(s.payMin)} до ${fmt(s.payMax)}` : `~${fmt(s.payMin)}`} <i>сум</i></span>
                        <em>вы получите за смену</em>
                      </div>
                      <button className="btn btn-primary" onClick={() => setModal(s)}>Взять задание</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {modal && <TakeModal shift={modal} onClose={() => setModal(null)} />}
    </section>
  );
}

function FilterSec({ title, count, open, onToggle, last, children }) {
  return (
    <div className={'fsec' + (last ? ' last' : '')}>
      <button className="fsec-head" onClick={onToggle} aria-expanded={open}>
        <span>{title}{count != null && <i className="fsec-count"> ({count})</i>}</span>
        <span className={'fchev' + (open ? ' up' : '')}>▾</span>
      </button>
      <div className={'fsec-body' + (open ? ' open' : '')}><div className="fsec-inner">{children}</div></div>
    </div>
  );
}

function TakeModal({ shift, onClose }) {
  React.useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, []);
  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Закрыть">×</button>
        <div className="modal-left">
          <span className="eyebrow">Kunlik</span>
          <h3>Возьмите смену<br />в приложении</h3>
          <div className="modal-task">
            <span className="tc-logo sm" style={{ background: shift.partner.color }}>{shift.partner.letter}</span>
            <div>
              <b>{shift.service}</b>
              <span>{shift.partner.name} · {pad(shift.startH)}:00–{pad(shift.endH)}:00</span>
            </div>
            <span className="modal-pay mono">{fmt(shift.payMax || shift.payMin)}<i>сум</i></span>
          </div>
          <p className="modal-note">Отсканируйте QR-код или скачайте приложение, чтобы открыть самозанятость и закрепить смену за собой.</p>
          <StoreBadges />
        </div>
        <div className="modal-right">
          <div className="modal-qr"><QR /></div>
          <span className="modal-scan">Наведите камеру телефона</span>
        </div>
      </div>
    </div>
  );
}

window.TaskBoard = TaskBoard;
