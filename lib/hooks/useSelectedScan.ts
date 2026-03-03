'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { mockScans, mockScanDetail, type ScanDetail, type ScanEntry } from '@/lib/mock-data';

const STORAGE_KEY = 'aps:selected_scan_id';

export function useSelectedScanId() {
  const [selectedScanId, setSelectedScanIdState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setSelectedScanIdState(stored);
    } catch {
      setSelectedScanIdState(null);
    }
  }, []);

  const setSelectedScanId = useCallback((id: string) => {
    setSelectedScanIdState(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
  }, []);

  const clearSelectedScanId = useCallback(() => {
    setSelectedScanIdState(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { selectedScanId, setSelectedScanId, clearSelectedScanId };
}

function buildDetailFromEntry(entry: ScanEntry): ScanDetail {
  return {
    ...mockScanDetail,
    id: entry.id,
    name: entry.name,
    type: entry.type,
    status: entry.status,
    progress: entry.progress,
    target: entry.target,
    startedAt: entry.startedAt,
    credentials: entry.credentials,
    files: entry.files,
    checklists: entry.checklists,
    vulnerabilities: entry.vulnerabilities,
  };
}

export function useSelectedScanDetail() {
  const { selectedScanId } = useSelectedScanId();

  const detail = useMemo(() => {
    const id = selectedScanId;
    if (!id) return mockScanDetail;

    const entry = mockScans.find((s) => s.id === id);
    if (!entry) return mockScanDetail;

    return buildDetailFromEntry(entry);
  }, [selectedScanId]);

  return { detail, selectedScanId };
}
