import type {Route} from './+types/newsroom';

export const meta: Route.MetaFunction = () => [
  {title: 'Newsroom — Emi Woo'},
  {name: 'description', content: 'Press coverage and media enquiries for Emi Woo.'},
];

const PRESS_ENTRIES = [
  {
    outlet: 'Vogue',
    headline: 'The One Blouse Worth Owning',
    date: 'March 2025',
    url: '#',
    tag: 'Feature',
  },
  {
    outlet: 'Harper\'s Bazaar',
    headline: 'Emi Woo Proves Less Is Everything',
    date: 'February 2025',
    url: '#',
    tag: 'Review',
  },
  {
    outlet: 'Elle',
    headline: 'The Silk Blouse That\'s Replacing Our Entire Wardrobe',
    date: 'January 2025',
    url: '#',
    tag: 'Style',
  },
  {
    outlet: 'Business of Fashion',
    headline: 'Why Single-Product Brands Are Fashion\'s Most Interesting Story',
    date: 'December 2024',
    url: '#',
    tag: 'Analysis',
  },
  {
    outlet: 'The Times',
    headline: 'The Designer Who Made One Perfect Thing',
    date: 'November 2024',
    url: '#',
    tag: 'Profile',
  },
  {
    outlet: 'Vogue Living',
    headline: '10 Investment Pieces Worth Every Penny in 2025',
    date: 'October 2024',
    url: '#',
    tag: 'Round-up',
  },
];

export default function Newsroom() {
  return (
    <>
      {/* Page header */}
      <section
        style={{
          paddingTop: 'calc(72px + clamp(60px, 8vw, 100px))',
          paddingBottom: 'clamp(60px, 8vw, 80px)',
          paddingLeft: 'var(--container-pad)',
          paddingRight: 'var(--container-pad)',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '20px',
            }}
          >
            Media
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.0,
            }}
          >
            Newsroom
          </h1>
        </div>
      </section>

      {/* Press grid */}
      <section
        style={{
          background: 'var(--color-bg)',
          padding: 'clamp(60px, 8vw, 100px) var(--container-pad)',
        }}
      >
        <div className="container">
          <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
            {PRESS_ENTRIES.map(({outlet, headline, date, url, tag}) => (
              <a
                key={headline}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr auto',
                  alignItems: 'center',
                  gap: '24px',
                  padding: 'clamp(20px, 2.5vw, 28px) 0',
                  borderBottom: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {/* Outlet */}
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(14px, 1.6vw, 18px)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: 'var(--color-accent)',
                  }}
                >
                  {outlet}
                </span>

                {/* Headline */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    fontWeight: 300,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.5,
                  }}
                >
                  {headline}
                </span>

                {/* Date + tag */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px'}}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 300,
                      letterSpacing: '0.08em',
                      color: 'var(--color-text-secondary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {date}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '8px',
                      fontWeight: 400,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)',
                      opacity: 0.7,
                    }}
                  >
                    {tag}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Press contact */}
      <section
        style={{
          background: 'var(--color-surface)',
          padding: 'clamp(60px, 8vw, 80px) var(--container-pad)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.08em',
              color: 'var(--color-text-secondary)',
            }}
          >
            Press enquiries:{' '}
            <a
              href="mailto:press@emiwoo.com"
              style={{
                color: 'var(--color-accent)',
                textDecoration: 'none',
                letterSpacing: '0.06em',
              }}
            >
              press@emiwoo.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
