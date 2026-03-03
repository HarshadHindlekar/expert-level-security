'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TopStatsCard, DashboardMetaBar } from '@/components/dashboard/TopStatsCard';
import { ScanTable } from '@/components/dashboard/ScanTable';
import { FilterModal } from '@/components/dashboard/FilterModal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { mockScans, dashboardStats, type ScanEntry, type ScanStatus, type ScanType } from '@/lib/mock-data';
import { generateScanId } from '@/lib/utils';
import { type FilterState } from '@/types/scan';
import {
  CriticalIcon, HighIcon, MediumIcon, LowIcon,
  FilterIcon, ColumnIcon, PlusIcon, SearchIcon,
  ExportIcon, StopIcon,
} from '@/components/icons/DashboardIcons';

function DashboardContent() {
  const [scans, setScans] = useState<ScanEntry[]>(mockScans);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>({ statuses: [], types: [] });
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const { showToast } = useToast();

  const filteredScans = useMemo(() => {
    return scans.filter((scan) => {
      const matchesSearch =
        search.trim() === '' ||
        scan.name.toLowerCase().includes(search.toLowerCase()) ||
        scan.type.toLowerCase().includes(search.toLowerCase()) ||
        scan.target.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(scan.status);

      const matchesType =
        filters.types.length === 0 || filters.types.includes(scan.type);

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [scans, search, filters]);

  const activeFiltersCount = filters.statuses.length + filters.types.length;

  function handleNewScan() {
    const newScan: ScanEntry = {
      id: generateScanId(),
      name: 'New Scan',
      type: 'Greybox',
      status: 'Running',
      progress: 0,
      vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
      lastScan: 'Just now',
      target: 'target.example.com',
      startedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      credentials: '0 Active',
      files: 'None',
      checklists: '0/350',
    };
    setScans((prev) => [newScan, ...prev]);
    showToast('New scan created successfully', 'success');
  }

  function handleExport() {
    showToast('Generating report... Download will start shortly.', 'info');
  }

  const topBarActions = (
    <>
      <Button variant="outline" size="sm" icon={<ExportIcon />} onClick={handleExport}>
        Export Report
      </Button>
      <Button variant="danger" size="sm" icon={<StopIcon />}>
        Stop Scan
      </Button>
    </>
  );

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: 'Private Assets', href: '/dashboard' },
        { label: 'New Scan' },
      ]}
      topBarActions={topBarActions}
    >
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-[var(--bg-card)]">
        {/* Meta bar */}
        <DashboardMetaBar
          org={dashboardStats.org}
          owner={dashboardStats.owner}
          totalScans={dashboardStats.totalScans}
          scheduled={dashboardStats.scheduled}
          rescans={dashboardStats.rescans}
          failedScans={dashboardStats.failedScans}
          lastUpdated={dashboardStats.lastUpdated}
        />

        {/* Severity stats */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          <TopStatsCard
            label="Critical Severity"
            count={dashboardStats.critical.count}
            change={dashboardStats.critical.change}
            trend={dashboardStats.critical.trend as 'up' | 'down'}
            icon={<CriticalIcon />}
            color="var(--severity-critical)"
            colorBg="var(--severity-critical-bg)"
          />
          <TopStatsCard
            label="High Severity"
            count={dashboardStats.high.count}
            change={dashboardStats.high.change}
            trend={dashboardStats.high.trend as 'up' | 'down'}
            icon={<HighIcon />}
            color="var(--severity-high)"
            colorBg="var(--severity-high-bg)"
          />
          <TopStatsCard
            label="Medium Severity"
            count={dashboardStats.medium.count}
            change={dashboardStats.medium.change}
            trend={dashboardStats.medium.trend as 'up' | 'down'}
            icon={<MediumIcon />}
            color="var(--severity-medium)"
            colorBg="var(--severity-medium-bg)"
          />
          <TopStatsCard
            label="Low Severity"
            count={dashboardStats.low.count}
            change={dashboardStats.low.change}
            trend={dashboardStats.low.trend as 'up' | 'down'}
            icon={<LowIcon />}
            color="var(--severity-low)"
            colorBg="var(--severity-low-bg)"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-6 py-3 border-b border-[var(--border-color)]">
          {/* Search */}
          <div className="flex-1 min-w-0 sm:max-w-sm relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]"
              aria-hidden="true"
            >
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Search scans by name or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-sm rounded-[var(--radius-sm)] transition-all duration-150 focus:outline-none bg-[var(--bg-input)] text-[var(--text-primary)] border border-[var(--border-color)]"
              aria-label="Search scans"
            />
          </div>

          <div className="flex items-center gap-2 sm:ml-auto flex-shrink-0 overflow-x-auto no-scrollbar">
            {/* Filter button */}
            <button
              onClick={() => setFilterModalOpen(true)}
              className={
                activeFiltersCount > 0
                  ? 'h-8 px-3 flex items-center gap-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--bg-hover)] cursor-pointer text-[var(--accent)] border border-[var(--accent)] bg-[var(--accent-light)]'
                  : 'h-8 px-3 flex items-center gap-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--bg-hover)] cursor-pointer text-[var(--text-secondary)] border border-[var(--border-color)] bg-transparent'
              }
              aria-label={`Filter scans${activeFiltersCount > 0 ? `, ${activeFiltersCount} active` : ''}`}
            >
              <FilterIcon />
              <span>Filter</span>
              {activeFiltersCount > 0 && (
                <span
                  className="min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center bg-[var(--accent)] text-white"
                >
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Column button */}
            <button
              className="h-8 px-3 flex items-center gap-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--bg-hover)] cursor-pointer text-[var(--text-secondary)] border border-[var(--border-color)] bg-transparent"
              aria-label="Column settings"
            >
              <ColumnIcon />
              <span>Column</span>
            </button>

            {/* New scan */}
            <Button
              variant="primary"
              size="sm"
              icon={<PlusIcon />}
              onClick={handleNewScan}
            >
              New scan
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-card)]">
          <ScanTable scans={filteredScans} />
        </div>
      </div>

      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
