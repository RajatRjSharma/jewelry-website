'use client';

import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { SCALE, ROTATE, SPRING_CONFIG } from '@/lib/animations/constants';

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onQuantityChange?: (quantity: number) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * E-commerce quantity selector component
 * Provides increment/decrement buttons and direct input for product quantity
 */
export default function QuantitySelector({
  min = 1,
  max = 10,
  defaultValue = 1,
  onQuantityChange,
  disabled = false,
  className = '',
  id = 'quantity',
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(defaultValue);

  const handleDecrease = () => {
    if (quantity > min && !disabled) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max && !disabled) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max && !disabled) {
      setQuantity(value);
      onQuantityChange?.(value);
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <label htmlFor="quantity" className="sr-only">
        Quantity
      </label>
      <motion.button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[var(--border-light)] rounded-lg bg-[var(--cream)] text-[var(--text-on-cream)] hover:bg-[var(--beige)] hover:text-[var(--text-on-beige)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] touch-target"
        whileHover={{ scale: SCALE.ICON_HOVER, rotate: ROTATE.ICON_TAP }}
        whileTap={{ scale: SCALE.TAP }}
        transition={SPRING_CONFIG.STANDARD}
      >
        <motion.span 
          className="text-xl font-bold"
          whileTap={{ scale: 0.8 }}
        >
          −
        </motion.span>
      </motion.button>
      <motion.input
        id={id}
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        disabled={disabled}
        aria-label="Product quantity"
        className="w-16 sm:w-20 h-10 sm:h-12 text-center border border-[var(--border-light)] rounded-lg bg-[var(--cream)] text-[var(--text-on-cream)] font-medium focus:outline-none focus:border-[var(--beige)] disabled:opacity-50 min-h-[44px] touch-target"
          whileFocus={{ scale: SCALE.HOVER }}
          transition={SPRING_CONFIG.QUICK}
      />
      <motion.button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[var(--border-light)] rounded-lg bg-[var(--cream)] text-[var(--text-on-cream)] hover:bg-[var(--beige)] hover:text-[var(--text-on-beige)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] touch-target"
        whileHover={{ scale: SCALE.ICON_HOVER, rotate: ROTATE.ICON_HOVER }}
        whileTap={{ scale: SCALE.TAP }}
        transition={SPRING_CONFIG.STANDARD}
      >
        <motion.span 
          className="text-xl font-bold"
          whileTap={{ scale: 0.8 }}
        >
          +
        </motion.span>
      </motion.button>
    </div>
  );
}

