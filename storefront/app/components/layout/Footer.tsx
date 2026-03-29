import {Link} from 'react-router';

const SOCIAL_LINKS = [
  {label: 'Instagram', href: 'https://instagram.com/emiwoo'},
  {label: 'Pinterest', href: 'https://pinterest.com/emiwoo'},
  {label: 'TikTok', href: 'https://tiktok.com/@emiwoo'},
  {label: 'Facebook', href: 'https://facebook.com/emiwoo'},
  {label: 'YouTube', href: 'https://youtube.com/@emiwoo'},
];

const NAV_LINKS = [
  {to: '/', label: 'Home'},
  {to: '/intent', label: 'Intent'},
  {to: '/about', label: 'About'},
  {to: '/newsroom', label: 'Newsroom'},
  {to: '/contact', label: 'Contact'},
  {to: '/products/silk-blouse', label: 'Shop'},
];

const LEGAL_LINKS = [
  {href: '#', label: 'Privacy Policy'},
  {href: '#', label: 'Terms of Service'},
  {href: '#', label: 'Shipping & Returns'},
];

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '80px',
        paddingBottom: '40px',
      }}
    >
      <div className="container">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-16 pb-16" style={{borderBottom: '1px solid var(--color-border)'}}>
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link to="/" style={{textDecoration: 'none'}}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 300,
                  letterSpacing: '0.18em',
                  color: 'var(--color-text-primary)',
                }}
              >
                EMI WOO
              </span>
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: '1.7',
                color: 'var(--color-text-secondary)',
              }}
            >
              A single blouse, designed without compromise. Crafted in the
              finest silk for the woman who needs nothing more.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                }}
              >
                Pages
              </span>
              {NAV_LINKS.map(({to, label}) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      'var(--color-text-primary)')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      'var(--color-text-secondary)')
                  }
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                }}
              >
                Follow
              </span>
              {SOCIAL_LINKS.map(({label, href}) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      'var(--color-text-primary)')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      'var(--color-text-secondary)')
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{color: 'var(--color-text-secondary)'}}
        >
          <p style={{fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 300, letterSpacing: '0.06em'}}>
            © {new Date().getFullYear()} Emi Woo. All rights reserved.
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map(({href, label}) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
