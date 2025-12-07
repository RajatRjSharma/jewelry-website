import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered';
}

/**
 * Reusable Card component with consistent styling
 */
export default function Card({ 
  children,
  className = '',
  padding = 'md',
  variant = 'bordered',
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  };

  const variantClasses = {
    default: 'bg-[var(--cream)] rounded-lg',
    bordered: 'bg-[var(--cream)] rounded-lg border border-[var(--border-light)]',
  };

  return (
    <div className={cn(variantClasses[variant], paddingClasses[padding], className)}>
      {children}
    </div>
  );
}


