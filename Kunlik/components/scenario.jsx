// ===== Section 3 — Step-by-step operational scenario (Block A intro) =====
const BACKOFFICE_STEPS = [
  {
    n: '01', t: 'Создание и планирование заданий',
    d: 'Менеджер в личном кабинете планирует расписание смен на недели и месяцы вперёд по каждой точке.',
  },
  {
    n: '02', t: 'Гибкий таргетинг смен',
    d: 'Публикуйте задание на общей бирже, либо отправляйте пуш только проверенным исполнителям с опытом или внутреннему пулу.',
  },
  {
    n: '03', t: 'Проверка выполнения',
    d: 'Администратор на торговой точке принимает работу по чек-листу и сканирует QR-код исполнителя.',
  },
  {
    n: '04', t: 'Управление оплатой',
    d: 'Деньги списываются с B2B-баланса. Доступны оплата в моменте — сразу после смены, или с отсрочкой платежа по договору.',
  },
];

function ScenarioIntro() {
  return (
    <section className="scenario sec-pad" id="scenario">
      <div className="wrap">
        <div className="bn-head">
          <span className="eyebrow">Пошаговый операционный сценарий</span>
          <h2 className="sec-title">Как это работает</h2>
          <p className="sec-sub">Два контура одной платформы: бэк-офис компании планирует и оплачивает смены, исполнитель закрывает их в мобильном приложении.</p>
        </div>

        <div className="block-label">
          <span className="bl-tag">Блок А</span>
          <span className="bl-text">Для компании · Back-office</span>
        </div>

        <ol className="scn-steps">
          {BACKOFFICE_STEPS.map(s => (
            <li key={s.n} className="scn-step">
              <span className="scn-num mono">{s.n}</span>
              <b>{s.t}</b>
              <span className="scn-d">{s.d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
window.ScenarioIntro = ScenarioIntro;
