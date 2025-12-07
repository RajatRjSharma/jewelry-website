'use client';

import Card from './Card';

/**
 * Care instructions component for jewelry
 * E-commerce best practice: Provide care information
 */
export default function CareInstructions() {
  return (
    <Card padding="sm" className="standard-mt-small">
      <h3 className="text-[var(--text-on-cream)] text-body-lg sm:text-heading-sm font-bold font-playfair mb-3 sm:mb-4">
        Care Instructions
      </h3>
      <ul className="standard-space-y-small text-[var(--text-secondary)] text-body-sm sm:text-body-base list-disc list-inside">
        <li>Store jewelry in a soft pouch or jewelry box when not in use</li>
        <li>Clean gently with a soft, lint-free cloth</li>
        <li>Avoid exposing to harsh chemicals, perfumes, or lotions</li>
        <li>Remove jewelry before swimming or showering</li>
        <li>Have jewelry professionally cleaned and inspected annually</li>
      </ul>
      <p className="mt-4 sm:mt-5 text-[var(--text-muted)] text-body-xs sm:text-body-sm">
        For detailed care instructions, please refer to the care card included with your purchase.
      </p>
    </Card>
  );
}

