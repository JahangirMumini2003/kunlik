// ===== Section 5 — ROI calculator for the CFO (fully reactive) =====
function roiFmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

const ROI_EMP_MAX = 15000;
const ROI_SAL_MAX = 25000000;
const ROI_BRANCH = 5500000000; // ~стоимость нового филиала

function ROICalc() {
  const [emp, setEmp] = React.useState(1400);
  const [sal, setSal] = React.useState(3000000);

  const e = Math.max(1, emp), net = Math.max(1, sal);
  // В штате
  const brutto = net / 0.88;              // оклад до НДФЛ 12%
  const ndfl = brutto - net;              // НДФЛ 12% (внутри)
  const social = brutto * 0.12;           // соцналог 12% (сверху)
  const staffPer = brutto + social;       // итого за 1 чел в штате
  // С Rizq Kunlik
  const b2b = net / 0.95;                  // итого по B2B счёту за 1 чел
  const commission = b2b * 0.04;           // комиссия Rizq 4%
  const selfTax = b2b * 0.01;              // налог самозанятого 1%
  const platPer = b2b;                     // итого за 1 чел на платформе
  // Экономия
  const savePer = staffPer - platPer;
  const saveMonth = savePer * e;
  const saveYear = saveMonth * 12;
  const pct = savePer / staffPer * 100;
  const branches = Math.floor(saveYear / ROI_BRANCH);

  const onNum = (raw, max, setter) => {
    const digits = raw.replace(/\D/g, '');
    if (digits === '') { setter(0); return; }
    setter(Math.min(max, parseInt(digits, 10)));
  };
  const trackBg = (val, min, max) => {
    const p = ((Math.max(min, val) - min) / (max - min)) * 100;
    return { background: `linear-gradient(to right, var(--brand) ${p}%, var(--line-2) ${p}%)` };
  };

  return (
    <section className="calc sec-pad" id="calc">
      <div className="wrap">
        <div className="bn-head">
          <span className="eyebrow">ROI-калькулятор для финансового директора</span>
          <h2 className="sec-title">Мгновенный расчёт окупаемости<br />и налоговой оптимизации</h2>
          <p className="sec-sub">Логика построена на налогах Узбекистана 2026: в штате НДФЛ 12% + соцналог 12%; на платформе налог самозанятого 1% + фикс-комиссия Kunlik 4%.</p>
        </div>

        <div className="calc-card calc-card--roi">
          {/* ---- inputs ---- */}
          <div className="calc-in">
            <h3 className="calc-h">Параметры</h3>
            <div className="cfield">
              <label>Количество исполнителей</label>
              <div className="cnum">
                <input type="text" inputMode="numeric" value={emp === 0 ? '' : roiFmt(emp)} onChange={ev => onNum(ev.target.value, ROI_EMP_MAX, setEmp)} />
                <span className="cunit">чел.</span>
              </div>
              <input type="range" className="crange" min="1" max={ROI_EMP_MAX} step="1" value={e} style={trackBg(e, 1, ROI_EMP_MAX)} onChange={ev => setEmp(Number(ev.target.value))} />
            </div>

            <div className="cfield">
              <label>Чистая ЗП на руки за месяц</label>
              <div className="cnum">
                <input type="text" inputMode="numeric" value={sal === 0 ? '' : roiFmt(sal)} onChange={ev => onNum(ev.target.value, ROI_SAL_MAX, setSal)} />
                <span className="cunit">сум</span>
              </div>
              <input type="range" className="crange" min="500000" max={ROI_SAL_MAX} step="100000" value={Math.max(500000, net)} style={trackBg(net, 500000, ROI_SAL_MAX)} onChange={ev => setSal(Number(ev.target.value))} />
            </div>

            <div className="calc-foot-note">
              Расчёт обновляется мгновенно. Суммы указаны на одного исполнителя в месяц, если не указано иное.
            </div>
          </div>

          {/* ---- results ---- */}
          <div className="calc-out">
            <span className="calc-out-eyebrow">Структура затрат на 1 человека</span>

            <div className="struct">
              <div className="struct-col now">
                <div className="struct-h"><i className="cmp-dot red"></i> Сейчас · в штате</div>
                <div className="struct-row"><span>Начисленный оклад (брутто)</span><b className="mono">{roiFmt(brutto)}</b></div>
                <div className="struct-row"><span>НДФЛ 12% (внутри)</span><b className="mono">{roiFmt(ndfl)}</b></div>
                <div className="struct-row"><span>Соцналог 12% (сверху)</span><b className="mono">{roiFmt(social)}</b></div>
                <div className="struct-total"><span>Итого за 1 чел.</span><b className="mono">{roiFmt(staffPer)}</b></div>
              </div>
              <div className="struct-col riz">
                <div className="struct-h"><i className="cmp-dot green"></i> С Kunlik</div>
                <div className="struct-row"><span>Выплата исполнителю</span><b className="mono">{roiFmt(net)}</b></div>
                <div className="struct-row"><span>Комиссия Kunlik 4%</span><b className="mono">{roiFmt(commission)}</b></div>
                <div className="struct-row"><span>Налог самозанятого 1%</span><b className="mono">{roiFmt(selfTax)}</b></div>
                <div className="struct-total"><span>Итого по B2B счёту</span><b className="mono">{roiFmt(platPer)}</b></div>
              </div>
            </div>

            <div className="benefit">
              <div className="ben-top">
                <span>Чистая месячная экономия на всех</span>
                <span className="ben-pct mono">−{pct.toFixed(1)}%</span>
              </div>
              <div className="ben-bignum mono">{roiFmt(saveMonth)} <i>сум/мес</i></div>
              <div className="ben-rows">
                <div className="ben-row"><span>Экономия за 1 человека / мес</span><b className="mono">+{roiFmt(savePer)}</b></div>
                <div className="ben-row year"><span>За 1 год на всех</span><b className="mono">+{roiFmt(saveYear)}</b></div>
              </div>
              {branches >= 1 && (
                <div className="ben-foot">Этих денег хватит на открытие <b>{branches}</b> {branches === 1 ? 'нового филиала' : 'новых филиалов'} за год.</div>
              )}
            </div>

            <a href="https://t.me/jahangirmumini" target="_blank" rel="noopener" className="btn btn-primary btn-lg calc-cta">Получить демо-доступ</a>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ROICalc = ROICalc;
