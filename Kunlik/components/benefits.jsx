// ===== B2C benefits =====
function Benefits() {
  const items = [
    {
      icon: 'coin',
      t: 'Деньги сразу после смены',
      d: 'Никаких ожиданий конца месяца. Администратор подтвердил закрытие задачи — через 15 минут деньги на вашей карте Humo или Uzcard.',
    },
    {
      icon: 'clock',
      t: 'Свободный график',
      d: 'Ты сам решаешь, когда и где работать. Можно взять смену на 3 часа после учёбы или полноценный день в выходные.',
    },
    {
      icon: 'shield',
      t: '100% легально и безопасно',
      d: 'Статус самозанятого открывается внутри приложения. Налог всего 1%, а электронные чеки для Solliq формируются автоматически.',
    },
  ];
  return (
    <section className="benefits sec-pad" id="benefits">
      <div className="wrap">
        <div className="bn-head">
          <span className="eyebrow">Для исполнителей</span>
          <h2 className="sec-title">Почему люди выбирают Kunlik</h2>
        </div>
        <div className="bn-grid">
          {items.map(it => (
            <article key={it.t} className="bn-card">
              <span className="bn-ic"><BenIcon name={it.icon} /></span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenIcon({ name }) {
  const c = 'currentColor';
  if (name === 'coin') return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
  if (name === 'clock') return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  );
}

window.Benefits = Benefits;
