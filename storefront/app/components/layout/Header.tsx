import {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router';

const NAV_LINKS = [
  {to: '/intent', label: 'Intent'},
  {to: '/about', label: 'About'},
  {to: '/newsroom', label: 'Newsroom'},
  {to: '/contact', label: 'Contact'},
];

/**
 * Transparent over hero/dark sections; frosted-beige when scrolled.
 * Text colour flips between cream (over hero) and dark-brown (over beige).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // isOverDark = true while the header is visually over a dark section (hero/parallax)
  const [isOverDark, setIsOverDark] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // On non-homepage routes, the hero doesn't exist — always use dark text
    const isHome = location.pathname === '/';

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      setScrolled(y > 60);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;

      if (isHome) {
        // Hero is 100svh; brand statement follows (also dark bg).
        // Switch to dark text after first two sections (~200vh).
        // But parallax story beats also have dark overlays, so stay light
        // until the press section (around 500vh on desktop).
        // Simpler rule: light text until 85% through the hero section.
        setIsOverDark(y < vh * 0.85);
      } else {
        setIsOverDark(false);
      }
    };

    // Set initial state
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const logoColor = isOverDark && !scrolled ? '#f4ede4' : 'var(--color-text-primary)';
  const logoSubColor = isOverDark && !scrolled ? 'rgba(244,237,228,0.6)' : 'var(--color-accent)';
  const navColor = isOverDark && !scrolled ? 'rgba(244,237,228,0.7)' : 'var(--color-text-secondary)';
  const navActiveColor = isOverDark && !scrolled ? '#f4ede4' : 'var(--color-accent)';
  const burgerColor = isOverDark && !scrolled ? '#f4ede4' : 'var(--color-text-primary)';

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
          style={{transition: 'color 0.4s'}}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 300,
              letterSpacing: '0.18em',
              color: logoColor,
              lineHeight: 1,
              transition: 'color 0.4s',
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
              color: logoSubColor,
              textTransform: 'uppercase',
              lineHeight: 1,
              transition: 'color 0.4s',
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
                color: location.pathname === to ? navActiveColor : navColor,
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Shop CTA */}
        <Link
          to="/products/silk-blouse"
          className={isOverDark && !scrolled ? 'btn-accent-light' : 'btn-accent'}
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
