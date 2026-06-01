// ===== Header =====
function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [lang, setLang] = React.useState('RU');
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const nav = [
    ['Смены', '#board'],
    ['Для исполнителей', '#flow'],
    ['Для бизнеса', '#b2b'],
    ['FAQ', '#faq'],
  ];
  return (
    <header className={'site-head' + (scrolled ? ' is-scrolled' : '')}>
      <div className="wrap head-inner">
        <a href="#top" className="logo">
          <span className="logo-mark" aria-hidden="true"></span>
          <span className="logo-word">kunlik</span>
        </a>
        <nav className="head-nav">
          {nav.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="head-actions">
          <div className="lang-toggle" role="group" aria-label="Язык">
            {['RU', 'UZ'].map(l => (
              <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)}>{l}</button>
            ))}
          </div>
          <button className="btn btn-ghost head-login">Вход в кабинет</button>
        </div>
      </div>
    </header>
  );
}
window.Header = Header;
