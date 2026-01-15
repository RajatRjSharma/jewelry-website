'use client';

import { useState } from 'react';
import Button from './Button';
import { showToast } from './Toast';
import { getStockStatus } from '@/lib/utils/price-formatting';
import { Product } from '@/types/data';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

/**
 * Add to Cart Button Component
 * E-commerce best practice: Provides user feedback and handles stock status
 */
export default function AddToCartButton({ 
  product, 
  quantity = 1,
  className = '' 
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const stockStatus = getStockStatus(product.inStock);

  const handleAddToCart = async () => {
    if (!stockStatus.available || isAdding) return;

    setIsAdding(true);

    // Simulate network delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // TODO: Integrate with cart state management (e.g., Zustand store)
      // Example implementation:
      // const { addItem } = useCartStore.getState();
      // addItem({ id: product.id, title: product.title, price: product.price || 0, image: product.image || '', quantity });

      showToast(
        `${product.title} added to cart${quantity > 1 ? ` (${quantity})` : ''}`,
        'success',
        3000
      );
    } catch {
      showToast(
        'Failed to add item to cart. Please try again.',
        'error',
        4000
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={`w-full sm:flex-1 min-h-[44px] ${className}`}
      disabled={!stockStatus.available || isAdding}
      aria-label={
        stockStatus.available
          ? isAdding
            ? `Adding ${product.title} to cart...`
            : `Add ${product.title} to cart`
          : `${product.title} is out of stock`
      }
      aria-disabled={!stockStatus.available || isAdding}
    >
      {isAdding
        ? 'ADDING...'
        : stockStatus.available
        ? 'ADD TO CART'
        : 'OUT OF STOCK'}
    </Button>
  );
}
