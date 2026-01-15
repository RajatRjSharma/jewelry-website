/**
 * Reusable Flex Container Component
 * 
 * Common flex layout patterns extracted into a reusable component
 * to reduce code duplication and ensure consistency.
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface FlexContainerProps {
  children: ReactNode;
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'none' | 'sm' | 'md' | 'lg';
  wrap?: boolean;
  className?: string;
}

/**
 * Reusable flex container with common layout patterns
 */
export default function FlexContainer({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'none',
  wrap = false,
  className = '',
}: FlexContainerProps) {
  const directionClass = direction === 'col' ? 'flex-col' : 'flex-row';
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }[align];
  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }[justify];
  const gapClass = {
    none: '',
    sm: 'gap-2 sm:gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
  }[gap];
  const wrapClass = wrap ? 'flex-wrap' : '';

  return (
    <div
      className={cn(
        'flex',
        directionClass,
        alignClass,
        justifyClass,
        gapClass,
        wrapClass,
        className
      )}
    >
      {children}
    </div>
  );
}
