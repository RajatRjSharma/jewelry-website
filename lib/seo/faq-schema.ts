/**
 * Generate FAQPage structured data (JSON-LD)
 */

import { sanitizeForJsonLd } from '@/lib/utils/json-ld-sanitize';

export interface FAQ {
  question: string;
  answer: string;
}

export function generateFAQPageSchema(faqs: FAQ[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: sanitizeForJsonLd(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: sanitizeForJsonLd(faq.answer),
      },
    })),
    url, // URL is already validated by Next.js routing
  };
}

