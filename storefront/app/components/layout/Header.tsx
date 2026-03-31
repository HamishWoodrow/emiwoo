import {useState, useEffect} from 'react';
import {Link, useLocation, useRouteLoaderData} from 'react-router';
import {useOptimisticCart} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {BrandWordmark} from '~/components/layout/BrandWordmark';

const NAV_LINKS = [
  {to: '/intent', label: 'Intent'},
  {to: '/about', label: 'About'},
  {to: '/newsroom', label: 'Newsroom'},
  {to: '/contact', label: 'Contact'},
];

type RootLoaderData = {cart?: CartApiQueryFragment | null};

function HeaderCartTrigger({
  color,
  onBeforeOpen,
}: {
  color: string;
  onBeforeOpen?: () => void;
}) {
  const {open} = useAside();
  const rootData = useRouteLoaderData('root') as RootLoaderData | undefined;
  const cart = useOptimisticCart(rootData?.cart ?? null);
  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      type="button"
      className="header-cart-trigger"
      onClick={() => {
        onBeforeOpen?.();
        open('cart');
      }}
      aria-label={
        count ? `Open shopping bag, ${count} items` : 'Open shopping bag'
      }
      style={{color}}
    >
      <span className="header-cart-trigger-label">Bag</span>
      {count > 0 ? (
        <span className="header-cart-trigger-count">{count}</span>
      ) : null}
    </button>
  );
}

/**
 * Transparent over dark sections; frosted page background when scrolled.
 * Uses IntersectionObserver on [data-header-theme] markers (homepage).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
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
        className={`site-header transition-[background,backdrop-filter,border-color] duration-500 ${
          scrolled ? 'scrolled' : ''
        }`}
      >
        <Link
          to="/"
          className="flex flex-col items-start gap-1 no-underline focus-visible:outline-offset-4"
          aria-label="Emi Woo — Home"
        >
          <BrandWordmark onDark={onDark} size="header" />
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
            Timeless womenswear
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-10" aria-label="Main navigation">
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
          <div className="flex items-center gap-8">
            <HeaderCartTrigger color={navColor} />
            <Link
              to="/products/silk-blouse"
              className={onDark ? 'btn-cta-light' : 'btn-cta'}
              style={{fontSize: '9px', padding: '10px 24px'}}
            >
              Shop
            </Link>
          </div>
        </div>

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
        <div className="md:hidden">
          <HeaderCartTrigger
            color="var(--color-text-primary)"
            onBeforeOpen={() => setMenuOpen(false)}
          />
        </div>
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
