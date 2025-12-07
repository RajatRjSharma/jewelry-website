'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface SocialButtonProps {
  href: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

/**
 * Reusable social media button component
 * Consistent styling and accessibility across all social buttons
 */
export default function SocialButton({ 
  href, 
  ariaLabel, 
  children, 
  className = '',
  external = true 
}: SocialButtonProps) {
  const baseClasses = 'w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[var(--beige)] text-[var(--text-on-beige)] hover:bg-[var(--beige-hover)] transition-colors min-h-[44px] min-w-[44px] touch-target';
  
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      className={cn(baseClasses, className)}
    >
      {children}
    </a>
  );
}

