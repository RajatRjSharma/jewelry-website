'use client';

import { ReactNode } from 'react';

interface SocialIconProps {
  href: string;
  ariaLabel: string;
  children: ReactNode;
}

/**
 * Social media icon component with consistent styling using CSS variables
 */
export default function SocialIcon({ href, ariaLabel, children }: SocialIconProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={ariaLabel}
      className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-on-beige)] transition-colors"
      style={{ 
        backgroundColor: 'var(--white-opacity-20)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--white-opacity-30)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--white-opacity-20)';
      }}
    >
      {children}
    </a>
  );
}

