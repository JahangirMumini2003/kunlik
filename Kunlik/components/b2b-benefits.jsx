// ===== B2B benefits + selection criteria =====
function B2BBenefits() {
  const items = [
    { stat: '−17%', label: 'на ФОТ',
      t: 'Снижение расходов на ФОТ до 17%',
      d: 'Замена стандартных налогов (12% НДФЛ + 12% соцналог) на работу с самозанятыми через платформу с фиксированной комиссией Kunlik — 4%.' },
    { stat: '0', label: 'КДП',
      t: 'Нулевая нагрузка на кадры',
      d: 'Никаких договоров, больничных и отпусков. Kunlik берёт на себя автоматическое формирование актов и чеков ГНК по API.' },
    { stat: 'ИИ', label: 'планирование',
      t: 'Управление пиковыми нагрузками',
      d: 'Привлечение персонала строго в часы максимального трафика. Больше никаких переплат за простои сотрудников утром.' },
    { stat: '0', label: 'рисков',
      t: 'Защита от переквалификации',
      d: 'Юридическая архитектура исключает признаки трудовых отношений благодаря ротации исполнителей и отсутствию штатных графиков.' },
  ];
  return (
    <section className="b2bb sec-pad">
      <div className="wrap">
        <div className="bn-head light">
          <span className="eyebrow on-dark">Для компаний</span>
          <h2 className="sec-title">Точная финансовая<br />и операционная математика</h2>
        </div>
        <div className="b2bb-grid">
          {items.map(it => (
            <article key={it.t} className="b2bb-card">
              <div className="b2bb-stat"><span className="mono">{it.stat}</span><em>{it.label}</em></div>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Criteria — two sided =====
function Criteria() {
  return (
    <section className="crit sec-pad" id="criteria">
      <div className="wrap">
        <div className="bn-head">
          <span className="eyebrow">Кому подходит платформа</span>
          <h2 className="sec-title">Чёткие критерии с обеих сторон</h2>
        </div>
        <div className="crit-grid">
          <article className="crit-card">
            <div className="crit-tag exec">Для исполнителей</div>
            <ul className="crit-list">
              <li><b>Возраст от 16 лет</b><span>Официально разрешённый возраст для регистрации самозанятости в РУз.</span></li>
              <li><b>Документы</b><span>Гражданство РУз и действующий паспорт (ID-карта) для верификации в MyID.</span></li>
              <li><b>Квалификация</b><span>Опыт не нужен для базовых смен. Для специализированных (водитель погрузчика) — сертификат в профиле.</span></li>
            </ul>
          </article>
          <article className="crit-card">
            <div className="crit-tag biz">Для компаний</div>
            <ul className="crit-list">
              <li><b>Юридические лица</b><span>ООО, СП, АО, оперирующие на территории Республики Узбекистан.</span></li>
              <li><b>Сферы</b><span>Розничная торговля, логистика, дистрибуция, общепит, e-commerce.</span></li>
              <li><b>Подключение</b><span>Верификация по ИНН через ЕПИГУ и подписание соглашения по ЭЦП.</span></li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

window.B2BBenefits = B2BBenefits;
window.Criteria = Criteria;
