/**
 * Responsive Helper Functions
 * 
 * Utility functions for responsive design patterns
 */

import { BREAKPOINTS } from './constants';

/**
 * Check if current viewport matches breakpoint
 * @param breakpoint - Breakpoint to check
 * @returns boolean indicating if viewport matches
 */
export function isBreakpoint(breakpoint: keyof typeof BREAKPOINTS): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS[breakpoint];
}

/**
 * Get responsive class string for flex direction
 * @param mobile - Mobile flex direction
 * @param desktop - Desktop flex direction
 * @param breakpoint - Breakpoint to switch (default: 'md')
 * @returns Responsive class string
 */
export function getFlexDirection(
  mobile: 'col' | 'row' = 'col',
  desktop: 'col' | 'row' = 'row',
  breakpoint: 'sm' | 'md' | 'lg' = 'md'
): string {
  return `flex-${mobile} ${breakpoint}:flex-${desktop}`;
}

/**
 * Get responsive class string for grid columns
 * @param mobile - Mobile columns
 * @param tablet - Tablet columns
 * @param desktop - Desktop columns
 * @param large - Large desktop columns
 * @returns Responsive class string
 */
export function getGridColumns(
  mobile: number = 1,
  tablet?: number,
  desktop?: number,
  large?: number
): string {
  const classes = [`grid-cols-${mobile}`];
  if (tablet) classes.push(`sm:grid-cols-${tablet}`);
  if (desktop) classes.push(`md:grid-cols-${desktop}`);
  if (large) classes.push(`lg:grid-cols-${large}`);
  return classes.join(' ');
}

/**
 * Get responsive padding class string
 * @param size - Size variant ('small' | 'medium' | 'large')
 * @returns Responsive padding class string
 */
export function getResponsivePadding(size: 'small' | 'medium' | 'large' = 'medium'): string {
  const patterns = {
    small: 'px-4 sm:px-5 md:px-6',
    medium: 'px-6 sm:px-7 md:px-8',
    large: 'px-8 sm:px-10 md:px-12',
  };
  return patterns[size];
}

/**
 * Get responsive gap class string
 * @param size - Size variant ('small' | 'medium' | 'large')
 * @returns Responsive gap class string
 */
export function getResponsiveGap(size: 'small' | 'medium' | 'large' = 'medium'): string {
  const patterns = {
    small: 'gap-3 sm:gap-4 md:gap-6',
    medium: 'gap-4 sm:gap-6 md:gap-8 lg:gap-12',
    large: 'gap-6 sm:gap-8 md:gap-10 lg:gap-12',
  };
  return patterns[size];
}

/**
 * Get responsive text size class string
 * @param variant - Text variant
 * @returns Responsive text class string
 */
export function getResponsiveText(variant: 'product' | 'body' | 'small' | 'nav' = 'body'): string {
  const patterns = {
    product: 'text-base sm:text-lg md:text-xl',
    body: 'text-body-sm sm:text-body-base',
    small: 'text-xs sm:text-sm',
    nav: 'text-xs sm:text-sm',
  };
  return patterns[variant];
}
