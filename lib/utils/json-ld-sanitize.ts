/**
 * JSON-LD sanitization utility
 * Centralized function to sanitize strings for safe JSON-LD injection
 */

/**
 * Sanitize string for JSON-LD to prevent XSS
 * Removes HTML tags, dangerous protocols, and event handlers
 */
export function sanitizeForJsonLd(str: string): string {
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove dangerous protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

