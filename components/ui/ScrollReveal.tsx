'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
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
 * - Content always visible (opacity: 1) to prevent invisible content on navigation
 * - If already in viewport: animates immediately on mount
 * - If not in viewport: animates when scrolled into view
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
  const ref = useRef<HTMLDivElement>(null);
  
  // Check if element is in viewport immediately on mount
  const isInView = useInView(ref, { 
    once: ANIMATION_3D.VIEWPORT.ONCE, 
    margin: ANIMATION_3D.VIEWPORT.MARGIN,
    amount: ANIMATION_3D.VIEWPORT.AMOUNT,
    initial: true, // Check immediately to determine if in viewport
  });
  
  // Define direction-based initial offsets (subtle, content stays visible)
  const directionOffsets = {
    up: { y: shouldReduceMotion ? 0 : 30, x: 0, scale: 1 },
    down: { y: shouldReduceMotion ? 0 : -30, x: 0, scale: 1 },
    left: { y: 0, x: shouldReduceMotion ? 0 : 30, scale: 1 },
    right: { y: 0, x: shouldReduceMotion ? 0 : -30, scale: 1 },
    fade: { y: 0, x: 0, scale: 1 },
    scale: { y: 0, x: 0, scale: shouldReduceMotion ? 1 : 0.95 },
  };
  
  const initialOffset = directionOffsets[direction];
  const finalState = { opacity: 1, y: 0, x: 0, scale: 1 };
  const staggerDelay = stagger ? index * 0.1 : 0;
  
  // Always start with offset (visible but slightly transformed)
  // If in viewport: animate immediately using 'animate' prop
  // If not in viewport: animate when scrolled into view using 'whileInView'
  const shouldAnimateImmediately = isInView && !shouldReduceMotion;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, ...initialOffset }}
      animate={shouldAnimateImmediately ? finalState : initialOffset}
      whileInView={!shouldAnimateImmediately ? finalState : undefined}
      viewport={!shouldAnimateImmediately ? {
        once: ANIMATION_3D.VIEWPORT.ONCE,
        margin: ANIMATION_3D.VIEWPORT.MARGIN,
        amount: ANIMATION_3D.VIEWPORT.AMOUNT,
      } : undefined}
      transition={{
        duration: shouldReduceMotion ? 0.2 : ANIMATION_3D.ENTRY.DURATION,
        delay: shouldReduceMotion ? 0 : delay + staggerDelay,
        ease: ANIMATION_3D.ENTRY.EASE,
      }}
      className={className}
      style={{ 
        willChange: shouldReduceMotion ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </motion.div>
  );
}

