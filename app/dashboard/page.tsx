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

interface FilterState {
  statuses: ScanStatus[];
  types: ScanType[];
}

const CriticalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const HighIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const MediumIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ColumnIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ExportIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const StopIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
);

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
