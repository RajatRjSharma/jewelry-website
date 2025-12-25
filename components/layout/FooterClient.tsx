'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { ReactNode } from 'react';

interface FooterSectionProps {
  children: ReactNode;
  delay?: number;
}

export function FooterSection({ children, delay = 0 }: FooterSectionProps) {
  return (
    <ScrollReveal delay={delay} direction="up">
      {children}
    </ScrollReveal>
  );
}

