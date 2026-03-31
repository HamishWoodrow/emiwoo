import type {Route} from './+types/faq';

export const meta: Route.MetaFunction = () => [
  {title: 'FAQ — Emi Woo'},
  {
    name: 'description',
    content:
      'Frequently asked questions about sizing, care, shipping, and orders at Emi Woo.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How should I choose my size?',
    a: 'Start with your usual size. If you are between sizes and prefer a relaxed drape, size up. If you prefer a closer fit through the shoulders, choose your smaller size. We will add a detailed measurement chart as more pieces launch.',
  },
  {
    q: 'How do I care for silk pieces?',
    a: 'For best longevity, hand wash cold with a gentle detergent or dry clean. Avoid tumble drying, reshape while damp, and steam lightly from the inside to protect the finish.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We ship worldwide with tracked delivery. Shipping rates and estimated delivery windows are shown at checkout based on your region.',
  },
  {
    q: 'What is your return policy?',
    a: 'Items may be returned within the return window if unworn and in original condition with tags attached. Once received and inspected, refunds are issued to your original payment method.',
  },
  {
    q: 'Will you release more than one product?',
    a: 'Yes. Emi Woo is expanding into a tightly edited collection over time. The same approach remains: fewer, better pieces with careful material and construction choices.',
  },
  {
    q: 'How can I hear about new launches?',
    a: 'Join our newsletter at the bottom of the homepage. We only send occasional updates when there is something truly new to share.',
  },
] as const;

export default function FaqPage() {
  return (
    <section
      style={{
        background: 'var(--color-bg)',
        padding: '120px var(--container-pad) 90px',
      }}
    >
      <div className="container" style={{maxWidth: '920px'}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            marginBottom: '38px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-cta)',
            }}
          >
            Support
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px, 5vw, 60px)',
              fontWeight: 300,
              lineHeight: 1.04,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              maxWidth: '62ch',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: 1.8,
              letterSpacing: '0.03em',
              color: 'var(--color-text-secondary)',
            }}
          >
            Everything you might want to know before you order. If your question
            is not covered here, contact us and we will help directly.
          </p>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              style={{
                borderBottom: '1px solid var(--color-border)',
                padding: '0',
              }}
            >
              <summary
                style={{
                  listStyle: 'none',
                  cursor: 'pointer',
                  padding: '24px 0',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 3.2vw, 30px)',
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: 'var(--color-text-primary)',
                }}
              >
                {item.q}
              </summary>
              <p
                style={{
                  margin: '0 0 24px',
                  maxWidth: '74ch',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.85,
                  letterSpacing: '0.03em',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
