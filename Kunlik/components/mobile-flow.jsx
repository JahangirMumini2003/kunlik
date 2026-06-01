// ===== Interactive 5-step executor flow =====
const FLOW_STEPS = [
  {
    n: '01', t: 'Быстрая регистрация',
    d: 'Введите номер телефона и код из SMS, затем ПИНФЛ (14 цифр). Никаких визитов и бумаг.',
  },
  {
    n: '02', t: 'Самозанятость через MyID',
    d: 'Удалённая легализация в ГНК за 60 секунд. Посмотрите в камеру — личность подтверждается, данные уходят в Solliq.uz.',
  },
  {
    n: '03', t: 'Поиск смен на карте',
    d: 'Смотрите свободные смены рядом с домом на карте и в ленте. Фильтруйте по сфере и оплате.',
  },
  {
    n: '04', t: 'Выполнение и QR-контроль',
    d: 'Отмечайте задачи по чек-листу. В конце покажите QR-код администратору для закрытия смены.',
  },
  {
    n: '05', t: 'Моментальная выплата',
    d: 'Деньги поступают на карту Humo или Uzcard через 15 минут. Налог 1% удержан автоматически.',
  },
];

function MobileFlow() {
  const [step, setStep] = React.useState(0);
  return (
    <section className="flow sec-pad" id="flow">
      <div className="wrap">
        <div className="flow-head">
          <span className="eyebrow">Kunlik · приложение</span>
          <h2 className="sec-title">Пять шагов от регистрации<br />до денег на карте</h2>
        </div>
        <div className="flow-grid">
          <ol className="flow-steps">
            {FLOW_STEPS.map((s, i) => (
              <li key={s.n}>
                <button className={'flow-step' + (i === step ? ' on' : '') + (i < step ? ' done' : '')}
                  onClick={() => setStep(i)}>
                  <span className="fs-num mono">{s.n}</span>
                  <span className="fs-text">
                    <b>{s.t}</b>
                    <span>{s.d}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flow-phone-col">
            <PhoneFrame>
              <FlowScreen step={step} />
            </PhoneFrame>
            <div className="flow-nav">
              <button className="circ" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} aria-label="Назад">‹</button>
              <div className="dots">
                {FLOW_STEPS.map((_, i) => (
                  <span key={i} className={i === step ? 'dot on' : 'dot'} onClick={() => setStep(i)}></span>
                ))}
              </div>
              <button className="circ" onClick={() => setStep(s => Math.min(4, s + 1))} disabled={step === 4} aria-label="Вперёд">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowScreen({ step }) {
  const screens = [<S1 />, <S2 />, <S3 />, <S4 />, <S5 />];
  return <div className="scr-fade" key={step}>{screens[step]}</div>;
}

/* --- Screen 1: Login --- */
function S1() {
  return (
    <div className="scr">
      <div className="app-head pad"><KunlikGlyph /><b>Kunlik</b></div>
      <div className="scr-pad">
        <p className="lbl">Введите номер телефона</p>
        <div className="field"><span className="mono dim">+998</span><span className="mono">(90) 123 — 45 — 67</span></div>
        <p className="lbl">Код из SMS</p>
        <div className="otp">{['1', '2', '3', '4'].map((d, i) => <span key={i} className={i < 4 ? 'filled' : ''}>{d}</span>)}</div>
        <p className="lbl">Ваш ПИНФЛ (14 цифр)</p>
        <div className="field"><span className="mono">3 •••• •••• •••• ••</span></div>
        <button className="btn btn-primary block">Далее</button>
      </div>
    </div>
  );
}

/* --- Screen 2: MyID verification --- */
function S2() {
  return (
    <div className="scr">
      <div className="app-head pad"><KunlikGlyph /><b>Верификация</b></div>
      <div className="scr-pad">
        <h4 className="scr-h">Легализация в ГНК<br />за 60 секунд</h4>
        <div className="myid">
          <span className="myid-tag">MyID</span>
          <div className="scan-oval">
            <span className="scan-line"></span>
            <span className="face" aria-hidden="true"></span>
          </div>
          <div className="verified"><span className="ok-dot"></span> Личность подтверждена</div>
        </div>
        <p className="lbl">Выберите вид деятельности</p>
        <label className="radio on"><span className="rb"></span>Услуги мерчендайзера / фасовщика</label>
        <label className="radio"><span className="rb"></span>Доставка товаров</label>
        <button className="btn btn-primary block">Открыть самозанятость</button>
        <p className="fine">Данные автоматически отправляются в Solliq.uz. Вы получаете официальный статус налогоплательщика.</p>
      </div>
    </div>
  );
}

/* --- Screen 3: Map of shifts (search + filters + bottom sheet) --- */
function S3() {
  return (
    <div className="scr scr-map3">
      <div className="m3-top">
        <div className="app-head">
          <KunlikGlyph /><b>Смены рядом</b>
          <span className="m3-near">Себзар · 2 км</span>
        </div>
        <div className="m3-search">
          <span className="m3-search-ic" aria-hidden="true"></span>
          <span className="m3-search-ph">Поиск по адресу или сети</span>
        </div>
        <div className="m3-chips">
          {['Все', 'Ритейл', 'Общепит', 'Сборка', 'Доставка'].map((f, i) => (
            <span key={f} className={i === 0 ? 'm3-chip on' : 'm3-chip'}>{f}</span>
          ))}
        </div>
      </div>

      <div className="m3-map">
        <div className="map-grid" aria-hidden="true"></div>
        <span className="m3-road r1" aria-hidden="true"></span>
        <span className="m3-road r2" aria-hidden="true"></span>
        <span className="m3-radius" aria-hidden="true"></span>
        <span className="m3-me" aria-hidden="true"></span>
        <span className="m3-pin p1 on"><i className="m3-pin-logo k">K</i>136k</span>
        <span className="m3-pin p2"><i className="m3-pin-logo e">E</i>120k</span>
        <span className="m3-pin p3"><i className="m3-pin-logo m">M</i>98k</span>
        <button className="m3-recenter" aria-label="Моё местоположение"></button>
      </div>

      <div className="m3-sheet">
        <span className="m3-grip" aria-hidden="true"></span>
        <div className="m3-sheet-head"><b>3 смены поблизости</b><span>сегодня</span></div>
        <div className="m3-card on">
          <div className="mc-logo">K</div>
          <div className="mc-body">
            <b>Korzinka · Выкладка товара</b>
            <span>17:00–21:00 · 4 ч · 350 м</span>
          </div>
          <div className="m3-card-r">
            <span className="mono m3-pay">136 364 <i>сум</i></span>
            <button className="btn btn-primary sm">Взять</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Screen 4: Shift close + QR control --- */
function S4() {
  return (
    <div className="scr">
      <div className="app-head pad"><KunlikGlyph /><b>Закрытие смены</b></div>
      <div className="scr-pad">
        <div className="qc-summary">
          <div className="mc-logo">K</div>
          <div className="qc-sum-body">
            <b>Korzinka · Себзар</b>
            <span>Выкладка товара · 17:00–21:00</span>
          </div>
          <span className="status-chip sm"><span className="ok-dot"></span> На месте</span>
        </div>

        <div className="qc-prog">
          <div className="qc-prog-top"><span>Чек-лист задачи выполнен</span><b className="mono">3 / 3</b></div>
          <div className="qc-prog-bar"><i></i></div>
        </div>

        <div className="qc-qrwrap">
          <span className="qc-qr-h">Покажите QR администратору</span>
          <div className="qc-qr-frame">
            <span className="qc-corner tl"></span><span className="qc-corner tr"></span>
            <span className="qc-corner bl"></span><span className="qc-corner br"></span>
            <QR />
          </div>
          <span className="qc-code mono">Код смены · #KUN-4821-SBZ</span>
        </div>
        <div className="qc-wait"><span className="qc-pulse"></span> Ожидаем подтверждения администратора…</div>
      </div>
    </div>
  );
}

/* --- Screen 5: Wallet / payout --- */
function S5() {
  return (
    <div className="scr">
      <div className="app-head pad"><KunlikGlyph /><b>Кошелёк</b></div>
      <div className="scr-pad">
        <div className="wallet-bal">
          <span>Баланс</span>
          <div className="mono">136 364 <i>сум</i></div>
          <span className="paid-note"><span className="ok-dot"></span> Смена закрыта без замечаний</span>
        </div>
        <p className="lbl">Куда вывести</p>
        <div className="card-pill">
          <span className="hum">Humo</span>
          <span className="mono">•••• •••• •••• 4567</span>
        </div>
        <div className="clearing">
          <div><span>Налог самозанятого (1%)</span><b className="mono">1 364 сум</b></div>
          <div><span>Сервисный сбор</span><b className="mono">0 сум</b></div>
        </div>
        <button className="btn btn-primary block">Вывести 135 000 сум</button>
        <div className="push"><span className="ok-dot"></span> Деньги зачислены на карту!</div>
      </div>
    </div>
  );
}

function QR() {
  // deterministic pseudo-random qr-ish grid
  const n = 11;
  const cells = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const on = ((x * 7 + y * 13 + x * y) % 3 === 0) || ((x + y) % 4 === 0);
    cells.push(<span key={y + '-' + x} className={on ? 'on' : ''}></span>);
  }
  return (
    <div className="qr-grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
      {cells}
      <span className="qr-eye tl"></span><span className="qr-eye tr"></span><span className="qr-eye bl"></span>
    </div>
  );
}

window.MobileFlow = MobileFlow;
window.MapScreen = S3;
window.QR = QR;
