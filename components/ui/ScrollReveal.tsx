'use client';

import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** @deprecated Kept for backward compatibility, ignored (animations removed) */
  delay?: number;
  /** @deprecated Kept for backward compatibility, ignored (animations removed) */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  /** @deprecated Kept for backward compatibility, ignored (animations removed) */
  stagger?: boolean;
}

/**
 * ScrollReveal Component
 * 
 * Simple wrapper component maintained for backward compatibility.
 * Scroll-triggered animations were removed due to iOS Safari performance issues.
 */
export default function ScrollReveal({ 
  children, 
  className = '',
}: ScrollRevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
