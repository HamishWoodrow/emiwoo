import type {Route} from './+types/shipping-returns';

export const meta: Route.MetaFunction = () => [
  {title: 'Shipping & Returns — Emi Woo'},
  {
    name: 'description',
    content: 'Shipping timelines, costs, and return process for Emi Woo.',
  },
];

export default function ShippingReturnsPage() {
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
          Shipping &amp; Returns
        </h1>
        <p style={{color: 'var(--color-text-secondary)', lineHeight: 1.8}}>
          We ship worldwide with tracked delivery. If something is not right,
          returns are accepted within our return window in original condition.
          Once inspected, eligible refunds are issued to the original payment
          method.
        </p>
      </div>
    </section>
  );
}
