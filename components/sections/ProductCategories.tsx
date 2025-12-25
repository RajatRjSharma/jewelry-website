import { getSiteSettings } from '@/lib/data/site-settings';
import { getCategoryImages } from '@/lib/data/products';
import { CATEGORIES } from '@/lib/constants';
import CategoryLink from '@/components/ui/CategoryLink';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CategoryImage3D from './CategoryImage3D';
import { getCategoryImageSource, CategoryType } from '@/lib/utils/image-helpers';

interface CategoryImageSectionProps {
  category: CategoryType;
  imageUrl?: string;
  index?: number;
}

function CategoryImageSection({ category, imageUrl, index = 0 }: CategoryImageSectionProps) {
  const imageSource = getCategoryImageSource(category, imageUrl);
  
  return (
    <CategoryImage3D 
      category={category} 
      imageSource={imageSource}
      index={index}
    />
  );
}

export default async function ProductCategories() {
  const settings = await getSiteSettings();
  const categoryImages = await getCategoryImages();

  // Left column: RINGS, NECKLACES
  const leftCategories = [CATEGORIES[0], CATEGORIES[2]]; // RINGS, NECKLACES
  // Right column: EARRINGS, BRACELETS
  const rightCategories = [CATEGORIES[1], CATEGORIES[3]]; // EARRINGS, BRACELETS

  return (
    <section id="products-section">
      {/* Heading Section - Light Background */}
      <div className="bg-[var(--cream)] section-padding">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="font-section-heading text-center">
              {settings.products.title || 'OUR PRODUCTS'}
            </h2>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Content Area - Beige Background */}
      <div className="bg-[var(--beige)] section-padding">
        <div className="section-container">
            {/* Mobile: Single Column Stacked */}
            <div className="flex flex-col md:hidden standard-gap-small">
              {CATEGORIES.map((category, index) => (
                <ScrollReveal key={category.slug} delay={0.1 + index * 0.1}>
                  <div className="w-full">
                    <CategoryLink
                      name={category.name}
                      href={category.href}
                      variant="products"
                      index={index}
                      total={CATEGORIES.length}
                    />
                    <CategoryImageSection 
                      category={category} 
                      imageUrl={categoryImages[category.slug]}
                      index={index}
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Tablet & Desktop: 2-Column Grid */}
            <div className="hidden md:grid md:grid-cols-2 standard-gap container-content max-w-6xl">
              {/* Left Column */}
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col justify-between min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[700px]">
                  {leftCategories.map((category, index) => (
                    <ScrollReveal key={category.slug} delay={0.2 + index * 0.1}>
                      <div className="w-full">
                        <CategoryLink
                          name={category.name}
                          href={category.href}
                          variant="products"
                          index={index * 2}
                          total={leftCategories.length * 2}
                        />
                        {index === 0 && (
                          <CategoryImageSection 
                            category={category} 
                            imageUrl={categoryImages[category.slug]}
                            index={index * 2}
                          />
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                  <ScrollReveal delay={0.4}>
                    <CategoryImageSection 
                      category={leftCategories[1]} 
                      imageUrl={categoryImages[leftCategories[1].slug]}
                      index={1}
                    />
                  </ScrollReveal>
                </div>
              </ScrollReveal>

              {/* Right Column */}
              <ScrollReveal delay={0.3}>
                <div className="flex flex-col justify-between min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[700px]">
                  {rightCategories.map((category, index) => (
                    <ScrollReveal key={category.slug} delay={0.3 + index * 0.1}>
                      <div className="w-full">
                        <CategoryLink
                          name={category.name}
                          href={category.href}
                          variant="products"
                          index={index * 2}
                          total={rightCategories.length * 2}
                        />
                        {index === 0 && (
                          <CategoryImageSection 
                            category={category} 
                            imageUrl={categoryImages[category.slug]}
                            index={index * 2 + 2}
                          />
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                  <ScrollReveal delay={0.5}>
                    <CategoryImageSection 
                      category={rightCategories[1]} 
                      imageUrl={categoryImages[rightCategories[1].slug]}
                      index={3}
                    />
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            </div>
        </div>
      </div>
    </section>
  );
}
