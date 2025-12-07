import { NextResponse } from 'next/server';
import { getPageContent } from '@/lib/data/content';
import { getSecurityHeaders } from '@/lib/security/api-headers';
import { logError } from '@/lib/security/error-handler';
import { sanitizeString } from '@/lib/security/sanitize';

/**
 * Validate page identifier format
 */
function isValidPageIdentifier(page: string): boolean {
  // Allow alphanumeric, hyphens, underscores, and common page names
  return /^[a-z0-9_-]+$/i.test(page) && page.length <= 50;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    
    // Validate and sanitize page parameter
    if (!page || !isValidPageIdentifier(page)) {
      return NextResponse.json(
        { error: 'Invalid page identifier' },
        { 
          status: 400,
          headers: getSecurityHeaders(),
        }
      );
    }
    
    const sanitizedPage = sanitizeString(page);
    const content = await getPageContent(sanitizedPage);

    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { 
          status: 404,
          headers: getSecurityHeaders(),
        }
      );
    }

    return NextResponse.json({ content }, {
      headers: {
        ...getSecurityHeaders(),
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    logError('content/[page] API', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { 
        status: 500,
        headers: getSecurityHeaders(),
      }
    );
  }
}

