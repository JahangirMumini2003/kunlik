// ===== Reusable phone frame =====
function PhoneFrame({ children, className }) {
  return (
    <div className={'phone' + (className ? ' ' + className : '')}>
      <div className="phone-shell">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <div className="phone-status">
            <span className="mono">9:41</span>
            <span className="phone-status-r">
              <i className="sig"></i><i className="wifi"></i><i className="bat"></i>
            </span>
          </div>
          <div className="phone-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

// brand glyph used inside app headers
function KunlikGlyph({ size = 22 }) {
  return <span className="app-glyph" style={{ width: size, height: size }} aria-hidden="true"></span>;
}

window.PhoneFrame = PhoneFrame;
window.KunlikGlyph = KunlikGlyph;

// store badges — used in hero, final CTA and the take-shift modal
function StoreBadges({ className }) {
  return (
    <div className={'stores' + (className ? ' ' + className : '')}>
      <a className="store" href="#" aria-label="Скачать в App Store">
        <span className="store-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.36 12.9c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.23.88-1.28 1.24-2.52 1.26-2.58-.03-.01-2.41-.93-2.43-3.68zM14.1 6.18c.64-.78 1.07-1.85.95-2.93-.92.04-2.04.61-2.7 1.39-.59.69-1.11 1.8-.97 2.85 1.03.08 2.08-.52 2.72-1.31z"/></svg>
        </span>
        <span className="store-txt"><em>Загрузить в</em><b>App Store</b></span>
      </a>
      <a className="store" href="#" aria-label="Доступно в Google Play">
        <span className="store-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 3l13 9-13 9z"/></svg>
        </span>
        <span className="store-txt"><em>Доступно в</em><b>Google Play</b></span>
      </a>
    </div>
  );
}
window.StoreBadges = StoreBadges;
