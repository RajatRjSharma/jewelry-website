/**
 * Environment variable utilities
 * Centralized access to environment variables with consistent fallbacks
 */

/**
 * Get the base URL for the application
 * Uses NEXT_PUBLIC_BASE_URL or falls back to a default
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
}

/**
 * Get the site name (brand name)
 * Can be extended to fetch from CMS if needed
 */
export function getSiteName(): string {
  return process.env.NEXT_PUBLIC_SITE_NAME || 'Jewels by NavKush';
}

