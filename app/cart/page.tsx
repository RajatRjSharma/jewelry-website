import { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageContainer from '@/components/ui/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { generateStandardMetadata } from '@/lib/seo/metadata';
import { getBaseUrl } from '@/lib/utils/env';

export const metadata: Metadata = generateStandardMetadata({
  title: 'Shopping Cart',
  description: 'View and manage your shopping cart. Add beautiful jewelry pieces to your cart and proceed to checkout.',
  url: `${getBaseUrl()}/cart`,
});

export default function CartPage() {
  return (
    <PageContainer maxWidth="4xl">
      <ScrollReveal>
        <h1 className="sr-only">Shopping Cart - View and manage your jewelry cart</h1>
        <SectionHeading as="h2">SHOPPING CART</SectionHeading>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Card className="text-center">
          <div className="space-y-6 sm:space-y-8 py-8 sm:py-12">
            <div className="space-y-4">
              <div className="text-6xl sm:text-7xl mb-4" aria-hidden="true">
                🛒
              </div>
              <h2 className="text-[var(--text-on-cream)] text-2xl sm:text-3xl font-bold font-playfair mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-[var(--text-secondary)] text-body-lg mb-2" role="status" aria-live="polite">
                Start adding beautiful jewelry pieces to your cart
              </p>
              <p className="text-[var(--text-muted)] text-body-base">
                Browse our collection of handcrafted rings, earrings, necklaces, and bracelets.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button href="/designs" className="min-h-[44px]" aria-label="Continue shopping to browse jewelry collection">
                BROWSE COLLECTION →
              </Button>
              <Button 
                href="/" 
                variant="outline" 
                className="min-h-[44px]"
                aria-label="Return to home page"
              >
                RETURN HOME
              </Button>
            </div>
          </div>
        </Card>
      </ScrollReveal>
    </PageContainer>
  );
}

