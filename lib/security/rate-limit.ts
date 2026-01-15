/**
 * In-memory rate limiter for API routes
 * 
 * Note: Resets on server restart. For production with multiple instances,
 * consider Redis-based rate limiting (Upstash, Vercel KV) or Edge Config.
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  /** Time window in milliseconds for rate limiting */
  windowMs: number;
  /** Maximum number of requests allowed within the time window */
  maxRequests: number;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000,
  maxRequests: 100,
};

/**
 * Gets client identifier from request headers (IP address)
 * 
 * Sanitizes IP address to prevent injection attacks.
 * Validates IPv4 and IPv6 formats before returning.
 * 
 * @param request - Request object to extract client identifier from
 * @returns Sanitized IP address or 'unknown' if invalid
 */
function getClientId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const rawIp = forwarded?.split(',')[0]?.trim() || realIp?.trim() || 'unknown';
  
  if (rawIp === 'unknown') return 'unknown';
  
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Pattern = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  
  if (ipv4Pattern.test(rawIp) || ipv6Pattern.test(rawIp) || rawIp.startsWith('::')) {
    return rawIp;
  }
  
  return 'unknown';
}

/**
 * Checks if request should be rate limited
 * 
 * Uses time-windowed keys to automatically expire old entries.
 * Performs periodic cleanup to prevent unbounded memory growth.
 * 
 * @param request - Request object to check rate limit for
 * @param config - Rate limit configuration (window and max requests)
 * @returns Object with allowed status, remaining requests, and reset time
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig = defaultConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const clientId = getClientId(request);
  const now = Date.now();
  // Create time-windowed key to automatically expire old entries
  const key = `${clientId}:${Math.floor(now / config.windowMs)}`;

  // Periodic cleanup prevents unbounded memory growth
  // Trigger cleanup when store exceeds threshold or randomly (1% chance)
  if (Object.keys(store).length > 10000 || Math.random() < 0.01) {
    Object.keys(store).forEach((k) => {
      if (store[k].resetTime < now) {
        delete store[k];
      }
    });
  }

  // Initialize rate limit entry for this time window if it doesn't exist
  if (!store[key]) {
    store[key] = {
      count: 0,
      resetTime: now + config.windowMs,
    };
  }

  store[key].count++;

  const remaining = Math.max(0, config.maxRequests - store[key].count);
  const allowed = store[key].count <= config.maxRequests;

  return {
    allowed,
    remaining,
    resetTime: store[key].resetTime,
  };
}


