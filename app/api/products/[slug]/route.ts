import { NextResponse } from 'next/server';
import { getProduct } from '@/lib/data/products';
import { getSecurityHeaders } from '@/lib/security/api-headers';
import { logError } from '@/lib/security/error-handler';
import { sanitizeString } from '@/lib/security/sanitize';

/**
 * Validate slug format (alphanumeric, hyphens, underscores only)
 */
function isValidSlug(slug: string): boolean {
  return /^[a-z0-9_-]+$/i.test(slug) && slug.length <= 100;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Validate and sanitize slug parameter
    if (!slug || !isValidSlug(slug)) {
      return NextResponse.json(
        { error: 'Invalid product identifier' },
        { 
          status: 400,
          headers: getSecurityHeaders(),
        }
      );
    }
    
    const sanitizedSlug = sanitizeString(slug);
    const product = await getProduct(sanitizedSlug);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { 
          status: 404,
          headers: getSecurityHeaders(),
        }
      );
    }

    return NextResponse.json({ product }, {
      headers: {
        ...getSecurityHeaders(),
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    logError('products/[slug] API', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { 
        status: 500,
        headers: getSecurityHeaders(),
      }
    );
  }
}

