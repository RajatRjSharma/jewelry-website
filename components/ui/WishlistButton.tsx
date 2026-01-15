'use client';

import { useState } from 'react';
import Button from './Button';
import { showToast } from './Toast';
import { Product } from '@/types/data';

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

/**
 * Wishlist Button Component
 * E-commerce best practice: Allows users to save items for later
 */
export default function WishlistButton({ 
  product, 
  className = '' 
}: WishlistButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleWishlist = async () => {
    if (isAdding) return;

    setIsAdding(true);

    // Simulate network delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // TODO: Integrate with wishlist state management (e.g., Zustand store)
      // Example implementation:
      // const { toggleWishlist } = useWishlistStore.getState();
      // toggleWishlist(product.id);

      const newState = !isInWishlist;
      setIsInWishlist(newState);

      showToast(
        newState
          ? `${product.title} added to wishlist`
          : `${product.title} removed from wishlist`,
        'info',
        3000
      );
    } catch {
      showToast(
        'Failed to update wishlist. Please try again.',
        'error',
        4000
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleWishlist}
      variant="outline"
      className={`w-full sm:w-auto min-h-[44px] ${className}`}
      disabled={isAdding}
      aria-label={
        isInWishlist
          ? `Remove ${product.title} from wishlist`
          : `Add ${product.title} to wishlist`
      }
      aria-pressed={isInWishlist}
    >
      {isAdding
        ? '...'
        : isInWishlist
        ? '✓ WISHLISTED'
        : 'WISHLIST'}
    </Button>
  );
}
