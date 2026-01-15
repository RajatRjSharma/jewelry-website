/**
 * Product data access layer
 * Reads from JSON files
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Product, ProductsData } from '@/types/data';

const DATA_DIR = join(process.cwd(), 'data');

/**
 * Loads products from JSON file
 * 
 * Handles file read errors gracefully by returning empty products array
 * to prevent app crashes if data file is missing or corrupted.
 * 
 * @returns Products data object with products array and metadata
 */
async function loadProducts(): Promise<ProductsData> {
  try {
    const filePath = join(DATA_DIR, 'products.json');
    const fileContents = await readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as ProductsData;
  } catch (error) {
    console.error('Error loading products:', error);
    return { products: [], meta: { total: 0, lastUpdated: new Date().toISOString() } };
  }
}

/**
 * Get all products, optionally filtered by category
 * 
 * Products are sorted by most recently updated/created to show latest items first.
 * 
 * @param category - Optional category filter (rings, earrings, necklaces, bracelets)
 * @returns Array of products, sorted by most recent first
 */
export async function getProducts(category?: string): Promise<Product[]> {
  const data = await loadProducts();
  let products = data.products;

  if (category) {
    products = products.filter(p => p.category === category);
  }

  // Sort by most recently updated/created to show latest products first
  return products.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt).getTime();
    const dateB = new Date(b.updatedAt || b.createdAt).getTime();
    return dateB - dateA;
  });
}

/**
 * Get a single product by its slug identifier
 * 
 * @param slug - Product slug (URL-friendly identifier)
 * @returns Product object if found, null otherwise
 */
export async function getProduct(slug: string): Promise<Product | null> {
  const data = await loadProducts();
  return data.products.find(p => p.slug === slug) || null;
}

/**
 * Get products marked as "most loved"
 * 
 * Products are sorted by most recently updated/created to show latest items first.
 * 
 * @param limit - Maximum number of products to return (default: 8)
 * @returns Array of most loved products, sorted by most recent first
 */
export async function getMostLovedProducts(limit: number = 8): Promise<Product[]> {
  const data = await loadProducts();
  return data.products
    .filter(p => p.mostLoved === true)
    .slice(0, limit)
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();
      return dateB - dateA;
    });
}

/**
 * Get related products from the same category, excluding the current product
 * 
 * Products are sorted by most recently updated/created to show latest items first.
 * 
 * @param category - Product category to filter by
 * @param excludeId - Product ID to exclude from results
 * @param limit - Maximum number of products to return (default: 4)
 * @returns Array of related products, sorted by most recent first
 */
export async function getRelatedProducts(
  category: string,
  excludeId: string,
  limit: number = 4
): Promise<Product[]> {
  const data = await loadProducts();
  return data.products
    .filter(p => p.category === category && p.id !== excludeId)
    .slice(0, limit)
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();
      return dateB - dateA;
    });
}

/**
 * Get image URLs for each product category
 * 
 * Uses the first product found in each category as the category image.
 * 
 * @returns Object mapping category slugs to image URLs
 */
export async function getCategoryImages(): Promise<Record<string, string>> {
  const data = await loadProducts();
  const categoryImages: Record<string, string> = {};
  const categories = ['rings', 'earrings', 'necklaces', 'bracelets'];

  categories.forEach((category) => {
    const product = data.products.find(p => p.category === category);
    if (product) {
      categoryImages[category] = product.image;
    }
  });

  return categoryImages;
}

