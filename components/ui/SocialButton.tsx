'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { ANIMATION_PRESETS, OPACITY, DURATION } from '@/lib/animations/constants';

interface SocialButtonProps {
  href: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

/**
 * Reusable social media button component with 3D animations
 * Consistent styling and accessibility across all social buttons
 */
export default function SocialButton({ 
  href, 
  ariaLabel, 
  children, 
  className = '',
  external = true 
}: SocialButtonProps) {
  const baseClasses = 'w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[var(--beige)] text-[var(--text-on-beige)] hover:bg-[var(--beige-hover)] transition-colors min-h-[44px] min-w-[44px] touch-target relative overflow-hidden';
  
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      className={cn(baseClasses, className)}
      whileHover={ANIMATION_PRESETS.ICON_HOVER}
      whileTap={ANIMATION_PRESETS.ICON_TAP}
    >
      <motion.span
        className="relative z-10"
        whileHover={{ scale: 1.1 }}
      >
        {children}
      </motion.span>
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ 
          scale: 1.5, 
          opacity: [0, OPACITY.SHINE, 0],
          transition: { duration: DURATION.SHINE }
        }}
        style={{
          background: `radial-gradient(circle, var(--white-opacity-60) 0%, transparent 70%)`,
        }}
      />
    </motion.a>
  );
}

