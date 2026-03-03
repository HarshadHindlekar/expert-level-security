'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  style?: React.CSSProperties;
}

export function Skeleton({ className, width, height, rounded = 'md', style }: SkeletonProps) {
  const roundedMap = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn('animate-pulse', roundedMap[rounded], className)}
      style={{
        width,
        height,
        backgroundColor: 'var(--bg-hover)',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export function ScanTableSkeleton() {
  return (
    <div className="w-full" aria-label="Loading scans..." aria-busy="true">
      {/* Header */}
      <div
        className="flex items-center gap-4 px-5 py-3"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        {['35%', '12%', '15%', '18%', '12%', '8%'].map((w, i) => (
          <Skeleton key={i} height={12} rounded="sm" style={{ width: w } as React.CSSProperties} />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-5 py-4"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <Skeleton height={14} rounded="sm" style={{ width: '35%' } as React.CSSProperties} />
          <Skeleton height={14} rounded="sm" style={{ width: '12%' } as React.CSSProperties} />
          <Skeleton height={22} rounded="full" style={{ width: '15%' } as React.CSSProperties} />
          <Skeleton height={6} rounded="full" style={{ width: '18%' } as React.CSSProperties} />
          <div className="flex gap-1" style={{ width: '12%' }}>
            {[1, 2, 3, 4].map((j) => (
              <Skeleton key={j} width={22} height={22} rounded="sm" />
            ))}
          </div>
          <Skeleton height={12} rounded="sm" style={{ width: '8%' } as React.CSSProperties} />
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="flex-1 py-4 px-5" style={{ borderRight: '1px solid var(--border-color)' }}>
      <div className="flex items-start justify-between mb-3">
        <Skeleton width={120} height={12} rounded="sm" />
        <Skeleton width={32} height={32} rounded="md" />
      </div>
      <Skeleton width={60} height={32} rounded="sm" className="mb-2" />
      <Skeleton width={160} height={10} rounded="sm" />
    </div>
  );
}
