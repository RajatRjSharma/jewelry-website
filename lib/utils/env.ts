/**
 * Environment variable utilities
 * Centralized access to environment variables with consistent fallbacks
 * Includes validation to prevent security issues
 */

/**
 * Validate URL format
 */
function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Get the base URL for the application
 * Uses NEXT_PUBLIC_BASE_URL or falls back to a default
 * Validates URL format for security
 */
export function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (!baseUrl) {
    // In production, warn if base URL is not set
    if (process.env.NODE_ENV === 'production') {
      console.warn('NEXT_PUBLIC_BASE_URL is not set. Using default fallback.');
    }
    return 'https://yourdomain.com';
  }
  
  // Validate URL format
  if (!isValidUrl(baseUrl)) {
    console.error('Invalid NEXT_PUBLIC_BASE_URL format. Using default fallback.');
    return 'https://yourdomain.com';
  }
  
  return baseUrl;
}

/**
 * Get the site name (brand name)
 * Can be extended to fetch from CMS if needed
 * Sanitizes output to prevent XSS
 */
export function getSiteName(): string {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Jewels by NavKush';
  
  // Basic sanitization (remove HTML tags)
  return siteName.replace(/<[^>]*>/g, '').trim();
}

