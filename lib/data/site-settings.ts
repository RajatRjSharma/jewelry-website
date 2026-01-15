/**
 * Site settings data access layer
 * Reads from JSON files
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { SiteSettings } from '@/types/data';

const DATA_DIR = join(process.cwd(), 'data');

/**
 * Get site settings from JSON file
 * 
 * Returns safe defaults if file is missing or corrupted to prevent app crashes.
 * 
 * @returns Site settings object with brand, hero, about, and other configuration
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const filePath = join(DATA_DIR, 'site-settings.json');
    const fileContents = await readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as SiteSettings;
  } catch (error) {
    console.error('Error loading site settings:', error);
    // Return safe defaults to prevent app crash if settings file is missing or corrupted
    return {
      brand: {
        name: 'Jewels by NavKush',
        tagline: 'A CELESTIAL TOUCH FOR TIMELESS MOMENTS',
      },
      hero: {
        title: 'COLLECTION 2025',
        description: 'Discover our collection of unique, beautifully designed jewelry pieces.',
        buttonText: 'DISCOVER',
        image: '/assets/hero/hero-image.jpg',
        alt: 'Jewelry collection',
      },
      about: {
        title: 'ABOUT US',
        content: [],
        image: '/assets/about/about-image.jpg',
        alt: 'About us',
        buttonText: 'MORE ABOUT US',
      },
      mostLoved: {
        title: 'OUR MOST LOVED CREATIONS',
        slogan: 'Discover our most cherished pieces',
      },
      products: {
        title: 'OUR PRODUCTS',
      },
      contact: {},
      social: {},
      intro: {},
    };
  }
}

