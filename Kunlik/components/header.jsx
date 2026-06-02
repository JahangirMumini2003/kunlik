// ===== Header — RIZQ | Business (B2B only) =====
function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const nav = [
    ['Талант-пул', '#talent'],
    ['Как это работает', '#scenario'],
    ['Калькулятор', '#calc'],
    ['Безопасность', '#security'],
    ['Легальность', '#legal'],
  ];
  return (
    <header className={'site-head' + (scrolled ? ' is-scrolled' : '')}>
      <div className="wrap head-inner">
        <a href="#top" className="logo">
          <span className="logo-mark" aria-hidden="true"></span>
          <span className="logo-text">
            <span className="logo-lockup">
              <span className="logo-word">kunlik</span>
              <span className="logo-biz">Business</span>
            </span>
            <span className="logo-by">by screenix</span>
          </span>
        </a>
        <nav className="head-nav">
          {nav.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="head-actions">
          <a href="https://t.me/jahangirmumini" target="_blank" rel="noopener" className="btn btn-dark head-login">
            <span className="hl-full">Связаться с аккаунтом</span>
            <span className="hl-short">Связаться</span>
          </a>
        </div>
      </div>
    </header>
  );
}
window.Header = Header;
