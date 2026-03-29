import type {Route} from './+types/contact';
import {useState} from 'react';
import {Link} from 'react-router';

export const meta: Route.MetaFunction = () => [
  {title: 'Contact — Emi Woo'},
  {name: 'description', content: 'Get in touch with Emi Woo.'},
];

const SOCIAL_LINKS = [
  {label: 'Instagram', handle: '@emiwoo', href: 'https://instagram.com/emiwoo'},
  {label: 'Pinterest', handle: '@emiwoo', href: 'https://pinterest.com/emiwoo'},
  {label: 'TikTok', handle: '@emiwoo', href: 'https://tiktok.com/@emiwoo'},
  {label: 'Facebook', handle: 'Emi Woo', href: 'https://facebook.com/emiwoo'},
  {label: 'YouTube', handle: 'Emi Woo', href: 'https://youtube.com/@emiwoo'},
];

const NAVIGATION_LINKS = [
  {label: 'Account Management', to: '/account'},
  {label: 'About Us', to: '/about'},
  {label: 'Brand Intent', to: '/intent'},
  {label: 'Newsroom', to: '/newsroom'},
  {label: 'Shop', to: '/products/silk-blouse'},
];

export default function Contact() {
  const [form, setForm] = useState({name: '', email: '', message: ''});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Page header */}
      <section
        style={{
          paddingTop: 'calc(72px + clamp(60px, 8vw, 100px))',
          paddingBottom: 'clamp(60px, 6vw, 80px)',
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
            Get in touch
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
            Contact
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section
        style={{
          background: 'var(--color-bg)',
          padding: 'clamp(60px, 8vw, 100px) var(--container-pad)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(60px, 8vw, 120px)',
          }}
        >
          {/* Contact form */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.5vw, 28px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-text-primary)',
                marginBottom: '40px',
              }}
            >
              Send a message
            </h2>

            {submitted ? (
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-accent)',
                  paddingTop: '20px',
                }}
              >
                Thank you. We'll be in touch.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{display: 'flex', flexDirection: 'column', gap: '32px'}}
              >
                {[
                  {field: 'name', label: 'Your name', type: 'text'},
                  {field: 'email', label: 'Email address', type: 'email'},
                ].map(({field, label, type}) => (
                  <div key={field} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <label
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '9px',
                        fontWeight: 400,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      value={form[field as 'name' | 'email']}
                      onChange={(e) => setForm({...form, [field]: e.target.value})}
                      className="newsletter-input"
                    />
                  </div>
                ))}

                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <label
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '9px',
                      fontWeight: 400,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="newsletter-input"
                    style={{resize: 'none', lineHeight: 1.7}}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-accent"
                  style={{alignSelf: 'flex-start'}}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Social & nav links */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '60px'}}>
            {/* Social links */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--color-text-primary)',
                  marginBottom: '32px',
                }}
              >
                Follow us
              </h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
                {SOCIAL_LINKS.map(({label, handle, href}) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 0',
                      borderBottom: '1px solid var(--color-border)',
                      textDecoration: 'none',
                      transition: 'opacity 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 300,
                        letterSpacing: '0.08em',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontWeight: 300,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--color-text-primary)',
                  marginBottom: '32px',
                }}
              >
                Quick links
              </h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
                {NAVIGATION_LINKS.map(({label, to}) => (
                  <Link
                    key={to}
                    to={to}
                    style={{
                      display: 'block',
                      padding: '16px 0',
                      borderBottom: '1px solid var(--color-border)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 300,
                      letterSpacing: '0.08em',
                      color: 'var(--color-text-secondary)',
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
