import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  className?: string;
}

/**
 * Reusable Page Container component with consistent layout
 */
export default function PageContainer({ 
  children,
  maxWidth = 'full',
  className = '',
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    full: '',
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      <div className="section-container section-padding">
        {maxWidth !== 'full' ? (
          <div className={cn(maxWidthClasses[maxWidth], 'mx-auto', className)}>
            {children}
          </div>
        ) : (
          <div className={className}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

