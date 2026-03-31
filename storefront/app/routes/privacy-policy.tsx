import type {Route} from './+types/privacy-policy';

export const meta: Route.MetaFunction = () => [
  {title: 'Privacy Policy — Emi Woo'},
  {
    name: 'description',
    content: 'How Emi Woo collects, uses, and protects customer data.',
  },
];

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p style={{color: 'var(--color-text-secondary)', lineHeight: 1.8}}>
          We respect your privacy and only collect data needed to process orders,
          improve service quality, and communicate important updates. We never
          sell personal information. Contact us any time to request access,
          correction, or deletion of your data.
        </p>
      </div>
    </section>
  );
}
