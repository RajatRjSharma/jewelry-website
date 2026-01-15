/**
 * JSON-LD sanitization utility
 * Centralized function to sanitize strings for safe JSON-LD injection
 */

/**
 * Sanitize string for JSON-LD to prevent XSS
 * Removes HTML tags, dangerous protocols, and event handlers
 */
export function sanitizeForJsonLd(str: string): string {
  // Sanitize string before JSON-LD injection to prevent XSS
  // Order matters: remove tags first, then protocols, then event handlers
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

