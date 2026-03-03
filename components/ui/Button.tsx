'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-1.5 font-medium
    rounded-[var(--radius-sm)] transition-all duration-150
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
    focus-visible:ring-offset-1 cursor-pointer select-none
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles: Record<ButtonVariant, string> = {
    primary: `
      bg-[var(--accent)] text-white
      hover:bg-[var(--accent-hover)] active:scale-[0.98]
      shadow-[0_2px_8px_rgba(12,200,168,0.3)]
    `,
    secondary: `
      bg-[var(--bg-card)] text-[var(--text-primary)]
      border border-[var(--border-color)]
      hover:bg-[var(--bg-hover)] active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-[var(--text-secondary)]
      hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]
      active:scale-[0.98]
    `,
    danger: `
      bg-transparent text-[var(--severity-critical)]
      border border-[var(--severity-critical)]
      hover:bg-[var(--severity-critical-bg)] active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-[var(--text-primary)]
      border border-[var(--border-color)]
      hover:bg-[var(--bg-hover)] active:scale-[0.98]
    `,
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
    lg: 'h-11 px-6 text-sm',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      ) : (
        iconPosition === 'left' && icon && <span aria-hidden="true">{icon}</span>
      )}
      {children}
      {!loading && iconPosition === 'right' && icon && (
        <span aria-hidden="true">{icon}</span>
      )}
    </button>
  );
}
