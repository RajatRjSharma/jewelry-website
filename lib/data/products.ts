/**
 * Product data access layer
 * Reads from JSON files
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Product, ProductsData } from '@/types/data';

const DATA_DIR = join(process.cwd(), 'data');

/**
 * Load products from JSON file
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
 * Get all products
 */
export async function getProducts(category?: string): Promise<Product[]> {
  const data = await loadProducts();
  let products = data.products;

  if (category) {
    products = products.filter(p => p.category === category);
  }

  return products.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt).getTime();
    const dateB = new Date(b.updatedAt || b.createdAt).getTime();
    return dateB - dateA; // Newest first
  });
}

/**
 * Get product by slug
 */
export async function getProduct(slug: string): Promise<Product | null> {
  const data = await loadProducts();
  return data.products.find(p => p.slug === slug) || null;
}

/**
 * Get most loved products
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
 * Get related products
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
 * Get category images
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

