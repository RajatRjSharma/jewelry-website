'use client';

import Image from 'next/image';

interface HeroImage3DProps {
  heroImage?: string;
  heroImageAlt?: string;
  isMobile?: boolean;
}

/**
 * Simple hero image component without any effects
 */
export default function HeroImage3D({ heroImage, heroImageAlt, isMobile = false }: HeroImage3DProps) {
  const imageUrl = heroImage || '/hero-image.png';
  
  const imageAlt = heroImageAlt || 'Elegant mannequin hand displaying two gold rings - one with rectangular gemstone, one with round brilliant-cut stone';

  const heightClass = isMobile 
    ? 'h-[300px] sm:h-[400px]' 
    : 'h-[400px] lg:h-[500px] xl:h-[600px]';

  return (
    <div
      className={`relative ${heightClass} w-full bg-[var(--beige)] overflow-hidden`}
      style={{ 
        borderRadius: '8px 8px 0 0', 
        marginBottom: 0, 
        paddingBottom: 0,
      }}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-contain"
        priority
        sizes={isMobile ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        style={{ objectPosition: 'center bottom', borderRadius: '8px 8px 0 0', bottom: 0 }}
      />
    </div>
  );
}
