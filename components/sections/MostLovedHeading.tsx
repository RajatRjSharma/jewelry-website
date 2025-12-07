import ScrollReveal from '@/components/ui/ScrollReveal';
import { getSiteSettings } from '@/lib/data/site-settings';

export default async function MostLovedHeading() {
  const settings = await getSiteSettings();
  
  return (
    <ScrollReveal>
      <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        <h2 className="font-section-heading text-center">
          {settings.mostLoved.title || 'OUR MOST LOVED CREATIONS'}
        </h2>
      </div>
    </ScrollReveal>
  );
}

