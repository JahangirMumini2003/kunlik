// ===== Hero with B2C / B2B tab switch =====
function Hero() {
  const [mode, setMode] = React.useState('b2c'); // b2c | b2b
  const isB2C = mode === 'b2c';

  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-switch" role="tablist">
            <button role="tab" aria-selected={isB2C} className={isB2C ? 'on' : ''} onClick={() => setMode('b2c')}>
              Ищу подработку
            </button>
            <button role="tab" aria-selected={!isB2C} className={!isB2C ? 'on' : ''} onClick={() => setMode('b2b')}>
              Нужен персонал
            </button>
            <span className={'hero-switch-pill ' + (isB2C ? 'l' : 'r')} aria-hidden="true"></span>
          </div>

          {isB2C ? (
            <React.Fragment>
              <h1 className="hero-h1">Подработка <span className="hl">с выплатой<br />каждый день</span></h1>
              <p className="hero-sub">Удобные смены рядом с домом. Стань самозанятым за 3 минуты.</p>
              <StoreBadges className="hero-stores" />
              <ul className="hero-meta">
                <li><b>1%</b> налог самозанятого</li>
                <li><b>15 мин</b> до выплаты на карту</li>
                <li><b>0 ₽</b> комиссия исполнителя</li>
              </ul>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1 className="hero-h1">Расходы на персонал<br /><span className="hl">ниже на 17%</span></h1>
              <p className="hero-sub">ИИ-планирование смен и мгновенные выплаты самозанятым. Без КДП и рисков.</p>
              <div className="hero-form">
                <button className="btn btn-primary btn-lg">Оставить заявку на пилот</button>
                <button className="btn btn-ghost btn-lg">Смотреть демо панели</button>
              </div>
              <ul className="hero-meta">
                <li><b>−17%</b> расходы на ФОТ</li>
                <li><b>4%</b> фикс-комиссия Kunlik</li>
                <li><b>API</b> 1С · SAP · Workday</li>
              </ul>
            </React.Fragment>
          )}
        </div>

        <div className="hero-visual">
          {isB2C ? <HeroPhone /> : <HeroPanel />}
        </div>
      </div>

      <div className="wrap hero-logos">
        <span>Нам доверяют сети:</span>
        <div className="logo-row">
          {['Korzinka', 'Texnomart', 'Max Way', 'EVOS', 'Makro'].map(n => (
            <span key={n} className="brand-chip">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroPhone() {
  const MapScreen = window.MapScreen;
  return (
    <PhoneFrame className="hero-phone">
      <MapScreen />
    </PhoneFrame>
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
        <div className="app-head"><KunlikGlyph /><b>Kunlik Business</b></div>
        <span className="hp-tag">Экономия</span>
      </div>
      <div className="cm-result">
        <span className="cm-label">Чистая выгода в год</span>
        <div className="cm-year mono">+{heroFmt(diffYear)} <i>сум</i></div>
        <span className="cm-sub">≈ {heroFmt(diffMonth)} сум/мес · −{pct.toFixed(0)}% к расходам на ФОТ</span>
      </div>
      <div className="cm-controls">
        <div className="cm-field">
          <div className="cm-frow"><span>Сотрудников на платформе</span><b className="mono">{heroFmt(e)}</b></div>
          <input type="range" className="crange cm-range" min="50" max="15000" step="10" value={e} style={track(e, 50, 15000)} onChange={ev => setEmp(Number(ev.target.value))} />
        </div>
        <div className="cm-field">
          <div className="cm-frow"><span>Средняя ЗП в месяц</span><b className="mono">{heroFmt(s)}</b></div>
          <input type="range" className="crange cm-range" min="1500000" max="12000000" step="100000" value={s} style={track(s, 1500000, 12000000)} onChange={ev => setSal(Number(ev.target.value))} />
        </div>
      </div>
      <a href="#calc" className="cm-link">Открыть полный калькулятор →</a>
    </div>
  );
}

window.Hero = Hero;
