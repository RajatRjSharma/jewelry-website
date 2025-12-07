import { CATEGORIES } from '@/lib/constants';

/**
 * Category type from constants
 */
export type CategoryType = typeof CATEGORIES[number];

/**
 * Get random category images for placeholder products
 * Uses the same 4 category images randomly
 */
export function getRandomCategoryImages(count: number): string[] {
  const categoryImages = [
    '/assets/categories/rings.png',
    '/assets/categories/earrings.png',
    '/assets/categories/necklaces.png',
    '/assets/categories/bracelets.png',
  ];
  
  // Randomly select images, allowing repeats
  const selected: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * categoryImages.length);
    selected.push(categoryImages[randomIndex]);
  }
  
  return selected;
}

/**
 * Category image source result
 */
export interface CategoryImageSource {
  src: string;
  alt?: string;
}

/**
 * Get image source for category - uses provided image URL or falls back to public folder
 */
export function getCategoryImageSource(
  category: CategoryType, 
  imageUrl?: string
): CategoryImageSource | null {
  // Priority 1: Provided image URL
  if (imageUrl) {
    return {
      src: imageUrl,
      alt: `${category.name} jewelry collection`,
    };
  }
  
  // Priority 2: Public folder image (fallback)
  // Map category slugs to structured asset paths
  const publicImageMap: Record<string, string> = {
    'rings': '/assets/categories/rings.png',
    'earrings': '/assets/categories/earrings.png',
    'necklaces': '/assets/categories/necklaces.png',
    'bracelets': '/assets/categories/bracelets.png',
  };
  
  const publicImagePath = publicImageMap[category.slug];
  if (publicImagePath) {
    return {
      src: publicImagePath,
      alt: `${category.name} jewelry collection - Exquisite handcrafted ${category.name.toLowerCase()} pieces`,
    };
  }
  
  return null;
}

/**
 * Get image alt text - simple helper for string alt text
 */
export function getImageAltText(
  altText: string | undefined,
  fallback: string
): string {
  return altText || fallback;
}
