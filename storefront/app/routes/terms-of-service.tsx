import type {Route} from './+types/terms-of-service';

export const meta: Route.MetaFunction = () => [
  {title: 'Terms of Service — Emi Woo'},
  {
    name: 'description',
    content: 'Terms governing purchases and use of Emi Woo services.',
  },
];

export default function TermsOfServicePage() {
  return (
    <section
      style={{
        background: 'var(--color-bg)',
        padding: '120px var(--container-pad) 80px',
      }}
    >
      <div className="container" style={{maxWidth: '820px'}}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 5vw, 56px)',
            fontWeight: 300,
            color: 'var(--color-text-primary)',
            marginBottom: '20px',
          }}
        >
          Terms of Service
        </h1>
        <p style={{color: 'var(--color-text-secondary)', lineHeight: 1.8}}>
          By using this website and placing an order, you agree to our terms
          around payment, fulfillment timelines, returns, and product
          availability. We reserve the right to update these terms to reflect
          operational and legal requirements.
        </p>
      </div>
    </section>
  );
}
