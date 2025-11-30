import { Metadata } from 'next';
import { urlFor } from '@/lib/cms/client';
import { getBrandName } from '@/lib/utils/text-formatting';
import { getBaseUrl } from '@/lib/utils/env';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const baseUrl = getBaseUrl();
const siteName = getBrandName();

/**
 * Optimize meta description length (150-160 characters for best SEO)
 * Truncates to 155 characters and adds ellipsis if needed
 */
function optimizeDescription(description: string): string {
  const maxLength = 155; // Optimal length for search results
  if (description.length <= maxLength) {
    return description;
  }
  // Truncate at word boundary
  const truncated = description.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 
    ? truncated.slice(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Generate standard metadata with OpenGraph and Twitter cards
 */
export function generateStandardMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const optimizedDescription = optimizeDescription(description);
  const imageUrl = image || `${baseUrl}/og-image.jpg`;
  const pageUrl = url || baseUrl;

  return {
    title: fullTitle,
    description: optimizedDescription,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: pageUrl,
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'manifest', url: '/site.webmanifest' },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title: fullTitle,
      description: optimizedDescription,
      url: pageUrl,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: optimizedDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate product metadata with structured data
 */
export function generateProductMetadata({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: SanityImageSource;
  url?: string;
}): Metadata {
  const imageUrl = image 
    ? urlFor(image).width(1200).height(1200).url()
    : `${baseUrl}/og-image.jpg`;

  return generateStandardMetadata({
    title,
    description,
    image: imageUrl,
    url,
    type: 'website', // OpenGraph doesn't support 'product', use 'website'
  });
}

