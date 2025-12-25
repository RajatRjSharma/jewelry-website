'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { ANIMATION_3D } from '@/lib/animations/constants';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  className?: string;
  stagger?: boolean;
  index?: number;
}

/**
 * Professional scroll-triggered reveal animation component
 * - Consistent animation pattern with all other components
 * - Uses whileInView for reliable scroll-triggered animations
 * - Respects prefers-reduced-motion for accessibility
 */
export default function ScrollReveal({ 
  children, 
  delay = 0,
  direction = 'up',
  className = '',
  stagger = false,
  index = 0
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Define direction-based initial offsets using consistent values
  const directionOffsets = {
    up: { y: shouldReduceMotion ? 0 : ANIMATION_3D.ENTRY.INITIAL_Y, x: 0, scale: shouldReduceMotion ? 1 : ANIMATION_3D.ENTRY.INITIAL_SCALE },
    down: { y: shouldReduceMotion ? 0 : -ANIMATION_3D.ENTRY.INITIAL_Y, x: 0, scale: shouldReduceMotion ? 1 : ANIMATION_3D.ENTRY.INITIAL_SCALE },
    left: { y: 0, x: shouldReduceMotion ? 0 : ANIMATION_3D.ENTRY.INITIAL_Y, scale: shouldReduceMotion ? 1 : ANIMATION_3D.ENTRY.INITIAL_SCALE },
    right: { y: 0, x: shouldReduceMotion ? 0 : -ANIMATION_3D.ENTRY.INITIAL_Y, scale: shouldReduceMotion ? 1 : ANIMATION_3D.ENTRY.INITIAL_SCALE },
    fade: { y: 0, x: 0, scale: shouldReduceMotion ? 1 : ANIMATION_3D.ENTRY.INITIAL_SCALE },
    scale: { y: 0, x: 0, scale: shouldReduceMotion ? 1 : ANIMATION_3D.ENTRY.INITIAL_SCALE },
  };
  
  const initialOffset = directionOffsets[direction];
  const finalState = { opacity: 1, y: 0, x: 0, scale: 1 };
  const staggerDelay = stagger ? index * ANIMATION_3D.STAGGER.SECTION : 0;
  
  return (
    <motion.div
      initial={{ opacity: ANIMATION_3D.ENTRY.INITIAL_OPACITY, ...initialOffset }}
      whileInView={finalState}
      viewport={{
        once: ANIMATION_3D.VIEWPORT.ONCE,
        margin: ANIMATION_3D.VIEWPORT.MARGIN,
        amount: ANIMATION_3D.VIEWPORT.AMOUNT,
      }}
      transition={{
        duration: shouldReduceMotion ? (ANIMATION_3D.PERFORMANCE?.REDUCE_MOTION_DURATION || 0.2) : ANIMATION_3D.ENTRY.DURATION,
        delay: shouldReduceMotion ? 0 : delay + staggerDelay,
        ease: ANIMATION_3D.ENTRY.EASE,
        // Use 'tween' for scroll animations (better performance)
        type: 'tween' as const,
      }}
      className={className}
      style={{ 
        willChange: shouldReduceMotion ? 'auto' : (ANIMATION_3D.PERFORMANCE?.WILL_CHANGE || 'opacity, transform'),
      }}
    >
      {children}
    </motion.div>
  );
}

