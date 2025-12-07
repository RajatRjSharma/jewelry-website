'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { ANIMATION_3D } from '@/lib/animations/constants';

interface ProductImage3DProps {
  image: string;
  alt: string;
  priority?: boolean;
}

/**
 * 3D animated product detail image component
 */
export default function ProductImage3D({ image, alt, priority = false }: ProductImage3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Standardized 3D tilt effects
  const rotateX = useSpring(useTransform(y, [ANIMATION_3D.ROTATION.RANGE_MIN, ANIMATION_3D.ROTATION.RANGE_MAX], [ANIMATION_3D.ROTATION.MAX, -ANIMATION_3D.ROTATION.MAX]), {
    stiffness: ANIMATION_3D.SPRING.STIFFNESS,
    damping: ANIMATION_3D.SPRING.DAMPING
  });
  const rotateY = useSpring(useTransform(x, [ANIMATION_3D.ROTATION.RANGE_MIN, ANIMATION_3D.ROTATION.RANGE_MAX], [-ANIMATION_3D.ROTATION.MAX, ANIMATION_3D.ROTATION.MAX]), {
    stiffness: ANIMATION_3D.SPRING.STIFFNESS,
    damping: ANIMATION_3D.SPRING.DAMPING
  });
  
  // Standardized Z-axis translation for depth
  const distanceX = useTransform(x, (v) => Math.abs(v));
  const distanceY = useTransform(y, (v) => Math.abs(v));
  const translateZ = useSpring(useTransform(
    [distanceX, distanceY],
    ([dx, dy]: number[]) => {
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance * ANIMATION_3D.DEPTH.MULTIPLIER;
    }
  ), {
    stiffness: ANIMATION_3D.SPRING.STIFFNESS,
    damping: ANIMATION_3D.SPRING.DAMPING
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Check if element is in viewport on mount
  const isInView = useInView(imageRef, { 
    once: ANIMATION_3D.VIEWPORT.ONCE, 
    margin: ANIMATION_3D.VIEWPORT.MARGIN,
    amount: ANIMATION_3D.VIEWPORT.AMOUNT,
    initial: true,
  });
  
  // Professional animation: visible content animates immediately, hidden content animates on scroll
  return (
    <motion.div
      ref={imageRef}
      initial={{ opacity: 1, y: 30, scale: 0.95, rotateY: 0 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : undefined}
      whileInView={!isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : undefined}
      viewport={{ 
        once: ANIMATION_3D.VIEWPORT.ONCE, 
        margin: ANIMATION_3D.VIEWPORT.MARGIN,
        amount: ANIMATION_3D.VIEWPORT.AMOUNT 
      }}
      transition={{ 
        duration: ANIMATION_3D.ENTRY.DURATION, 
        delay: 0.2,
        ease: ANIMATION_3D.ENTRY.EASE,
        type: ANIMATION_3D.ENTRY.TYPE,
        stiffness: ANIMATION_3D.ENTRY.STIFFNESS,
        damping: ANIMATION_3D.ENTRY.DAMPING
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] bg-[var(--beige)] rounded-lg overflow-hidden"
      style={{
        perspective: ANIMATION_3D.PERSPECTIVE,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        <motion.div 
          className="relative w-full h-full z-10"
          animate={isHovered ? { 
            scale: ANIMATION_3D.SCALE.IMAGE_HOVER,
          } : { 
            scale: 1,
          }}
          transition={{ duration: ANIMATION_3D.HOVER.DURATION, ease: ANIMATION_3D.HOVER.EASE }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain relative z-10"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        
        {/* Standardized shadow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered ? ANIMATION_3D.SHADOW.HOVER : ANIMATION_3D.SHADOW.DEFAULT,
          }}
          transition={{ duration: ANIMATION_3D.SHADOW.TRANSITION_DURATION, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  );
}


