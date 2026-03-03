'use client';

import React from 'react';
import { type Severity } from '@/lib/mock-data';
import { getSeverityColor, getSeverityBg } from '@/lib/utils';

interface SeverityBadgeProps {
  severity: Severity;
  count?: number;
  size?: 'sm' | 'md';
}

export function SeverityBadge({ severity, count, size = 'sm' }: SeverityBadgeProps) {
  const color = getSeverityColor(severity);
  const bg = getSeverityBg(severity);

  const sizeClass = size === 'sm'
    ? 'min-w-[22px] h-[22px] px-1.5 text-[11px]'
    : 'min-w-[26px] h-[26px] px-2 text-xs';

  return (
    <span
      className={`inline-flex items-center justify-center rounded font-semibold ${sizeClass}`}
      style={{ color, backgroundColor: bg }}
      title={`${count ?? 0} ${severity}`}
      aria-label={`${count ?? 0} ${severity} severity`}
    >
      {count ?? 0}
    </span>
  );
}

interface VulnBadgesProps {
  critical: number;
  high: number;
  medium: number;
  low: number;
  size?: 'sm' | 'md';
}

export function VulnBadges({ critical, high, medium, low, size = 'sm' }: VulnBadgesProps) {
  return (
    <div className="flex items-center gap-1">
      {critical > 0 && <SeverityBadge severity="Critical" count={critical} size={size} />}
      {high > 0 && <SeverityBadge severity="High" count={high} size={size} />}
      {medium > 0 && <SeverityBadge severity="Medium" count={medium} size={size} />}
      {low > 0 && <SeverityBadge severity="Low" count={low} size={size} />}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  className?: string;
}

export function Badge({ children, color, bg, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-hover)] ${className}`}
      style={color || bg ? { color: color ?? undefined, backgroundColor: bg ?? undefined } : undefined}
    >
      {children}
    </span>
  );
}
