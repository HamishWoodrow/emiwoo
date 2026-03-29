import {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router';

const NAV_LINKS = [
  {to: '/intent', label: 'Intent'},
  {to: '/about', label: 'About'},
  {to: '/newsroom', label: 'Newsroom'},
  {to: '/contact', label: 'Contact'},
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`site-header transition-transform duration-500 ${
          scrolled ? 'scrolled' : ''
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col items-start gap-0.5 no-underline"
          aria-label="Emi Woo — Home"
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 300,
              letterSpacing: '0.18em',
              color: 'var(--color-text-primary)',
              lineHeight: 1,
            }}
          >
            EMI WOO
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '8px',
              fontWeight: 400,
              letterSpacing: '0.28em',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            The Silk Blouse
          </span>
        </Link>

        {/* Desktop nav */}
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
                color:
                  location.pathname === to
                    ? 'var(--color-accent)'
                    : 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color =
                  'var(--color-text-primary)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  location.pathname === to
                    ? 'var(--color-accent)'
                    : 'var(--color-text-secondary)')
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Shop CTA */}
        <Link
          to="/products/silk-blouse"
          className="btn-accent hidden md:inline-block"
          style={{fontSize: '9px', padding: '10px 24px'}}
        >
          Shop
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{background: 'none', border: 'none', cursor: 'pointer'}}
        >
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--color-text-primary)',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--color-text-primary)',
              transition: 'opacity 0.3s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--color-text-primary)',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </header>

      {/* Mobile menu overlay */}
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
        <Link to="/products/silk-blouse" className="btn-accent mt-4">
          Shop
        </Link>
      </div>
    </>
  );
}
