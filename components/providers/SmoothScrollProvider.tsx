'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToElement } from '@/lib/utils/smooth-scroll';

/**
 * Provider component that handles smooth scrolling after navigation
 * Ensures smooth scroll behavior for anchor links and cross-page navigation
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Check if URL has an anchor hash
    const hash = window.location.hash;
    
    if (hash) {
      // Extract anchor ID (remove #)
      const anchorId = hash.substring(1);
      
      // Wait for page to render, then scroll smoothly
      setTimeout(() => {
        scrollToElement(anchorId, 80); // 80px offset for header
      }, 100);
    } else {
      // No anchor - scroll to top smoothly on page change
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname]);
  
  return <>{children}</>;
}

