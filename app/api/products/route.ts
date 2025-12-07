import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data/products';
import { getSecurityHeaders } from '@/lib/security/api-headers';
import { logError } from '@/lib/security/error-handler';
import { sanitizeString } from '@/lib/security/sanitize';

// Valid category values to prevent injection
const VALID_CATEGORIES = ['rings', 'earrings', 'necklaces', 'bracelets'];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Sanitize and validate category parameter
    const categoryParam = searchParams.get('category');
    const category = categoryParam && VALID_CATEGORIES.includes(sanitizeString(categoryParam))
      ? sanitizeString(categoryParam)
      : undefined;
    
    // Validate boolean parameters
    const featured = searchParams.get('featured') === 'true';
    const mostLoved = searchParams.get('mostLoved') === 'true';

    let products = await getProducts(category);

    if (featured) {
      products = products.filter(p => p.featured === true);
    }

    if (mostLoved) {
      products = products.filter(p => p.mostLoved === true);
    }

    return NextResponse.json({ products }, {
      headers: {
        ...getSecurityHeaders(),
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    logError('products API', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { 
        status: 500,
        headers: getSecurityHeaders(),
      }
    );
  }
}

