import {Link} from 'react-router';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  variant?: 'accent' | 'ghost';
}

/**
 * Gold outlined CTA button — the signature Emi Woo button.
 * Pass `to` for internal React Router links, `href` for external.
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
  const cls = `btn-accent ${variant === 'ghost' ? 'opacity-60 hover:opacity-100' : ''} ${className}`;

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
