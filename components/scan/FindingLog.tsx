'use client';

import React from 'react';
import { SeverityBadge } from '@/components/ui/Badge';
import { type FindingCardProps, type FindingLogProps } from '@/types/components';

function FindingCard({ finding }: FindingCardProps) {
  return (
    <div
      className="p-4 rounded-[var(--radius-md)] flex flex-col gap-2 animate-fade-in bg-[var(--bg-card)] border border-[var(--border-color)]"
    >
      <div className="flex items-center justify-between gap-2">
        <SeverityBadge severity={finding.severity} size="md" />
        <span
          className="text-xs font-mono flex-shrink-0 text-[var(--text-muted)]"
        >
          {finding.timestamp}
        </span>
      </div>
      <h3
        className="text-sm font-semibold leading-snug text-[var(--text-primary)]"
      >
        {finding.title}
      </h3>
      <span
        className="text-xs font-mono font-medium text-[var(--accent)]"
      >
        {finding.endpoint}
      </span>
      <p
        className="text-xs leading-relaxed text-[var(--text-secondary)]"
      >
        {finding.description}
      </p>
    </div>
  );
}

export function FindingLog({ findings }: FindingLogProps) {
  return (
    <div
      className="flex flex-col flex-1 min-h-0 rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)]"
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex-shrink-0 border-b border-[var(--border-color)]"
      >
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">
          Finding Log
        </h2>
      </div>

      {/* Findings list */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 scrollbar-thin">
        {findings.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 gap-2"
            role="status"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[var(--text-muted)]"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p className="text-xs text-[var(--text-muted)]">
              No findings yet
            </p>
          </div>
        ) : (
          findings.map((finding) => (
            <FindingCard key={finding.id} finding={finding} />
          ))
        )}
      </div>
    </div>
  );
}
