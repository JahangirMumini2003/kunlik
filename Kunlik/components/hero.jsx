// ===== Hero — B2B (Rizq Kunlik for business) =====
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span className="hk-dot" aria-hidden="true"></span>
            Enterprise-платформа управления персоналом
          </span>
          <h1 className="hero-h1">Линейный персонал<br /><span className="hl">в гибкой занятости</span></h1>
          <p className="hero-sub">Платформенная модель найма и мгновенные выплаты самозанятым. Легальное снижение затрат на ФОТ — до 17%.</p>

          <div className="hero-form">
            <a href="https://t.me/jahangirmumini" target="_blank" rel="noopener" className="btn btn-primary btn-lg">Получить демо-доступ</a>
            <a href="#calc" className="btn btn-ghost btn-lg">Рассчитать экономию</a>
          </div>
        </div>

        <div className="hero-visual">
          <HeroPanel />
        </div>
      </div>

      <div className="wrap hero-logos">
        <span className="hero-worldnote">Платформенную модель найма уже используют компании по всему миру — и экономят <b>миллионы долларов</b> в год.</span>
      </div>
    </section>
  );
}

function heroFmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

function HeroPanel() {
  const [emp, setEmp] = React.useState(1400);
  const [sal, setSal] = React.useState(3000000);
  const e = Math.max(1, emp), s = Math.max(1, sal);
  const perStaff = s / 0.88 * 1.12;
  const diffMonth = (perStaff - s / 0.95) * e;
  const diffYear = diffMonth * 12;
  const pct = (perStaff - s / 0.95) / perStaff * 100;
  const track = (v, min, max) => {
    const p = ((v - min) / (max - min)) * 100;
    return { background: `linear-gradient(to right, var(--brand) ${p}%, var(--line-2) ${p}%)` };
  };
  return (
    <div className="hero-panel calc-mini">
      <div className="hp-head">
        <div className="app-head"><KunlikGlyph /><b>Kunlik · экономия</b></div>
        <span className="hp-tag">ФОТ</span>
      </div>
      <div className="cm-result">
        <span className="cm-label">Чистая выгода в год</span>
        <div className="cm-year mono">+{heroFmt(diffYear)} <i>сум</i></div>
        <span className="cm-sub">≈ {heroFmt(diffMonth)} сум/мес · −{pct.toFixed(0)}% к расходам на ФОТ</span>
      </div>
      <div className="cm-controls">
        <div className="cm-field">
          <div className="cm-frow"><span>Исполнителей на платформе</span><b className="mono">{heroFmt(e)}</b></div>
          <input type="range" className="crange cm-range" min="50" max="15000" step="10" value={e} style={track(e, 50, 15000)} onChange={ev => setEmp(Number(ev.target.value))} />
        </div>
        <div className="cm-field">
          <div className="cm-frow"><span>Чистая ЗП на руки в месяц</span><b className="mono">{heroFmt(s)}</b></div>
          <input type="range" className="crange cm-range" min="1500000" max="12000000" step="100000" value={s} style={track(s, 1500000, 12000000)} onChange={ev => setSal(Number(ev.target.value))} />
        </div>
      </div>
      <a href="#calc" className="cm-link">Открыть полный калькулятор →</a>
    </div>
  );
}

window.Hero = Hero;
