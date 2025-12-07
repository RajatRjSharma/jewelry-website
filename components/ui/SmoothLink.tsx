'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, MouseEvent, ComponentPropsWithoutRef } from 'react';
import { isAnchorLink, getAnchorId } from '@/lib/utils/smooth-scroll';

interface SmoothLinkProps extends Omit<LinkProps, 'href'>, Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  href: string;
  children: ReactNode;
  scroll?: boolean;
}

/**
 * Enhanced Link component with smooth scrolling
 * - Handles smooth scrolling for anchor links
 * - Smoothly scrolls to top on cross-page navigation
 * - Consistent smooth scroll behavior across the app
 */
export default function SmoothLink({
  href,
  children,
  scroll = true,
  onClick,
  ...props
}: SmoothLinkProps) {
  const pathname = usePathname();
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
    
    // Handle smooth scrolling
    if (scroll) {
      const isSamePage = pathname === href || (isAnchorLink(href) && pathname === '/');
      
      if (isSamePage && isAnchorLink(href)) {
        // Same page anchor link - prevent default and scroll smoothly
        e.preventDefault();
        const anchorId = getAnchorId(href);
        if (anchorId) {
          const element = document.getElementById(anchorId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
      // For cross-page navigation, SmoothScrollProvider will handle smooth scroll
    }
  };
  
  return (
    <Link
      href={href}
      onClick={handleClick}
      scroll={scroll}
      {...props}
    >
      {children}
    </Link>
  );
}

