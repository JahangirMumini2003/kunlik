// ===== Section 11 — Pilot CTA (form) + Footer =====
function PilotCTA() {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const onPhone = v => {
    const d = v.replace(/\D/g, '').replace(/^998/, '').slice(0, 9);
    let out = '';
    if (d.length) out += '(' + d.slice(0, 2);
    if (d.length >= 2) out += ') ' + d.slice(2, 5);
    if (d.length >= 5) out += '-' + d.slice(5, 7);
    if (d.length >= 7) out += '-' + d.slice(7, 9);
    setPhone(out);
  };
  const valid = name.trim().length >= 2 && phone.replace(/\D/g, '').length >= 9;
  const submit = e => { e.preventDefault(); if (valid) { window.open('https://t.me/jahangirmumini', '_blank', 'noopener'); setSent(true); } };

  return (
    <section className="cta" id="cta">
      <div className="wrap">
        <div className="cta-inner">
          <div className="cta-glow" aria-hidden="true"></div>
          <div className="cta-grid">
            <div className="cta-copy">
              <span className="eyebrow on-dark">Пилотный запуск</span>
              <h2>Запустите пилот на 100 человек<br />в одном из ваших филиалов</h2>
              <p>Установка платформы, адаптация под процессы вашей компании и интеграция с вашей ERP (1С / SAP) — полностью бесплатны.</p>
              <ul className="cta-bullets">
                <li>Бесплатная установка и адаптация</li>
                <li>Интеграция с 1С / SAP / Workday</li>
                <li>Сопровождение аккаунт-менеджера</li>
              </ul>
            </div>

            {sent ? (
              <div className="cta-card cta-done">
                <span className="cta-done-ic" aria-hidden="true"></span>
                <h3>Переходим в Telegram</h3>
                <p>Мы открыли чат с аккаунт-менеджером Kunlik. Напишите нам — согласуем презентацию и пилот в течение рабочего дня.</p>
                <a href="https://t.me/jahangirmumini" target="_blank" rel="noopener" className="btn btn-primary btn-lg">Открыть Telegram</a>
              </div>
            ) : (
              <form className="cta-card" onSubmit={submit}>
                <h3>Запросить презентацию и пилот</h3>
                <label className="cta-field">
                  <span>Имя</span>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Как к вам обращаться" />
                </label>
                <label className="cta-field">
                  <span>Телефон</span>
                  <div className="cta-phone">
                    <i>+998</i>
                    <input type="tel" value={phone} onChange={e => onPhone(e.target.value)} placeholder="(90) 123-45-67" />
                  </div>
                </label>
                <button type="submit" className="btn btn-primary btn-lg block" disabled={!valid}>Запросить презентацию и пилот</button>
                <span className="cta-fine">Нажимая кнопку, вы соглашаетесь с обработкой данных по политике конфиденциальности.</span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  const cols = [
    { h: 'Платформа', items: ['Kunlik (Gig)', 'Oylik (EWA)', 'Kunlik API', 'Личный кабинет'] },
    { h: 'Компания', items: ['О нас', 'Блог', 'Карьера', 'Контакты'] },
  ];
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <a href="#top" className="logo logo-light">
            <span className="logo-mark" aria-hidden="true"></span>
            <span className="logo-text">
              <span className="logo-lockup">
                <span className="logo-word">kunlik</span>
                <span className="logo-biz light">Business</span>
              </span>
              <span className="logo-by light">by screenix</span>
            </span>
          </a>
          <p>© 2026 ООО «Screenix AI».<br />Все права защищены.</p>
          <p className="foot-lic mono">Платформа самозанятости · Solliq.uz API</p>
        </div>
        {cols.map(c => (
          <div key={c.h} className="foot-col">
            <h4>{c.h}</h4>
            <ul>{c.items.map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
          </div>
        ))}
        <div className="foot-col">
          <h4>Связь</h4>
          <ul>
            <li><a href="https://t.me/jahangirmumini" target="_blank" rel="noopener" className="foot-tg"><span className="tg-ic" aria-hidden="true"></span>@jahangirmumini</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-legal">
        <span>Правовая информация</span>
        <span>Условия оферты B2B</span>
        <span>Политика конфиденциальности MyID</span>
      </div>
    </footer>
  );
}

window.PilotCTA = PilotCTA;
window.Footer = Footer;
