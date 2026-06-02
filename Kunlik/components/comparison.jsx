// ===== Section 4 — Before vs With Rizq Kunlik (timeline comparison) =====
const COMPARE_ROWS = [
  {
    proc: 'Поиск исполнителей',
    before: 'Длительный ручной поиск исполнителей разных профилей, прозвоны, зависимость от агентств.',
    after: 'Первые отклики на задания — в течение нескольких часов с момента публикации на единой платформе.',
    metric: 'часы вместо недель',
  },
  {
    proc: 'Оценка качества',
    before: 'Работа с несколькими поставщиками аутстаффинга без прозрачной оценки качества услуг.',
    after: 'Прозрачный рейтинг: подключайте текущих партнёров к платформе и оценивайте их в реальном времени.',
    metric: 'рейтинг в реальном времени',
  },
  {
    proc: 'Оценка эффективности',
    before: 'Нет системного анализа привлечения исполнителей на конкретных локациях.',
    after: 'Сквозная аналитика: наглядная оценка эффективности и отдельных исполнителей, и торговых точек.',
    metric: 'сквозная аналитика',
  },
  {
    proc: 'Управление бюджетом',
    before: 'Огромные затраты времени менеджеров на администрирование работ, бюджета и бумажных отчётов.',
    after: 'Умное управление лимитами бюджетов и автоматические отчёты в едином личном кабинете.',
    metric: 'авто-отчёты',
  },
];

function Comparison() {
  return (
    <section className="compare-sec sec-pad" id="compare">
      <div className="wrap">
        <div className="bn-head">
          <span className="eyebrow">Сравнительный анализ эффективности</span>
          <h2 className="sec-title">«Раньше» против «Kunlik»</h2>
          <p className="sec-sub">Что меняется в операционных процессах при переходе на платформенную модель управления персоналом.</p>
        </div>

        <div className="cmp-table">
          <div className="cmp-thead">
            <span className="cmp-th-proc">Операционный процесс</span>
            <span className="cmp-th-before">Раньше · традиционная модель</span>
            <span className="cmp-th-after">С платформой Kunlik</span>
          </div>
          {COMPARE_ROWS.map((r, i) => (
            <div className="cmp-trow" key={i}>
              <div className="cmp-proc">
                <span className="cmp-idx mono">{String(i + 1).padStart(2, '0')}</span>
                <b>{r.proc}</b>
              </div>
              <div className="cmp-before">
                <span className="cmp-mark before" aria-hidden="true"></span>
                <p>{r.before}</p>
              </div>
              <div className="cmp-after">
                <span className="cmp-mark after" aria-hidden="true"></span>
                <p>{r.after}</p>
                <span className="cmp-metric">{r.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Comparison = Comparison;
