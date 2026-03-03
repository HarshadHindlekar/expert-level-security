'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { type InputProps, type PasswordInputProps } from '@/types/ui';

export function Input({
  label,
  error,
  icon,
  iconPosition = 'left',
  onIconClick,
  variant = 'default',
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  const isLight = variant === 'light';

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'text-xs font-medium',
            isLight ? 'text-[#374151]' : 'text-[var(--text-secondary)]'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && iconPosition === 'left' && (
          <span
            className={cn(
              'absolute left-3 flex items-center justify-center pointer-events-none',
              isLight ? 'text-[#9CA3AF]' : 'text-[var(--text-muted)]'
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full h-11 rounded-[var(--radius-sm)] text-sm transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-[rgba(12,200,168,0.2)]',
            isLight ? 'bg-[#F9FAFB] text-[#111827]' : 'bg-[var(--bg-input)] text-[var(--text-primary)]',
            error
              ? isLight
                ? 'border border-[#EF4444]'
                : 'border border-[var(--severity-critical)]'
              : isLight
                ? 'border border-[#D1D5DB]'
                : 'border border-[var(--border-color)]',
            icon && iconPosition === 'left' ? 'pl-10 pr-4' : '',
            icon && iconPosition === 'right' ? 'pl-4 pr-10' : '',
            !icon ? 'px-4' : '',
            className
          )}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <button
            type="button"
            onClick={onIconClick}
            className={cn(
              'absolute right-3 flex items-center justify-center transition-colors cursor-pointer',
              isLight ? 'text-[#9CA3AF]' : 'text-[var(--text-muted)]'
            )}
            tabIndex={-1}
            aria-label="Toggle visibility"
          >
            {icon}
          </button>
        )}
      </div>
      {error && (
        <p className={cn('text-xs', isLight ? 'text-[#EF4444]' : 'text-[var(--severity-critical)]')}>
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {visible ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );

  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      icon={<EyeIcon />}
      iconPosition="right"
      onIconClick={() => setVisible((v) => !v)}
    />
  );
}
