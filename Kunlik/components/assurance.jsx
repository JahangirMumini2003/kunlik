// ===== Sections 8–10: Security, Legality, Employee loyalty =====

/* --- shared small icons --- */
function AsrIcon({ name }) {
  const c = 'currentColor';
  const p = { fill: 'none', stroke: c, strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'doc') return (<svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13l2 2 4-4" /></svg>);
  if (name === 'geo') return (<svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
  if (name === 'lock') return (<svg viewBox="0 0 24 24" width="24" height="24" {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" /></svg>);
  if (name === 'ban') return (<svg viewBox="0 0 24 24" width="24" height="24" {...p}><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg>);
  if (name === 'bolt') return (<svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>);
  if (name === 'clock') return (<svg viewBox="0 0 24 24" width="24" height="24" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>);
  return (<svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>);
}

/* ===== Section 8 — Security / fraud reduction ===== */
function Security() {
  const items = [
    { ic: 'doc', t: 'Алгоритмическая проверка документов', d: 'Платформа автоматически верифицирует паспортные данные через MyID и проверяет актуальность медицинских книжек перед допуском к смене.' },
    { ic: 'geo', t: 'Защита от фрода через геолокацию', d: 'Координаты смартфона сверяются в фоне. «Отметиться» из дома невозможно — старт смены подтверждается только в радиусе торговой точки.' },
    { ic: 'lock', t: 'Система жёстких блокировок', d: 'Подтвердил задание, но не вышел без уважительной причины — аккаунт мгновенно блокируется алгоритмом без права восстановления.' },
    { ic: 'ban', t: 'Инструмент чёрных списков', d: 'Недобросовестного исполнителя компания в один клик вносит в свой Blacklist — он больше никогда не увидит задания этой сети.' },
  ];
  return (
    <section className="security sec-pad" id="security">
      <div className="wrap">
        <div className="bn-head">
          <span className="eyebrow">Безопасность и снижение фрода</span>
          <h2 className="sec-title">Закрываем вопросы<br />службы безопасности</h2>
          <p className="sec-sub">Контроль личности, геолокации и дисциплины исполнителей — на стороне платформы, в автоматическом режиме.</p>
        </div>
        <div className="sec-grid">
          {items.map(it => (
            <article key={it.t} className="sec-card">
              <span className="sec-ic"><AsrIcon name={it.ic} /></span>
              <div className="sec-body">
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Section 9 — Legality / legal shield (dark) ===== */
function Legality() {
  const items = [
    { n: '01', t: 'Прямая интеграция с Solliq.uz', d: 'Каждая закрытая смена сопровождается автоматической генерацией фискального чека самозанятого. Налог 1% расщепляется и уходит напрямую в бюджет государства.' },
    { n: '02', t: 'Стратегия цифровой экономики РУз', d: 'Платформа переводит «серый» рынок подработок в прозрачное легальное поле. Государство получает прирост числа официально зарегистрированных самозанятых.' },
    { n: '03', t: 'Экономическая суть — Gig-модель', d: 'Люди выполняют разовые квантованные задачи, а не сидят на окладе. Это соответствует мировым практикам (Uber, Яндекс) и вектору законодательства Узбекистана.' },
  ];
  return (
    <section className="legality sec-pad" id="legal">
      <div className="wrap">
        <div className="bn-head light">
          <span className="eyebrow on-dark">Легальность · юридический щит</span>
          <h2 className="sec-title">Почему у ГНК<br />не будет вопросов</h2>
          <p className="sec-sub on-dark-sub">Платформенная модель построена строго в рамках законодательства РУз 2026 года и поддерживается государственным вектором цифровизации.</p>
        </div>
        <div className="legal-grid">
          {items.map(it => (
            <article key={it.n} className="legal-card">
              <span className="legal-n mono">{it.n}</span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
        <div className="legal-strip">
          <span className="ls-dot" aria-hidden="true"></span>
          <span>Чеки уходят в <b>Solliq.uz</b> по API · акты выполненных работ формируются автоматически · налог самозанятого 1% удерживается на платформе</span>
        </div>
      </div>
    </section>
  );
}

/* ===== Section 10 — Why employees love it ===== */
function Loyalty() {
  const items = [
    { ic: 'bolt', t: 'Выполнил — получил', d: 'Вместо ожидания аванса 15 дней человек видит деньги сразу после подтверждения смены. Психологический триггер кардинально повышает мотивацию.' },
    { ic: 'clock', t: 'Гибкое управление временем', d: 'Сотрудник сам решает, когда работать. Нужны деньги — берёт 5 смен подряд. Нужен перерыв — просто не заходит в приложение, без объяснительных и HR.' },
    { ic: 'shield', t: 'Добровольная пенсия', d: 'Самозанятый освобождён от обязательного соцналога. Но при желании он сам оплачивает 1 БРВ в год прямо из баланса Kunlik — и обеспечивает официальный пенсионный стаж.' },
  ];
  return (
    <section className="loyalty sec-pad" id="loyalty">
      <div className="wrap">
        <div className="bn-head">
          <span className="eyebrow">Лояльность линейного персонала</span>
          <h2 className="sec-title">Почему сотрудники<br />будут в восторге</h2>
          <p className="sec-sub">Люди не уволятся, а станут работать эффективнее — модель выгодна и компании, и исполнителю.</p>
        </div>
        <div className="bn-grid">
          {items.map(it => (
            <article key={it.t} className="bn-card">
              <span className="bn-ic"><AsrIcon name={it.ic} /></span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Security = Security;
window.Legality = Legality;
window.Loyalty = Loyalty;
