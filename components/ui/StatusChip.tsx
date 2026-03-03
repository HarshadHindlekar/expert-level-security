'use client';

import React from 'react';
import { getStatusColor, getStatusBg } from '@/lib/utils';
import { type StatusChipProps } from '@/types/ui';

export function StatusChip({ status, size = 'sm' }: StatusChipProps) {
  const color = getStatusColor(status);
  const bg = getStatusBg(status);

  const sizeClass = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClass}`}
      style={{ color, backgroundColor: bg }}
      aria-label={`Status: ${status}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current"
        aria-hidden="true"
      />
      {status}
    </span>
  );
}
