import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/data/site-settings';
import { getSecurityHeaders } from '@/lib/security/api-headers';
import { logError } from '@/lib/security/error-handler';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings }, {
      headers: {
        ...getSecurityHeaders(),
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    logError('site-settings API', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { 
        status: 500,
        headers: getSecurityHeaders(),
      }
    );
  }
}

