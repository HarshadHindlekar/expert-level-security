'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StatusChip } from '@/components/ui/StatusChip';
import { VulnBadges } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useSelectedScanId } from '@/lib/hooks/useSelectedScan';
import { type ScanTableProps } from '@/types/components';

export function ScanTable({ scans }: ScanTableProps) {
  const router = useRouter();
  const { setSelectedScanId } = useSelectedScanId();

  function handleRowClick(id: string) {
    setSelectedScanId(id);
    router.push('/scan');
  }

  function handleRowKeyDown(e: React.KeyboardEvent, id: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick(id);
    }
  }

  if (scans.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-3"
        role="status"
        aria-label="No scans found"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--text-muted)]"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <p className="text-sm font-medium text-[var(--text-muted)]">
          No scans match your search
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px]" role="grid" aria-label="Scan list">
        <thead>
          <tr
            className="border-b border-[var(--border-color)] bg-[var(--bg-primary)]"
          >
            {['Scan Name', 'Type', 'Status', 'Progress', 'Vulnerability', 'Last Scan'].map((col, idx) => (
              <th
                key={col}
                className={
                  idx === 0
                    ? 'text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] w-[28%]'
                    : idx === 1
                      ? 'text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] w-[10%]'
                      : idx === 2
                        ? 'text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] w-[12%]'
                        : idx === 3
                          ? 'text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] w-[20%]'
                          : idx === 4
                            ? 'text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] w-[20%]'
                            : 'text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] w-[10%]'
                }
                scope="col"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scans.map((scan) => (
            <tr
              key={scan.id}
              onClick={() => handleRowClick(scan.id)}
              onKeyDown={(e) => handleRowKeyDown(e, scan.id)}
              tabIndex={0}
              role="row"
              aria-label={`${scan.name} - ${scan.status}`}
              className="group cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset bg-[var(--bg-table-row)] border-b border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]"
            >
              <td className="px-5 py-4">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {scan.name}
                </span>
              </td>
              <td className="px-5 py-4">
                <span className="text-sm text-[var(--text-secondary)]">
                  {scan.type}
                </span>
              </td>
              <td className="px-5 py-4">
                <StatusChip status={scan.status} />
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <ProgressBar
                    value={scan.progress}
                    showLabel
                    height={5}
                    color={
                      scan.status === 'Failed'
                        ? 'var(--severity-critical)'
                        : scan.status === 'Scheduled'
                        ? 'var(--text-muted)'
                        : 'var(--accent)'
                    }
                  />
                </div>
              </td>
              <td className="px-5 py-4">
                <VulnBadges
                  critical={scan.vulnerabilities.critical}
                  high={scan.vulnerabilities.high}
                  medium={scan.vulnerabilities.medium}
                  low={scan.vulnerabilities.low}
                />
              </td>
              <td className="px-5 py-4">
                <span className="text-sm text-[var(--text-muted)]">
                  {scan.lastScan}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="flex items-center justify-between px-5 py-3 border-t border-[var(--border-subtle)]"
      >
        <span className="text-xs text-[var(--text-muted)]">
          Showing {scans.length} of {scans.length} Scans
        </span>
        <div className="flex items-center gap-2">
          <button
            className="w-7 h-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--bg-hover)] cursor-pointer text-[var(--text-muted)] border border-[var(--border-color)]"
            aria-label="Previous page"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="w-7 h-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--bg-hover)] cursor-pointer text-[var(--text-muted)] border border-[var(--border-color)]"
            aria-label="Next page"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
