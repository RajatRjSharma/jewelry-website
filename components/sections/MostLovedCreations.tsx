import { getMostLovedProducts } from '@/lib/data/products';
import ProductCard from '@/components/ui/ProductCard';
import MostLovedHeading from './MostLovedHeading';
import { getRandomCategoryImages } from '@/lib/utils/image-helpers';

export default async function MostLovedCreations() {
  const products = await getMostLovedProducts(8);

  // Ensure we have exactly 8 items (2 rows x 4 columns)
  const displayProducts = products.slice(0, 8);
  
  // Get random category images for placeholders
  const placeholderImages = getRandomCategoryImages(8);

  return (
    <section id="most-loved-section" className="bg-[var(--cream)] section-padding">
      <div className="section-container">
        {/* Heading - Stacked vertically */}
        <MostLovedHeading />
        
        <div 
          className="responsive-grid-4 container-content"
          role="list"
          aria-label="Most loved jewelry creations"
        >
          {displayProducts.length === 0 ? (
            // Placeholder cards with 3D effects - each card handles its own animation
            placeholderImages.map((imageSrc, index) => (
              <div key={index} role="listitem">
                <ProductCard 
                  placeholderImage={imageSrc} 
                  index={index}
                />
              </div>
            ))
          ) : (
            displayProducts.map((product, index) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} index={index} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

