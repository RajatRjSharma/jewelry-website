/**
 * Security Constants & Configuration
 * 
 * Centralized security configuration values for consistent
 * security implementation across the entire application.
 */

/**
 * Security Configuration
 */
export const SECURITY_CONFIG = {
  // Rate limiting defaults
  RATE_LIMIT: {
    CONTACT_FORM: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 10, // 10 requests per 15 minutes
    },
    DEFAULT: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100, // 100 requests per 15 minutes
    },
  },
  
  // Request size limits
  MAX_REQUEST_SIZE: 10 * 1024, // 10KB
  
  // Input length limits
  MAX_STRING_LENGTH: 10000, // Maximum string length for sanitization
  
  // Validation patterns
  SLUG_PATTERN: /^[a-z0-9_-]+$/i,
  SLUG_MAX_LENGTH: 100,
  PAGE_IDENTIFIER_MAX_LENGTH: 50,
  
  // IP validation patterns
  IPV4_PATTERN: /^(\d{1,3}\.){3}\d{1,3}$/,
  IPV6_PATTERN: /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/,
  
  // Rate limit store cleanup
  RATE_LIMIT_CLEANUP_THRESHOLD: 10000, // Clean up when store exceeds this
  RATE_LIMIT_CLEANUP_PROBABILITY: 0.01, // 1% chance to clean up on each request
} as const;

/**
 * Security Headers Configuration
 */
export const SECURITY_HEADERS = {
  HSTS_MAX_AGE: 63072000, // 2 years in seconds
  HSTS_INCLUDE_SUBDOMAINS: true,
  HSTS_PRELOAD: true,
  
  CSP: {
    DEFAULT_SRC: "'self'",
    SCRIPT_SRC: "'self' 'unsafe-eval' 'unsafe-inline'",
    STYLE_SRC: "'self' 'unsafe-inline' https://fonts.googleapis.com",
    IMG_SRC: "'self' data: https: blob:",
    FONT_SRC: "'self' data: https://fonts.gstatic.com",
    CONNECT_SRC: "'self'",
    FRAME_ANCESTORS: "'none'",
    BASE_URI: "'self'",
    FORM_ACTION: "'self'",
    OBJECT_SRC: "'none'",
    UPGRADE_INSECURE_REQUESTS: true,
  },
} as const;

/**
 * Security Best Practices Guidelines
 * 
 * 1. Input Validation:
 *    - Always validate input with Zod schemas
 *    - Use whitelist approach for parameters
 *    - Validate length, format, and type
 * 
 * 2. Input Sanitization:
 *    - Sanitize all user input before processing
 *    - Remove HTML tags, scripts, event handlers
 *    - Remove dangerous protocols (javascript:, data:, etc.)
 * 
 * 3. Rate Limiting:
 *    - Implement rate limiting on all public APIs
 *    - Use IP-based rate limiting
 *    - Return proper rate limit headers
 * 
 * 4. CSRF Protection:
 *    - Validate Origin header
 *    - Fall back to Referer header
 *    - Stricter validation in production
 * 
 * 5. Security Headers:
 *    - Always include security headers
 *    - Use HSTS with preload
 *    - Implement comprehensive CSP
 * 
 * 6. Error Handling:
 *    - Never expose sensitive information
 *    - Use generic error messages in production
 *    - Log errors securely
 * 
 * 7. Environment Variables:
 *    - Never expose secrets in client-side code
 *    - Use NEXT_PUBLIC_ prefix only for public vars
 *    - Validate environment variables
 * 
 * 8. External Links:
 *    - Always use rel="noopener noreferrer"
 *    - Validate external URLs
 *    - Consider using a URL validator
 * 
 * 9. JSON-LD Security:
 *    - Only use server-generated JSON-LD
 *    - Sanitize all data before JSON.stringify
 *    - Escape HTML entities in JSON-LD
 * 
 * 10. API Security:
 *     - Validate all parameters
 *     - Sanitize all input
 *     - Implement rate limiting
 *     - Use security headers
 *     - Restrict HTTP methods
 */

/**
 * OWASP Top 10 Security Risks
 * 
 * A01: Broken Access Control
 * A02: Cryptographic Failures
 * A03: Injection
 * A04: Insecure Design
 * A05: Security Misconfiguration
 * A06: Vulnerable Components
 * A07: Authentication Failures
 * A08: Software and Data Integrity
 * A09: Security Logging
 * A10: Server-Side Request Forgery
 */
