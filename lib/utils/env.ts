/**
 * Environment variable utilities
 * Centralized access to environment variables with consistent fallbacks
 * Includes validation to prevent security issues
 */

/**
 * Validates URL format to ensure it uses http or https protocol
 * Prevents security issues from malformed URLs in environment variables
 * 
 * @param url - URL string to validate
 * @returns True if URL is valid and uses http/https protocol, false otherwise
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
 * 
 * Uses NEXT_PUBLIC_BASE_URL environment variable or falls back to a default.
 * Validates URL format to prevent security issues from malformed URLs.
 * 
 * @returns Base URL string (validated or default fallback)
 */
export function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (!baseUrl) {
    // Warn in production since missing base URL affects SEO and absolute URLs
    if (process.env.NODE_ENV === 'production') {
      console.warn('NEXT_PUBLIC_BASE_URL is not set. Using default fallback.');
    }
    return 'https://yourdomain.com';
  }
  
  // Validate URL format to prevent security issues from malformed URLs
  if (!isValidUrl(baseUrl)) {
    console.error('Invalid NEXT_PUBLIC_BASE_URL format. Using default fallback.');
    return 'https://yourdomain.com';
  }
  
  return baseUrl;
}

/**
 * Get the site name (brand name)
 * 
 * Can be extended to fetch from CMS if needed.
 * Sanitizes output to prevent XSS attacks if environment variable is compromised.
 * 
 * @returns Sanitized site name string
 */
export function getSiteName(): string {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Jewels by NavKush';
  
  // Remove HTML tags to prevent XSS if environment variable is compromised
  return siteName.replace(/<[^>]*>/g, '').trim();
}

