import type { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'soft' | 'inverse';
  padded?: boolean;
}

export default function Card({
  children,
  className,
  variant = 'default',
  padded = true,
}: CardProps) {
  const classNames = [
    'card',
    `card--${variant}`,
    padded && 'card--padded',
    className,
  ].filter(Boolean).join(' ');

  return <div className={classNames}>{children}</div>;
}
