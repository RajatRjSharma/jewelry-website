import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

/**
 * Reusable Input component with consistent styling
 */
export default function Input({ 
  label,
  error,
  required = false,
  className = '',
  id,
  ...props 
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const baseStyles = 'w-full px-4 py-2 border border-[var(--border-light)] rounded-lg focus:outline-none focus:border-[var(--text-on-cream)] bg-[var(--cream)] min-h-[44px] text-base';

  return (
    <div>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-[var(--text-on-cream)] text-body-sm font-medium mb-2 sm:mb-2.5"
        >
          {label} {required && <span className="text-[var(--required-indicator)]">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(baseStyles, className)}
        aria-required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p 
          id={`${inputId}-error`} 
          className="mt-1 text-body-sm text-[var(--error-text)]" 
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

