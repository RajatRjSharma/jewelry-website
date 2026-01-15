import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/schemas';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { sanitizeString, sanitizeEmail, sanitizePhone } from '@/lib/security/sanitize';
import { logError } from '@/lib/security/error-handler';
import { getSecurityHeaders } from '@/lib/security/api-headers';

const MAX_REQUEST_SIZE = 10 * 1024;

/**
 * Validates request origin for CSRF protection
 */
function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Use Referer as fallback since same-origin requests may omit Origin header
  const originToCheck = origin || referer;
  
  if (!originToCheck) {
    // Missing both headers could indicate same-origin request or direct API call
    // Strict validation in production prevents unauthorized access
    if (process.env.NODE_ENV === 'production') {
      return false;
    }
    // Allow in development for testing convenience
    return true;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (baseUrl) {
    try {
      const baseUrlObj = new URL(baseUrl);
      const originObj = new URL(originToCheck);
      // Same-origin requests are always allowed
      if (originObj.origin === baseUrlObj.origin) return true;
    } catch {
      // Invalid URL format indicates potential attack
      return false;
    }
  }
  
  // Allow localhost in development for local testing
  if (process.env.NODE_ENV === 'development') {
    try {
      const originObj = new URL(originToCheck);
      if (originObj.hostname === 'localhost' || originObj.hostname === '127.0.0.1') {
        return true;
      }
    } catch {
      return false;
    }
  }
  
  // Production: only same-origin requests allowed
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Validate request origin to prevent CSRF attacks
    if (!isValidOrigin(request)) {
      return NextResponse.json(
        { success: false, error: 'Invalid origin' },
        { 
          status: 403,
          headers: getSecurityHeaders(),
        }
      );
    }

    // Apply stricter rate limiting for contact form to prevent spam
    const rateLimit = checkRateLimit(request, {
      windowMs: 15 * 60 * 1000,
      maxRequests: 10,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      );
    }

    // Enforce JSON content type to prevent content-type confusion attacks
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { 
          status: 400,
          headers: getSecurityHeaders(),
        }
      );
    }

    // Validate request size from header to fail fast before parsing body
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { 
          status: 413,
          headers: getSecurityHeaders(),
        }
      );
    }

    // Parse and validate body
    let body;
    try {
      const bodyText = await request.text();
      
      // Double-check actual body size since Content-Length header can be spoofed
      if (bodyText.length > MAX_REQUEST_SIZE) {
        return NextResponse.json(
          { success: false, error: 'Request too large' },
          { 
            status: 413,
            headers: getSecurityHeaders(),
          }
        );
      }
      
      body = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON' },
        { 
          status: 400,
          headers: getSecurityHeaders(),
        }
      );
    }

    // Validate data structure and types using Zod schema
    const validatedData = contactFormSchema.parse(body);

    // Sanitize all inputs to prevent XSS attacks
    const sanitizedData = {
      name: sanitizeString(validatedData.name),
      email: sanitizeEmail(validatedData.email),
      phone: validatedData.phone ? sanitizePhone(validatedData.phone) : undefined,
      message: sanitizeString(validatedData.message),
    };

    // Redundant length checks after sanitization provide defense in depth
    if (sanitizedData.name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name too long' },
        { 
          status: 400,
          headers: getSecurityHeaders(),
        }
      );
    }
    if (sanitizedData.email.length > 254) {
      return NextResponse.json(
        { success: false, error: 'Email too long' },
        { 
          status: 400,
          headers: getSecurityHeaders(),
        }
      );
    }
    if (sanitizedData.message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Message too long' },
        { 
          status: 400,
          headers: getSecurityHeaders(),
        }
      );
    }

    // Data is validated and sanitized - ready for processing
    // Integration points: email service, database, webhook, or file storage
    
    // Log submission details only in development for debugging
    if (process.env.NODE_ENV === 'development') {
      logError('contact form submission', {
        name: sanitizedData.name,
        email: sanitizedData.email,
        messageLength: sanitizedData.message.length,
      });
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will get back to you soon!' },
      { 
        status: 200,
        headers: {
          ...getSecurityHeaders(),
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    );
  } catch (error: unknown) {
    // Log error securely without exposing sensitive information
    logError('contact API', error);
    
    // Provide user-friendly validation error messages
    if (
      error &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'ZodError' &&
      'errors' in error
    ) {
      const zodError = error as { errors: Array<{ path: (string | number)[]; message: string }> };
      
      // Hide detailed validation errors in production to prevent information leakage
      const isProduction = process.env.NODE_ENV === 'production';
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          // Include detailed field errors only in development
          ...(isProduction ? {} : {
            details: zodError.errors.map((e) => ({
              field: e.path.join('.'),
              message: e.message,
            })),
          }),
        },
        { 
          status: 400,
          headers: getSecurityHeaders(),
        }
      );
    }

    // Return generic error to prevent information disclosure
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { 
        status: 500,
        headers: getSecurityHeaders(),
      }
    );
  }
}

// Only allow POST method
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        ...getSecurityHeaders(),
        'Allow': 'POST',
      },
    }
  );
}

// Handle all other HTTP methods
export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        ...getSecurityHeaders(),
        'Allow': 'POST',
      },
    }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        ...getSecurityHeaders(),
        'Allow': 'POST',
      },
    }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        ...getSecurityHeaders(),
        'Allow': 'POST',
      },
    }
  );
}

