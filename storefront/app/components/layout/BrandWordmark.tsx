/**
 * Text wordmark placeholder until Sanity provides logo assets per context.
 */
export function BrandWordmark({
  onDark,
  size = 'header',
}: {
  /** Cream on dark hero/header; primary ink on light surfaces */
  onDark?: boolean;
  size?: 'header' | 'footer';
}) {
  const isFooter = size === 'footer';
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: isFooter
          ? 'clamp(26px, 4vw, 34px)'
          : 'clamp(19px, 3.2vw, 28px)',
        fontWeight: 300,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: onDark ? '#f4ede4' : 'var(--color-text-primary)',
        lineHeight: 1.05,
        display: 'block',
      }}
    >
      Emi Woo
    </span>
  );
}
