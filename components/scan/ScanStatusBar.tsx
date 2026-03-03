'use client';

import React from 'react';
import { type ScanDetail } from '@/lib/mock-data';
import { SeverityBadge } from '@/components/ui/Badge';

interface ScanStatusBarProps {
  detail: ScanDetail;
}

const SubAgentIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);

const ParallelIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="10" x2="3" y2="10" />
    <line x1="21" y1="6" x2="3" y2="6" />
    <line x1="21" y1="14" x2="3" y2="14" />
    <line x1="17" y1="18" x2="3" y2="18" />
  </svg>
);

const OpsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export function ScanStatusBar({ detail }: ScanStatusBarProps) {
  const items = [
    { label: 'Sub-Agents', value: detail.subAgents, icon: <SubAgentIcon /> },
    { label: 'Parallel Executions', value: detail.parallelExecutions, icon: <ParallelIcon /> },
    { label: 'Operations', value: detail.operations, icon: <OpsIcon /> },
  ];

  const severities = [
    { label: 'Critical', key: 'critical' as const },
    { label: 'High', key: 'high' as const },
    { label: 'Medium', key: 'medium' as const },
    { label: 'Low', key: 'low' as const },
  ];

  return (
    <div
      className="flex items-center px-5 py-2.5 gap-5 flex-wrap flex-shrink-0 bg-[var(--bg-card)] border-t border-[var(--border-color)]"
      role="status"
      aria-label="Scan status"
    >
      {/* Left: execution stats */}
      <div className="flex items-center gap-5">
        {items.map((item, i) => (
          <React.Fragment key={item.label}>
            <div className="flex items-center gap-1.5">
              <span className="flex-shrink-0 text-[var(--accent)]" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {item.label}:
              </span>
              <span className="text-xs font-semibold tabular-nums text-[var(--text-primary)]">
                {item.value}
              </span>
            </div>
            {i < items.length - 1 && (
              <span className="w-px h-3 flex-shrink-0 bg-[var(--border-color)]" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Divider */}
      <div
        className="w-px h-4 flex-shrink-0 bg-[var(--border-color)]"
        aria-hidden="true"
      />

      {/* Right: severity counts */}
      <div className="flex items-center gap-4 ml-auto">
        {severities.map((s) => {
          const count = detail.vulnerabilities[s.key];
          return (
            <div key={s.key} className="flex items-center gap-1.5">
              <SeverityBadge severity={s.label as 'Critical' | 'High' | 'Medium' | 'Low'} count={count} size="sm" />
              <span className="text-xs hidden sm:inline text-[var(--text-muted)]">
                {s.label}: <span className="font-semibold text-[var(--text-primary)]">{count}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
