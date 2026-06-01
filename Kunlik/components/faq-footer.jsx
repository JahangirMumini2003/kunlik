// ===== FAQ accordion =====
const FAQ_ITEMS = [
  {
    q: 'Не оштрафует ли налоговая (ГНК) компанию за использование самозанятых вместо штата?',
    a: 'Нет. Платформа Kunlik работает строго в рамках законодательства 2026 года. Сервис используется для покрытия краткосрочных пиковых нагрузок. Исполнители постоянно меняют локации и задачи, что исключает подмену трудовых отношений. Все чеки легально уходят в Solliq.uz через API.',
  },
  {
    q: 'Какая комиссия удерживается с исполнителя за вывод денег?',
    a: '0% для исполнителя. Все технологические издержки и сервисный сбор (4%) покрывает компания-работодатель в рамках B2B-тарифа за оптимизацию операционных затрат. Самозанятый платит только законный 1% налога с оборота.',
  },
  {
    q: 'Идёт ли у самозанятого исполнителя трудовой стаж для пенсии?',
    a: 'Напрямую — нет. Но по законодательству Узбекистана самозанятый может добровольно оплатить социальный налог в размере 1 БРВ один раз в год, и этот календарный год будет полностью засчитан в его официальный пенсионный стаж.',
  },
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="faq sec-pad" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-aside">
          <span className="eyebrow">FAQ</span>
          <h2 className="sec-title">Частые вопросы</h2>
          <p className="sec-sub">Не нашли ответ? Напишите нам — поможем разобраться с легализацией и подключением.</p>
          <button className="btn btn-ghost">Связаться с поддержкой</button>
        </div>
        <ul className="faq-list">
          {FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className={'faq-item' + (isOpen ? ' open' : '')}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>{it.q}</span>
                  <span className="faq-plus" aria-hidden="true"></span>
                </button>
                <div className="faq-a-wrap"><div className="faq-a">{it.a}</div></div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ===== Final CTA =====
function FinalCTA() {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div className="cta-glow" aria-hidden="true"></div>
        <h2>Начни зарабатывать уже сегодня</h2>
        <p>Открой самозанятость за 3 минуты и бери первую смену рядом с домом.</p>
        <StoreBadges className="on-dark cta-stores" />
        <span className="cta-fine">Доступно для iOS и Android · Ташкент · бесплатно</span>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  const cols = [
    { h: 'Продукты', items: ['Oylik (EWA)', 'Kunlik (Gig)', 'Kunlik API'] },
    { h: 'Компания', items: ['О нас', 'Блог', 'Карьера'] },
  ];
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <a href="#top" className="logo logo-light">
            <span className="logo-mark" aria-hidden="true"></span>
            <span className="logo-word">kunlik</span>
          </a>
          <p>© 2026 ООО «Kunlik FinTech».<br />Все права защищены.</p>
          <p className="foot-lic mono">Лицензия ЦБ РУз №XX-XX</p>
        </div>
        {cols.map(c => (
          <div key={c.h} className="foot-col">
            <h4>{c.h}</h4>
            <ul>{c.items.map(i => <li key={i}><a href="#">{i}</a></li>)}</ul>
          </div>
        ))}
        <div className="foot-col">
          <h4>Контакты</h4>
          <ul>
            <li>г. Ташкент, Чиланзарский р-н,<br />ул. Катартал, д. 25</li>
            <li><a href="mailto:support@kunlik.uz">support@kunlik.uz</a></li>
            <li className="mono">+998 (71) 123-45-67</li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-legal">
        <span>Правовая информация</span>
        <span>Условия оферты для самозанятых</span>
        <span>Политика конфиденциальности MyID</span>
      </div>
    </footer>
  );
}

window.FAQ = FAQ;
window.FinalCTA = FinalCTA;
window.Footer = Footer;
