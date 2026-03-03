'use client';

import React from 'react';
import { type CircularProgressProps } from '@/types/ui';

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${value}% ${sublabel ?? ''}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--border-color)"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="var(--accent)"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {label && (
          <span
            className="font-semibold leading-tight tabular-nums"
            style={{ fontSize: size * 0.18, color: 'var(--text-primary)' }}
          >
            {label}
          </span>
        )}
        {sublabel && (
          <span
            className="font-medium leading-tight"
            style={{ fontSize: size * 0.1, color: 'var(--text-muted)' }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
