// ===== B2B company dashboard (tabbed web panels) =====
const B2B_TABS = [
  { k: 'requests', label: 'Заявки' },
  { k: 'create', label: 'Создать смену' },
  { k: 'fin', label: 'Финансы' },
  { k: 'reg', label: 'Реквизиты' },
  { k: 'erp', label: 'Интеграции' },
];

function dashFmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

const AV = [
  ['АК', '#E8362E'], ['МР', '#0A8F4E'], ['ДЮ', '#2F6BD6'], ['СА', '#6D28D9'],
  ['НФ', '#F58220'], ['ОБ', '#0072BC'], ['ЖК', '#16A06B'], ['РТ', '#D81F26'],
];
function Avatars({ filled }) {
  const show = Math.min(4, filled);
  const rest = filled - show;
  return (
    <div className="avstack">
      {Array.from({ length: show }, (_, i) => (
        <span key={i} className="av" style={{ background: AV[i % AV.length][1] }}>{AV[i % AV.length][0]}</span>
      ))}
      {rest > 0 && <span className="av av-more">+{rest}</span>}
    </div>
  );
}

function Dashboard() {
  const [tab, setTab] = React.useState('requests');
  return (
    <section className="dash sec-pad" id="b2b">
      <div className="wrap">
        <div className="dash-head">
          <span className="eyebrow">Личный кабинет компании</span>
          <h2 className="sec-title">Панель управления для ритейла</h2>
          <p className="sec-sub">Заявки и люди, создание смен с расчётом стоимости, финансы и интеграции — весь временный персонал в одном дашборде.</p>
        </div>

        <div className="browser">
          <div className="br-bar">
            <span className="br-dots"><i></i><i></i><i></i></span>
            <span className="br-url"><span className="lock"></span>business.kunlik.uz</span>
          </div>
          <div className="br-inner">
            <aside className="dash-side">
              <div className="ds-brand"><KunlikGlyph size={20} /><b>Kunlik Business</b></div>
              <nav className="ds-nav">
                {B2B_TABS.map(t => (
                  <button key={t.k} className={tab === t.k ? 'on' : ''} onClick={() => setTab(t.k)}>
                    <span className="ds-ico" data-k={t.k}></span>{t.label}
                  </button>
                ))}
              </nav>
              <button className="ds-create" onClick={() => setTab('create')}>+ Создать смену</button>
              <div className="ds-org">
                <span className="ds-org-logo">K</span>
                <div><b>Anglesey Food</b><span>Сеть Korzinka</span></div>
              </div>
            </aside>
            <div className="dash-main" key={tab}>
              {tab === 'requests' && <DRequests onCreate={() => setTab('create')} />}
              {tab === 'create' && <DCreate />}
              {tab === 'fin' && <DFin />}
              {tab === 'reg' && <DReg />}
              {tab === 'erp' && <DErp />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Заявки: shifts + people ---- */
const REQ_DAYS = [['пн', '02'], ['вт', '03'], ['ср', '04'], ['чт', '05'], ['пт', '06'], ['сб', '07'], ['вс', '08']];
const REQUESTS = [
  { time: '08:00–20:00', task: 'Выкладка товара', branch: 'Себзар', need: 15, filled: 15, status: 'done-ok', label: 'Укомплектовано' },
  { time: '09:00–13:00', task: 'Сборка заказов', branch: 'Чиланзар', need: 15, filled: 12, status: 'progress', label: 'Идёт набор' },
  { time: '17:00–21:00', task: 'Кассир-приёмщик', branch: 'Юнусабад', need: 8, filled: 6, status: 'progress', label: 'Идёт набор' },
  { time: '08:00–16:00', task: 'Фасовка', branch: 'Сергели', need: 10, filled: 10, status: 'finished', label: 'Завершено' },
];
function DRequests({ onCreate }) {
  return (
    <div className="dpanel">
      <div className="dp-headrow">
        <div>
          <div className="dp-step">Смены и исполнители</div>
          <h3 className="dp-title">Заявки на 6 июня</h3>
        </div>
        <button className="btn btn-primary sm" onClick={onCreate}>+ Создать смену</button>
      </div>

      <div className="reqdays">
        {REQ_DAYS.map(([wd, dd], i) => (
          <div key={dd} className={'reqday' + (i === 4 ? ' on' : '')}>
            <span className="rd-wd">{wd}</span><span className="rd-dd">{dd}</span>
            <span className={'rd-dot' + ([0, 1, 3, 4].includes(i) ? ' has' : '')}></span>
          </div>
        ))}
      </div>

      <div className="reqlist">
        {REQUESTS.map((r, i) => (
          <div className="req" key={i}>
            <div className="req-time"><b className="mono">{r.time}</b><span>{r.task}</span></div>
            <div className="req-branch"><span className="req-pin"></span>{r.branch}</div>
            <div className="req-people">
              <Avatars filled={r.filled} />
              <div className="req-fill">
                <b>{r.filled} из {r.need}</b>
                <div className="req-bar"><i className={r.status} style={{ width: (r.filled / r.need * 100) + '%' }}></i></div>
              </div>
            </div>
            <span className={'req-status ' + r.status}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Создать смену + расчёт стоимости ---- */
function DCreate() {
  const [people, setPeople] = React.useState(15);
  const rate = 136364;
  const fund = rate * people;
  const commission = fund * 0.04;
  const total = fund + commission;
  const step = d => setPeople(p => Math.min(50, Math.max(1, p + d)));
  return (
    <div className="dpanel">
      <div className="dp-step">Новое задание</div>
      <h3 className="dp-title">Создание смены</h3>
      <div className="create-grid">
        <div className="create-form">
          <div className="form-grid">
            <div className="dp-field"><label>Филиал</label><div className="inp sel">Korzinka «Себзар» <span className="chev">▾</span></div></div>
            <div className="dp-field"><label>Тип задачи</label><div className="inp sel">Выкладка товара <span className="chev">▾</span></div></div>
            <div className="dp-field"><label>Дата</label><div className="inp sel">Пятница, 6 июня <span className="chev">▾</span></div></div>
            <div className="dp-field"><label>Время</label><div className="inp sel">17:00 – 21:00 <span className="chev">▾</span></div></div>
          </div>

          <div className="dp-field">
            <label>Ставка за смену <span className="ai-pill">ИИ · рекомендовано</span></label>
            <div className="inp rate-inp"><span className="mono">{dashFmt(rate)}</span> <i>сум / исполнитель</i></div>
          </div>

          <div className="dp-field">
            <label>Нужно исполнителей</label>
            <div className="stepper">
              <button onClick={() => step(-1)} aria-label="Меньше">−</button>
              <span className="mono">{people}</span>
              <button onClick={() => step(1)} aria-label="Больше">+</button>
              <span className="stepper-note">человек</span>
            </div>
          </div>
        </div>

        <div className="cost-card">
          <div className="cost-h">Расчёт стоимости</div>
          <div className="cost-row"><span>Ставка × исполнителей</span><b className="mono">{dashFmt(rate)} × {people}</b></div>
          <div className="cost-row"><span>Фонд выплат исполнителям</span><b className="mono">{dashFmt(fund)}</b></div>
          <div className="cost-row"><span>Комиссия Kunlik · 4%</span><b className="mono">{dashFmt(commission)}</b></div>
          <div className="cost-total">
            <span>Итого к списанию с баланса</span>
            <b className="mono">{dashFmt(total)} <i>сум</i></b>
          </div>
          <div className="cost-note"><span className="ok-dot"></span> Исполнители получают выплату сразу после смены. Налог самозанятого 1% удерживается автоматически — без нагрузки на компанию.</div>
          <button className="btn btn-primary block">Опубликовать на витрину Kunlik</button>
        </div>
      </div>
    </div>
  );
}

/* ---- Финансы ---- */
const PAYOUTS = [
  ['6 июня', 'Выкладка · Себзар', 15, 2127278, 'Оплачено'],
  ['5 июня', 'Сборка · Чиланзар', 12, 1701822, 'Оплачено'],
  ['5 июня', 'Кассир · Юнусабад', 8, 1134544, 'Оплачено'],
];
function DFin() {
  return (
    <div className="dpanel">
      <div className="dp-balrow">
        <div>
          <div className="dp-step">Баланс компании</div>
          <div className="dp-bal mono">500 000 000 <i>сум</i></div>
        </div>
        <button className="btn btn-primary">Пополнить счёт</button>
      </div>

      <div className="fin-stats">
        <div className="fin-stat">
          <span>Потрачено в июне</span>
          <b className="mono">128 400 000</b>
          <div className="bar"><i style={{ width: '26%' }}></i></div>
        </div>
        <div className="fin-stat">
          <span>Активных смен</span>
          <b className="mono">38</b>
          <span className="fin-sub">412 исполнителей за месяц</span>
        </div>
      </div>

      <p className="dp-label">Реестр выплат · автоматические акты ГНК</p>
      <div className="payouts">
        <div className="po-head"><span>Смена</span><span>Исп.</span><span>Сумма</span><span>Статус</span></div>
        {PAYOUTS.map((p, i) => (
          <div className="po-row" key={i}>
            <div className="po-name"><b>{p[1]}</b><span>{p[0]}</span></div>
            <span className="mono po-n">{p[2]}</span>
            <span className="mono po-sum">{dashFmt(p[3])}</span>
            <span className="po-status"><span className="ok-dot"></span>{p[4]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Реквизиты (онбординг) ---- */
function DReg() {
  return (
    <div className="dpanel">
      <div className="dp-step">Реквизиты компании</div>
      <h3 className="dp-title">Верификация юридического лица</h3>
      <div className="dp-row">
        <div className="dp-field grow">
          <label>ИНН организации</label>
          <div className="inp"><span className="mono">201 456 789</span></div>
        </div>
        <button className="btn btn-ghost">Подтянуть данные из ЕПИГУ</button>
      </div>
      <div className="autofill">
        <div className="af-row"><span>Название</span><b>ИП ООО «Anglesey Food» (сеть Korzinka)</b></div>
        <div className="af-row"><span>Юр. адрес</span><b>г. Ташкент, Яккасарайский р-н, ул. Шота Руставели, 18</b></div>
        <div className="af-row"><span>Статус в ЕПИГУ</span><b className="ok"><span className="ok-dot"></span> Действующее</b></div>
      </div>
      <button className="btn btn-primary">Подписать соглашение по ЭЦП</button>
    </div>
  );
}

/* ---- Интеграции ---- */
function DErp() {
  return (
    <div className="dpanel">
      <div className="dp-step">Интеграция с системами предприятия</div>
      <h3 className="dp-title">Синхронизация с 1С / ERP</h3>
      <div className="integ">
        <div className="ig-row">
          <span className="ig-logo c1">1С</span>
          <div className="ig-body"><b>1С: Предприятие</b><span className="ok"><span className="ok-dot"></span> Подключено по API</span></div>
          <button className="btn btn-ghost sm">Синхронизация</button>
        </div>
        <div className="ig-row">
          <span className="ig-logo c2">SAP</span>
          <div className="ig-body"><b>SAP · Workday</b><span className="muted">Доступны вебхуки</span></div>
          <button className="btn btn-ghost sm">Настроить</button>
        </div>
      </div>
      <div className="dp-note">При закрытии смены в Kunlik табель рабочего времени в 1С обновляется автоматически. Сводный реестр актов формируется раз в неделю.</div>
    </div>
  );
}

window.Dashboard = Dashboard;
