import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
}

const classNames = (...values: (string | false | undefined)[]) =>
  values.filter(Boolean).join(' ');

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  onClick,
  disabled = false,
  fullWidth = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = classNames(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full',
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
