/**
 * Input sanitization utilities
 * Prevents XSS attacks by sanitizing user input
 */

/**
 * Sanitize string input - removes potentially dangerous characters
 * Prevents XSS attacks by removing HTML, scripts, and dangerous protocols
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags (including nested tags)
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags (including nested and encoded)
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<\/?script[^>]*>/gi, '');
  
  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove dangerous protocols (javascript:, data:, vbscript:, etc.)
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/data:text\/html/gi, '');
  sanitized = sanitized.replace(/vbscript:/gi, '');
  sanitized = sanitized.replace(/file:/gi, '');
  
  // Remove HTML entities that could be used for XSS
  sanitized = sanitized.replace(/&#x?[0-9a-f]+;/gi, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj } as T;
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(sanitized[key] as string);
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(sanitized[key] as Record<string, unknown>);
    }
  }
  
  return sanitized;
}

/**
 * Validate and sanitize email
 * Returns sanitized email or throws error if invalid
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }
  
  const sanitized = sanitizeString(email);
  // Basic email validation (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  
  // Additional length check (RFC 5321: max 254 characters)
  if (sanitized.length > 254) {
    throw new Error('Email too long');
  }
  
  return sanitized.toLowerCase().trim();
}

/**
 * Validate and sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  // Remove all non-digit characters except + at the start
  const sanitized = phone.replace(/[^\d+]/g, '');
  // Limit length
  if (sanitized.length > 20) {
    throw new Error('Phone number too long');
  }
  return sanitized;
}

