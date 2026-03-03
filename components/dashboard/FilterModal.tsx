'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { type ScanStatus, type ScanType } from '@/types/scan';
import { type FilterState, type FilterModalProps } from '@/types/components';
import { allStatuses, allTypes } from '@/constants/filters';

export function FilterModal({ open, onClose, filters, onApply }: FilterModalProps) {
  const [local, setLocal] = useState<FilterState>(filters);

  function toggleStatus(s: ScanStatus) {
    setLocal((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(s)
        ? prev.statuses.filter((x) => x !== s)
        : [...prev.statuses, s],
    }));
  }

  function toggleType(t: ScanType) {
    setLocal((prev) => ({
      ...prev,
      types: prev.types.includes(t)
        ? prev.types.filter((x) => x !== t)
        : [...prev.types, t],
    }));
  }

  function handleApply() {
    onApply(local);
    onClose();
  }

  function handleReset() {
    const reset: FilterState = { statuses: [], types: [] };
    setLocal(reset);
    onApply(reset);
    onClose();
  }

  const statusColors: Record<ScanStatus, string> = {
    Completed: 'var(--severity-low)',
    Scheduled: 'var(--text-muted)',
    Failed: 'var(--severity-critical)',
    Running: 'var(--accent)',
  };

  const statusDotClasses: Record<ScanStatus, string> = {
    Completed: 'bg-[var(--severity-low)]',
    Scheduled: 'bg-[var(--text-muted)]',
    Failed: 'bg-[var(--severity-critical)]',
    Running: 'bg-[var(--accent)]',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Filter Scans"
      size="sm"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Apply Filters
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-3 text-[var(--text-muted)]">
            Status
          </p>
          <div className="flex flex-col gap-2">
            {allStatuses.map((s) => (
              <label
                key={s}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={
                    local.statuses.includes(s)
                      ? 'relative w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all bg-[var(--accent)] border-[1.5px] border-[var(--accent)]'
                      : 'relative w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all bg-[var(--bg-input)] border-[1.5px] border-[var(--border-color)]'
                  }
                  onClick={() => toggleStatus(s)}
                >
                  {local.statuses.includes(s) && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={local.statuses.includes(s)}
                  onChange={() => toggleStatus(s)}
                  aria-label={s}
                />
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${statusDotClasses[s]}`}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-[var(--text-primary)]">
                    {s}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div
          className="h-px bg-[var(--border-subtle)]"
          aria-hidden="true"
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-3 text-[var(--text-muted)]">
            Scan Type
          </p>
          <div className="flex flex-col gap-2">
            {allTypes.map((t) => (
              <label
                key={t}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div
                  className={
                    local.types.includes(t)
                      ? 'relative w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all bg-[var(--accent)] border-[1.5px] border-[var(--accent)]'
                      : 'relative w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all bg-[var(--bg-input)] border-[1.5px] border-[var(--border-color)]'
                  }
                  onClick={() => toggleType(t)}
                >
                  {local.types.includes(t) && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={local.types.includes(t)}
                  onChange={() => toggleType(t)}
                  aria-label={t}
                />
                <span className="text-sm text-[var(--text-primary)]">
                  {t}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
