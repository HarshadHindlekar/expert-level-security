'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { type ButtonProps } from '@/types/ui';
import { buttonBaseStyles, buttonVariantStyles, buttonSizeStyles } from '@/constants/button-styles';

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

  return (
    <button
      className={cn(buttonBaseStyles, buttonVariantStyles[variant], buttonSizeStyles[size], className)}
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
