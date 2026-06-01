// ===== B2B ROI calculator — fully reactive, no gating =====
function roiFmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

const ROI_EMP_MAX = 15000;
const ROI_SAL_MAX = 25000000;
const ROI_BRANCH = 5500000000; // ~стоимость нового филиала

function ROICalc() {
  const [emp, setEmp] = React.useState(1400);
  const [sal, setSal] = React.useState(3000000);
  const [shifts, setShifts] = React.useState(22);

  // protect against empty / NaN — use 1 in the math
  const e = Math.max(1, emp), s = Math.max(1, sal), d = Math.max(1, shifts);
  const perStaff = s / 0.88 * 1.12;
  const perPlat = s / 0.95;
  const totalStaff = perStaff * e;
  const totalPlat = perPlat * e;
  const diffMonth = totalStaff - totalPlat;
  const diffDay = diffMonth / d;
  const diffYear = diffMonth * 12;
  const pct = diffMonth / totalStaff * 100;
  const branches = Math.floor(diffYear / ROI_BRANCH);

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
          <span className="eyebrow">Калькулятор экономии</span>
          <h2 className="sec-title">Посчитайте чистую разницу<br />за один клик</h2>
          <p className="sec-sub">Двигайте ползунки — расчёт обновляется мгновенно. Налоги Узбекистана 2026: в штате НДФЛ 12% + соцналог 12%, на платформе налог самозанятого 1% + комиссия Kunlik 4%.</p>
        </div>

        <div className="calc-card">
          {/* ---- inputs ---- */}
          <div className="calc-in">
            <h3 className="calc-h">Расходы на линейный персонал</h3>

            <div className="cfield">
              <label>Сотрудников на платформе</label>
              <div className="cnum">
                <input type="text" inputMode="numeric" value={emp === 0 ? '' : roiFmt(emp)} onChange={ev => onNum(ev.target.value, ROI_EMP_MAX, setEmp)} />
                <span className="cunit">чел.</span>
              </div>
              <input type="range" className="crange" min="1" max={ROI_EMP_MAX} step="1" value={e} style={trackBg(e, 1, ROI_EMP_MAX)} onChange={ev => setEmp(Number(ev.target.value))} />
            </div>

            <div className="cfield">
              <label>Средняя чистая ЗП в месяц (на руки)</label>
              <div className="cnum">
                <input type="text" inputMode="numeric" value={sal === 0 ? '' : roiFmt(sal)} onChange={ev => onNum(ev.target.value, ROI_SAL_MAX, setSal)} />
                <span className="cunit">сум</span>
              </div>
              <input type="range" className="crange" min="500000" max={ROI_SAL_MAX} step="100000" value={Math.max(500000, s)} style={trackBg(s, 500000, ROI_SAL_MAX)} onChange={ev => setSal(Number(ev.target.value))} />
            </div>

            <div className="cfield">
              <label>Смен / рабочих дней в месяце</label>
              <div className="cnum">
                <input type="text" inputMode="numeric" value={shifts === 0 ? '' : shifts} onChange={ev => onNum(ev.target.value, 31, setShifts)} />
                <span className="cunit">дней</span>
              </div>
              <input type="range" className="crange" min="1" max="31" step="1" value={d} style={trackBg(d, 1, 31)} onChange={ev => setShifts(Number(ev.target.value))} />
            </div>
          </div>

          {/* ---- results ---- */}
          <div className="calc-out">
            <span className="calc-out-eyebrow">Ваш результат оптимизации</span>

            <div className="compare">
              <div className="cmp-row staff">
                <span className="cmp-label"><i className="cmp-dot red"></i> Без Kunlik · в штате</span>
                <b className="mono">{roiFmt(totalStaff)} <em>сум/мес</em></b>
              </div>
              <div className="cmp-row plat">
                <span className="cmp-label"><i className="cmp-dot green"></i> С Kunlik · на платформе</span>
                <b className="mono">{roiFmt(totalPlat)} <em>сум/мес</em></b>
              </div>
            </div>

            <div className="benefit">
              <div className="ben-top">
                <span>Чистая выгода компании</span>
                <span className="ben-pct mono">−{pct.toFixed(1)}%</span>
              </div>
              <div className="ben-rows">
                <div className="ben-row">
                  <span>За 1 день</span>
                  <b className="mono">+{roiFmt(diffDay)}</b>
                </div>
                <div className="ben-row">
                  <span>За 1 месяц</span>
                  <b className="mono">+{roiFmt(diffMonth)}</b>
                </div>
                <div className="ben-row year">
                  <span>За 1 год</span>
                  <b className="mono">+{roiFmt(diffYear)}</b>
                </div>
              </div>
              {branches >= 1 && (
                <div className="ben-foot">Этих денег хватит на открытие <b>{branches}</b> {branches === 1 ? 'нового филиала' : 'новых филиалов'} за год.</div>
              )}
            </div>

            <button className="btn btn-primary btn-lg calc-cta">Оставить заявку на пилот</button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ROICalc = ROICalc;
