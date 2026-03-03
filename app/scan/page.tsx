'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { StepTracker } from '@/components/ui/StepTracker';
import { LiveConsole } from '@/components/scan/LiveConsole';
import { FindingLog } from '@/components/scan/FindingLog';
import { ScanStatusBar } from '@/components/scan/ScanStatusBar';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { useSelectedScanDetail } from '@/lib/hooks/useSelectedScan';

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

const metaIcons: Record<string, React.ReactNode> = {
  'Scan Type': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Targets: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  'Started At': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Credentials: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Files: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Checklists: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
};

function ScanDetailContent() {
  const { showToast } = useToast();
  const [stopModalOpen, setStopModalOpen] = useState(false);
  const [stopped, setStopped] = useState(false);

  const { detail } = useSelectedScanDetail();

  const metaItems = [
    { label: 'Scan Type', value: detail.type === 'Greybox' ? 'Grey Box' : 'Black Box' },
    { label: 'Targets', value: detail.target },
    { label: 'Started At', value: detail.startedAt },
    { label: 'Credentials', value: detail.credentials },
    { label: 'Files', value: detail.files },
    { label: 'Checklists', value: detail.checklists },
  ];

  function handleExport() {
    showToast('Generating PDF report... Your download will start shortly.', 'success');
  }

  function handleStopConfirm() {
    setStopped(true);
    setStopModalOpen(false);
    showToast('Scan stopped successfully.', 'info');
  }

  const topBarActions = (
    <>
      <Button variant="outline" size="sm" icon={<ExportIcon />} onClick={handleExport}>
        Export Report
      </Button>
      <Button
        variant="danger"
        size="sm"
        icon={<StopIcon />}
        onClick={() => setStopModalOpen(true)}
        disabled={stopped}
      >
        {stopped ? 'Stopped' : 'Stop Scan'}
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
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-5 flex-shrink-0 bg-[var(--bg-card)] border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3 sm:gap-6 mb-2 sm:mb-5">
            <div className="flex-shrink-0 sm:hidden">
              <CircularProgress
                value={detail.progress}
                size={64}
                strokeWidth={6}
                label={`${detail.progress}%`}
              />
            </div>
            <div className="flex-shrink-0 hidden sm:block">
              <CircularProgress
                value={detail.progress}
                size={80}
                strokeWidth={6}
                label={`${detail.progress}%`}
                sublabel="In Progress"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="sm:hidden flex items-center justify-between gap-2 min-w-0">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-[rgba(12,200,168,0.12)] text-[var(--accent)] truncate">
                  {detail.steps[detail.currentStep] ?? '—'}
                </span>
                <span className="text-[11px] text-[var(--text-muted)] flex-shrink-0">
                  Step {detail.currentStep + 1}/{detail.steps.length}
                </span>
              </div>
              <div className="hidden sm:block overflow-x-auto no-scrollbar">
                <div className="min-w-[520px]">
                  <StepTracker steps={detail.steps} currentStep={detail.currentStep} />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center overflow-x-auto no-scrollbar border-t border-[var(--border-subtle)] pt-3.5 gap-0">
            {metaItems.map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && (
                  <span
                    className="w-px flex-shrink-0 self-stretch bg-[var(--border-color)] min-h-[36px]"
                    aria-hidden="true"
                  />
                )}
                <div className="flex flex-col gap-0.5 px-3 sm:px-5 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--text-muted)]" aria-hidden="true">
                      {metaIcons[item.label]}
                    </span>
                    <span className="text-xs whitespace-nowrap text-[var(--text-muted)]">{item.label}</span>
                  </div>
                  <span
                    className={
                      item.label === 'Checklists'
                        ? 'text-sm font-semibold whitespace-nowrap text-[var(--accent)]'
                        : 'text-sm font-semibold whitespace-nowrap text-[var(--text-primary)]'
                    }
                  >
                    {item.value}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-3 sm:gap-4 p-3 sm:p-4 overflow-y-auto">
          <div className="flex flex-col flex-1 min-w-0 min-h-0 min-h-[200px] sm:min-h-[320px]">
            <LiveConsole logs={detail.consoleLogs} verificationLoops={detail.verificationLoops} />
          </div>

          <div className="flex flex-col lg:w-[340px] w-full min-h-0 flex-shrink-0 min-h-[160px] sm:min-h-[240px]">
            <FindingLog findings={detail.findings} />
          </div>
        </div>

        <ScanStatusBar detail={detail} />
      </div>

      <Modal
        open={stopModalOpen}
        onClose={() => setStopModalOpen(false)}
        title="Stop Scan"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setStopModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleStopConfirm}>
              Stop Scan
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-[var(--severity-critical-bg)]"
            aria-hidden="true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--severity-critical)"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <p className="text-sm text-center text-[var(--text-secondary)]">
            Are you sure you want to stop the scan? This action cannot be undone. All partial results will be preserved.
          </p>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default function ScanPage() {
  return <ScanDetailContent />;
}
