'use client';

import { useState } from 'react';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';
import WishlistButton from './WishlistButton';
import { getStockStatus } from '@/lib/utils/price-formatting';
import { Product } from '@/types/data';

interface ProductActionsProps {
  product: Product;
  className?: string;
}

/**
 * Product Actions Component
 * E-commerce best practice: Manages quantity selection and cart/wishlist actions
 */
export default function ProductActions({ product, className = '' }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const stockStatus = getStockStatus(product.inStock);

  return (
    <div className={`space-y-4 sm:space-y-5 pt-4 sm:pt-5 md:pt-6 ${className}`}>
      {stockStatus.available && (
        <div>
          <label 
            htmlFor="quantity-selector"
            className="block text-[var(--text-on-cream)] text-body-sm sm:text-body-base font-medium mb-2"
          >
            Quantity
          </label>
          <QuantitySelector
            id="quantity-selector"
            min={1}
            max={10}
            defaultValue={1}
            disabled={!stockStatus.available}
            onQuantityChange={setQuantity}
          />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <AddToCartButton 
          product={product} 
          quantity={quantity}
        />
        <WishlistButton 
          product={product}
        />
      </div>
    </div>
  );
}
