'use client';

import React from 'react';
import { SeverityBadge } from '@/components/ui/Badge';
import { type ScanStatusBarProps } from '@/types/components';
import { SubAgentIcon, ParallelIcon, OpsIcon } from '@/components/icons/ScanIcons';

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
