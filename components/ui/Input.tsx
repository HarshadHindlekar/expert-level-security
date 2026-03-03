'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onIconClick?: () => void;
  variant?: 'default' | 'light';
}

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
          className="text-xs font-medium"
          style={{ color: isLight ? '#374151' : 'var(--text-secondary)' }}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && iconPosition === 'left' && (
          <span
            className="absolute left-3 flex items-center justify-center pointer-events-none"
            style={{ color: isLight ? '#9CA3AF' : 'var(--text-muted)' }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full h-11 rounded-[var(--radius-sm)] text-sm transition-all duration-150',
            'focus:outline-none focus:ring-2',
            icon && iconPosition === 'left' ? 'pl-10 pr-4' : '',
            icon && iconPosition === 'right' ? 'pl-4 pr-10' : '',
            !icon ? 'px-4' : '',
            className
          )}
          style={{
            backgroundColor: isLight ? '#F9FAFB' : 'var(--bg-input)',
            color: isLight ? '#111827' : 'var(--text-primary)',
            border: `1px solid ${error ? (isLight ? '#EF4444' : 'var(--severity-critical)') : (isLight ? '#D1D5DB' : 'var(--border-color)')}`,
            // @ts-expect-error css custom property
            '--tw-ring-color': 'rgba(12,200,168,0.2)',
          }}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute right-3 flex items-center justify-center transition-colors cursor-pointer"
            style={{ color: isLight ? '#9CA3AF' : 'var(--text-muted)' }}
            tabIndex={-1}
            aria-label="Toggle visibility"
          >
            {icon}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs" style={{ color: isLight ? '#EF4444' : 'var(--severity-critical)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

interface PasswordInputProps extends Omit<InputProps, 'type' | 'icon' | 'iconPosition' | 'onIconClick'> {}

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
