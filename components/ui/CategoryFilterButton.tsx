'use client';

import SmoothLink from '@/components/ui/SmoothLink';
import { motion } from 'framer-motion';
import { ANIMATION_PRESETS, SCALE, DURATION, OPACITY } from '@/lib/animations/constants';

interface CategoryFilterButtonProps {
  name: string;
  href: string;
  isActive: boolean;
}

/**
 * Category filter button component with professional 3D animations
 */
export default function CategoryFilterButton({ 
  name, 
  href, 
  isActive
}: CategoryFilterButtonProps) {
  return (
    <motion.div
      whileHover={ANIMATION_PRESETS.HOVER}
      whileTap={ANIMATION_PRESETS.TAP}
    >
      <SmoothLink href={href} aria-label={`Filter by ${name}`} animated={false}>
        <motion.button
          className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center relative overflow-hidden ${
            isActive
              ? 'bg-[var(--active-dark)] text-[var(--text-on-beige)]'
              : 'bg-[var(--beige)] text-[var(--text-on-beige)] hover:bg-[var(--beige-hover)]'
          }`}
          aria-pressed={isActive}
          whileHover={!isActive ? { 
            scale: SCALE.HOVER,
            transition: ANIMATION_PRESETS.HOVER.transition
          } : {}}
          whileTap={ANIMATION_PRESETS.TAP}
        >
          {/* Shine effect on hover */}
          {!isActive && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%', opacity: 0 }}
              whileHover={{ 
                x: '100%', 
                opacity: [0, OPACITY.SHINE, 0],
                transition: { duration: DURATION.SHINE }
              }}
              style={{
                background: `linear-gradient(90deg, transparent 0%, var(--white-opacity-30) 50%, transparent 100%)`,
              }}
            />
          )}
          <span className="relative z-10">{name}</span>
        </motion.button>
      </SmoothLink>
    </motion.div>
  );
}
