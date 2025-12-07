/**
 * Smooth scroll utility functions
 * Ensures consistent smooth scrolling behavior across the app
 */

/**
 * Smoothly scrolls to an element by ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (useful for fixed headers)
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

/**
 * Smoothly scrolls to the top of the page
 */
export function scrollToTop(): void {
  if (typeof window === 'undefined') return;
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

/**
 * Checks if a URL is an anchor link (starts with #)
 */
export function isAnchorLink(href: string): boolean {
  return href.startsWith('#');
}

/**
 * Extracts the anchor ID from a URL
 * @param href - The href string (e.g., '/contact#section' or '#section')
 */
export function getAnchorId(href: string): string | null {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return null;
  return href.substring(hashIndex + 1);
}

/**
 * Handles smooth scrolling for navigation
 * Works for both same-page anchors and cross-page navigation
 */
export function handleSmoothScroll(href: string, isSamePage: boolean = false): void {
  if (typeof window === 'undefined') return;
  
  // If it's an anchor link on the same page, scroll to the element
  if (isSamePage && isAnchorLink(href)) {
    const anchorId = getAnchorId(href);
    if (anchorId) {
      scrollToElement(anchorId, 80); // 80px offset for header
    }
    return;
  }
  
  // For cross-page navigation with anchor, wait for navigation then scroll
  if (!isSamePage) {
    const anchorId = getAnchorId(href);
    if (anchorId) {
      // Wait for Next.js navigation to complete, then scroll
      setTimeout(() => {
        scrollToElement(anchorId, 80);
      }, 100);
    } else {
      // Scroll to top smoothly for new pages
      scrollToTop();
    }
  }
}

