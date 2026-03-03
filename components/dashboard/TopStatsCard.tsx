'use client';

import React from 'react';

interface TopStatsCardProps {
  label: string;
  count: number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
  colorBg: string;
}

const TrendUpIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const TrendDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
  <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function TopStatsCard({ label, count, change, trend, icon, color, colorBg }: TopStatsCardProps) {
  return (
    <div
      className="flex flex-col gap-2 sm:gap-3 py-3 sm:py-5 px-4 sm:px-6 border-r border-b border-[var(--border-color)]"
    >
      {/* Top row: label + icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </span>
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: colorBg, color }}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      {/* Count */}
      <span
        className="text-3xl sm:text-4xl font-bold tabular-nums leading-none text-[var(--text-primary)]"
      >
        {count}
      </span>

      {/* Trend */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold"
          style={{
            color: trend === 'up' ? color : 'var(--severity-low)',
            backgroundColor: trend === 'up' ? colorBg : 'var(--severity-low-bg)',
          }}
        >
          {trend === 'up' ? <TrendUpIcon /> : <TrendDownIcon />}
          {change}
        </span>
        <span className="text-[11px] text-[var(--text-muted)]">
          vs yesterday
        </span>
      </div>
    </div>
  );
}

interface DashboardMetaBarProps {
  org: string;
  owner: string;
  totalScans: number;
  scheduled: number;
  rescans: number;
  failedScans: number;
  lastUpdated: string;
}

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export function DashboardMetaBar({ org, owner, totalScans, scheduled, rescans, failedScans, lastUpdated }: DashboardMetaBarProps) {
  const items = [
    { label: 'Org:', value: org },
    { label: 'Owner:', value: owner },
    { label: 'Total Scans:', value: String(totalScans) },
    { label: 'Scheduled:', value: String(scheduled) },
    { label: 'Rescans:', value: String(rescans) },
    { label: 'Failed Scans:', value: String(failedScans) },
  ];

  return (
    <div
      className="flex items-center overflow-x-auto no-scrollbar border-b border-[var(--border-color)] min-h-8 sm:min-h-10 px-3 sm:px-5 py-2"
    >
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && (
            <span
              className="w-px h-3 flex-shrink-0 mx-2 sm:mx-4 bg-[var(--border-color)]"
              aria-hidden="true"
            />
          )}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs whitespace-nowrap text-[var(--text-muted)]">{item.label}</span>
            <span className="text-xs font-semibold whitespace-nowrap text-[var(--text-primary)]">{item.value}</span>
          </div>
        </React.Fragment>
      ))}
      <div className="flex items-center gap-1.5 ml-auto pl-6 flex-shrink-0">
        <span className="text-[var(--accent)]" aria-hidden="true">
          <ClockIcon />
        </span>
        <span className="text-xs whitespace-nowrap text-[var(--text-muted)]">{lastUpdated}</span>
      </div>
    </div>
  );
}
