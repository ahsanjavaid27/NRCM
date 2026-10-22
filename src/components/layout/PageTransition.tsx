import { motion, useReducedMotion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Fades the routed page in on every navigation.
 *
 * There is deliberately no exit animation: the new page is mounted
 * immediately, so the transition never delays navigation. The effect is
 * skipped entirely when the visitor prefers reduced motion.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  if (reduceMotion || typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
