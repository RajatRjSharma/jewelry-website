import SmoothLink from './SmoothLink';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * SEO-friendly breadcrumb navigation component
 * Includes structured data for better search engine understanding
 */
export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav 
      className={`mb-6 sm:mb-8 text-xs sm:text-sm ${className}`} 
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li
              key={item.href}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center"
            >
              {isLast ? (
                <span 
                  className="text-[var(--text-on-cream)] font-medium"
                  itemProp="name"
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <SmoothLink
                    href={item.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-on-cream)] transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </SmoothLink>
                  <span className="mx-2 text-[var(--text-muted)]" aria-hidden="true">/</span>
                </>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

