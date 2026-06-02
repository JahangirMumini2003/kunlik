// ===== Section 2 — Hybrid talent pool (two sources of executors) =====
function TalentPool() {
  const channels = [
    {
      tag: 'Канал 01', side: 'in',
      title: 'Внутренний пул — «Свои»',
      lead: 'Бесшовно переведите текущий линейный персонал в приложение Kunlik.',
      points: [
        ['Легализация за 3 минуты', 'Система автоматически оформляет сотрудников как самозанятых — без визитов в налоговую.'],
        ['Только ваши задания', 'Люди видят смены исключительно внутри вашей компании и на привычных торговых точках.'],
        ['Сохранение команды', 'Те же лица на тех же точках — но уже в гибкой и легальной модели занятости.'],
      ],
      stat: '50%', statLabel: 'талант-пула — ваш собственный штат',
    },
    {
      tag: 'Канал 02', side: 'out',
      title: 'Внешняя биржа Kunlik',
      lead: 'Доступ к общегородской базе проверенных исполнителей по всему Узбекистану.',
      points: [
        ['Усиление под пик', 'Нужны люди в пятницу вечером? Опубликуйте задание на общей бирже в один клик.'],
        ['Проверенные исполнители', 'Рейтинг, верификация MyID и медкнижки — на стороне платформы.'],
        ['Масштаб без найма', 'Закрывайте сезонные и пиковые нагрузки без расширения штата.'],
      ],
      stat: '50%', statLabel: 'талант-пула — внешняя биржа Kunlik',
    },
  ];
  return (
    <section className="talent sec-pad" id="talent">
      <div className="wrap">
        <div className="bn-head">
          <span className="eyebrow">Гибридный талант-пул</span>
          <h2 className="sec-title">Два источника исполнителей<br />в одной модели 50 / 50</h2>
          <p className="sec-sub">Комбинируйте собственный персонал и внешнюю биржу так, как требует операционная задача — постоянная загрузка точек и гибкое усиление под трафик.</p>
        </div>

        <div className="talent-grid">
          {channels.map(c => (
            <article key={c.tag} className={'talent-card ' + c.side}>
              <div className="tl-top">
                <span className="tl-tag">{c.tag}</span>
                <span className={'tl-ico ' + c.side} aria-hidden="true"></span>
              </div>
              <h3>{c.title}</h3>
              <p className="tl-lead">{c.lead}</p>
              <ul className="tl-list">
                {c.points.map(([b, d]) => (
                  <li key={b}><b>{b}</b><span>{d}</span></li>
                ))}
              </ul>
              <div className="tl-stat">
                <span className="mono">{c.stat}</span>
                <em>{c.statLabel}</em>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.TalentPool = TalentPool;
