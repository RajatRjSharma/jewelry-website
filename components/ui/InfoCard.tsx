import { ReactNode } from 'react';
import SectionHeading from './SectionHeading';
import Card from './Card';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Reusable Info Card component for contact information, business hours, etc.
 */
export default function InfoCard({ 
  title,
  children,
  className = '',
}: InfoCardProps) {
  return (
    <Card className={className}>
      <SectionHeading as="h3" size="xs" align="left" className="mb-3 sm:mb-4 text-[var(--text-on-cream)]">
        {title}
      </SectionHeading>
      {children}
    </Card>
  );
}

