import { cn } from '@/lib/utils/cn';
import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

/**
 * Reusable Textarea component with consistent styling
 */
export default function Textarea({ 
  label,
  error,
  required = false,
  className = '',
  id,
  rows = 5,
  ...props 
}: TextareaProps) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const baseStyles = 'w-full px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-[var(--text-on-cream)] bg-[var(--cream)] min-h-[120px] text-base resize-y';

  return (
    <div>
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-body-sm font-medium text-[var(--text-on-cream)] mb-2 sm:mb-2.5"
        >
          {label} {required && <span className="text-[var(--required-indicator)]">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(baseStyles, className)}
        aria-required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p 
          id={`${textareaId}-error`} 
          className="mt-1 text-body-sm text-[var(--error-text)]" 
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

