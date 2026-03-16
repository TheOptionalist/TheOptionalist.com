(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const toggle = header.querySelector('.menu-toggle');
  const nav = header.querySelector('#primary-navigation');
  const label = toggle ? toggle.querySelector('.menu-label') : null;

  if (!toggle || !nav) return;

  const setState = (open) => {
    header.setAttribute('data-menu', open ? 'open' : 'closed');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (label) label.textContent = open ? 'Close' : 'Menu';
    toggle.setAttribute('aria-label', open ? 'Close' : 'Menu');
  };

  const isOpen = () => header.getAttribute('data-menu') === 'open';

  toggle.addEventListener('click', () => {
    setState(!isOpen());
  });

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link) setState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setState(false);
  });

  const mql = window.matchMedia('(min-width: 721px)');
  const handleChange = () => {
    if (mql.matches) setState(false);
  };

  if (mql.addEventListener) {
    mql.addEventListener('change', handleChange);
  } else if (mql.addListener) {
    mql.addListener(handleChange);
  }

  setState(false);
})();
