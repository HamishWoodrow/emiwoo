import {Link} from 'react-router';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  /**
   * accent = subtle green-detail outline on beige (secondary)
   * cta = primary blue-gray CTA (Pantone)
   * light / cta-light = on dark hero/parallax
   */
  variant?: 'accent' | 'cta' | 'light' | 'cta-light' | 'ghost';
}

/**
 * CTA variants for beige vs dark full-bleed sections.
 */
export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  variant = 'cta',
}: ButtonProps) {
  const baseClass =
    variant === 'light'
      ? 'btn-accent-light'
      : variant === 'cta-light'
        ? 'btn-cta-light'
        : variant === 'accent'
          ? 'btn-accent'
          : 'btn-cta';
  const cls = `${baseClass} ${variant === 'ghost' ? 'opacity-60 hover:opacity-100' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
