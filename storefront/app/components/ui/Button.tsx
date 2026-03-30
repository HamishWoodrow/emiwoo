import {Link} from 'react-router';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  /** accent = dark gold on beige (default); light = cream on dark image backgrounds */
  variant?: 'accent' | 'light' | 'ghost';
}

/**
 * CTA button with two variants:
 *  - accent (default): dark gold border/text — for beige/cream backgrounds
 *  - light: cream border/text — for use over dark image/video backgrounds
 */
export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  variant = 'accent',
}: ButtonProps) {
  const baseClass =
    variant === 'light' ? 'btn-accent-light' : 'btn-accent';
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
