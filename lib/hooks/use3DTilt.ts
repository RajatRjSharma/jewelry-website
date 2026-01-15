/**
 * Reusable 3D Tilt Hook
 * 
 * Provides 3D tilt animation functionality for cards and interactive elements.
 * Centralizes the 3D tilt logic to reduce code duplication.
 */

import { useRef, useState } from 'react';
import { useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { TILT_3D } from '@/lib/animations/constants';

export interface Use3DTiltReturn {
  cardRef: React.RefObject<HTMLDivElement | null>;
  isHovered: boolean;
  isPressed: boolean;
  rotateX: MotionValue<string>;
  rotateY: MotionValue<string>;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
}

/**
 * Hook for 3D tilt animation effect
 * @param enabled - Whether the tilt effect is enabled (default: true)
 * @returns Object with refs, state, and handlers for 3D tilt
 */
export function use3DTilt(enabled: boolean = true): Use3DTiltReturn {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Track mouse position as normalized coordinates (-0.5 to 0.5) for tilt calculation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, TILT_3D.SPRING);
  const mouseYSpring = useSpring(y, TILT_3D.SPRING);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${TILT_3D.MAX_ROTATE}deg`, `-${TILT_3D.MAX_ROTATE}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${TILT_3D.MAX_ROTATE}deg`, `${TILT_3D.MAX_ROTATE}deg`]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !cardRef.current) return;

    // Calculate normalized mouse position relative to card center
    // Results in -0.5 to 0.5 range for smooth tilt mapping
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (!enabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    setIsHovered(false);
    setIsPressed(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseDown = () => {
    if (!enabled) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (!enabled) return;
    setIsPressed(false);
  };

  return {
    cardRef,
    isHovered,
    isPressed,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
  };
}
