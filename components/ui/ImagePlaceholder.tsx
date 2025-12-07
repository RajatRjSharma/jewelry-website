import { cn } from '@/lib/utils/cn';

interface ImagePlaceholderProps {
  text?: string;
  className?: string;
  bgColor?: string;
}

/**
 * Reusable Image Placeholder component
 */
export default function ImagePlaceholder({ 
  text = 'No image', 
  className = '',
  bgColor = 'var(--cream)'
}: ImagePlaceholderProps) {
  return (
    <div 
      className={cn('w-full h-full flex items-center justify-center', className)}
      style={{ backgroundColor: bgColor }}
    >
      <p className="text-[var(--text-on-beige)] text-body-sm opacity-50">{text}</p>
    </div>
  );
}


