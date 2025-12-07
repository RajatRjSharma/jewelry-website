/**
 * Categories data access layer
 * Reads from JSON files
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Category, CategoriesData } from '@/types/data';

const DATA_DIR = join(process.cwd(), 'data');

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const filePath = join(DATA_DIR, 'categories.json');
    const fileContents = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as CategoriesData;
    return data.categories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

/**
 * Get category by slug
 */
export async function getCategory(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find(c => c.slug === slug) || null;
}

