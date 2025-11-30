/**
 * Simple in-memory rate limiter for API routes
 * 
 * ⚠️ IMPORTANT: This is an in-memory rate limiter that resets on server restart.
 * For production with multiple instances or serverless functions, consider:
 * - Redis-based rate limiting (Upstash, Vercel KV)
 * - Dedicated rate limiting service
 * - Vercel Edge Config for distributed rate limiting
 * 
 * Current implementation is suitable for single-instance deployments.
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
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per 15 minutes
};

/**
 * Get client identifier (IP address or custom identifier)
 */
function getClientId(request: Request): string {
  // Try to get IP from headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  return ip;
}

/**
 * Check if request should be rate limited
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig = defaultConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const clientId = getClientId(request);
  const now = Date.now();
  const key = `${clientId}:${Math.floor(now / config.windowMs)}`;

  // Clean up old entries periodically (prevent memory leaks)
  // Clean up when store gets large or periodically
  if (Object.keys(store).length > 10000 || Math.random() < 0.01) {
    Object.keys(store).forEach((k) => {
      if (store[k].resetTime < now) {
        delete store[k];
      }
    });
  }

  // Check or create entry
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


