'use client';

interface ProductBadgeProps {
  type: 'new' | 'featured' | 'mostLoved' | 'sale' | 'outOfStock';
  className?: string;
}

/**
 * Product badge component for displaying product status
 * E-commerce best practice: Clear visual indicators for product status
 */
export default function ProductBadge({ type, className = '' }: ProductBadgeProps) {
  const badgeConfig = {
    new: {
      text: 'NEW',
      bgColor: 'bg-[var(--accent-new)]',
      textColor: 'text-[var(--text-on-beige)]',
    },
    featured: {
      text: 'FEATURED',
      bgColor: 'bg-[var(--accent-featured)]',
      textColor: 'text-[var(--text-on-beige)]',
    },
    mostLoved: {
      text: 'MOST LOVED',
      bgColor: 'bg-[var(--accent-most-loved)]',
      textColor: 'text-[var(--text-on-beige)]',
    },
    sale: {
      text: 'SALE',
      bgColor: 'bg-[var(--accent-sale)]',
      textColor: 'text-[var(--text-on-beige)]',
    },
    outOfStock: {
      text: 'OUT OF STOCK',
      bgColor: 'bg-[var(--accent-out-of-stock)]',
      textColor: 'text-[var(--text-on-beige)]',
    },
  };

  const config = badgeConfig[type];

  return (
    <span
      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold uppercase tracking-wide ${config.bgColor} ${config.textColor} ${className}`}
      aria-label={`Product badge: ${config.text}`}
    >
      {config.text}
    </span>
  );
}

