import {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router';

const NAV_LINKS = [
  {to: '/intent', label: 'Intent'},
  {to: '/about', label: 'About'},
  {to: '/newsroom', label: 'Newsroom'},
  {to: '/contact', label: 'Contact'},
];

/**
 * Transparent over dark sections; frosted page background when scrolled.
 * Uses IntersectionObserver on [data-header-theme] markers (homepage).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsOverDark(false);
      return;
    }

    const nodes = document.querySelectorAll<HTMLElement>('[data-header-theme]');
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        const first = visible[0]?.target as HTMLElement | undefined;
        const themefirst = first?.dataset.headerTheme;
        if (themefirst === 'dark' || themefirst === 'light') {
          setIsOverDark(themefirst === 'dark');
        }
      },
      {
        root: null,
        rootMargin: '-64px 0px -55% 0px',
        threshold: [0, 0.08, 0.15, 0.25],
      },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [location.pathname]);

  const onDark = isOverDark && !scrolled;
  const logoSubColor = onDark
    ? 'rgba(244,237,228,0.65)'
    : 'var(--color-text-secondary)';
  const navColor = onDark ? 'rgba(244,237,228,0.75)' : 'var(--color-text-secondary)';
  const navActiveColor = onDark ? '#f4ede4' : 'var(--color-cta)';
  const burgerColor = onDark ? '#f4ede4' : 'var(--color-text-primary)';

  return (
    <>
      <header
        className={`site-header transition-transform duration-500 ${
          scrolled ? 'scrolled' : ''
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <Link
          to="/"
          className="flex flex-col items-start gap-1 no-underline focus-visible:outline-offset-4"
          aria-label="Emi Woo — Home"
        >
          <img
            src="/images/brand/logo-wordmark-gold.png"
            alt=""
            width={140}
            height={36}
            style={{
              height: 'clamp(22px, 3vw, 32px)',
              width: 'auto',
              display: 'block',
              filter: onDark ? 'none' : 'brightness(0.35)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '8px',
              fontWeight: 400,
              letterSpacing: '0.28em',
              color: logoSubColor,
              textTransform: 'uppercase',
              lineHeight: 1,
              transition: 'color 0.4s',
            }}
          >
            The Silk Blouse
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {NAV_LINKS.map(({to, label}) => (
            <Link
              key={to}
              to={to}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: location.pathname === to ? navActiveColor : navColor,
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          to="/products/silk-blouse"
          className={onDark ? 'btn-cta-light' : 'btn-cta'}
          style={{fontSize: '9px', padding: '10px 24px'}}
        >
          Shop
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{background: 'none', border: 'none', cursor: 'pointer'}}
        >
          {[
            menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
            'none',
            menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
          ].map((transform, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: burgerColor,
                transition: 'transform 0.3s, opacity 0.3s, background 0.4s',
                transform,
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </header>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          transition: 'opacity 0.4s, visibility 0.4s',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
        }}
      >
        {NAV_LINKS.map(({to, label}) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
            }}
          >
            {label}
          </Link>
        ))}
        <Link to="/products/silk-blouse" className="btn-cta mt-4">
          Shop
        </Link>
      </div>
    </>
  );
}
