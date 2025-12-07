/**
 * Utility function for conditional className concatenation
 * Combines Tailwind classes safely and handles conditional classes
 */

type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean };

/**
 * Combines class names conditionally
 * Similar to clsx but lightweight and custom for our needs
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, condition]) => condition)
          .map(([className]) => className)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}

