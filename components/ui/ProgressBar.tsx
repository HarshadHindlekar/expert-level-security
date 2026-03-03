'use client';

import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  height?: number;
  color?: string;
  trackColor?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  height = 6,
  color = 'var(--accent)',
  trackColor = 'var(--border-color)',
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: `${height}px`, backgroundColor: trackColor }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(pct)}%`}
      >
        <div
          className="h-full rounded-full progress-bar-inner"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span
          className="text-xs font-medium tabular-nums flex-shrink-0"
          style={{ color: 'var(--text-secondary)', minWidth: '34px' }}
        >
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
