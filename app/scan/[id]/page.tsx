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
import { mockScanDetail } from '@/lib/mock-data';

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
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  'Targets': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  'Started At': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  'Credentials': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  'Files': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  'Checklists': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
};

function ScanDetailContent() {
  const { showToast } = useToast();
  const [stopModalOpen, setStopModalOpen] = useState(false);
  const [stopped, setStopped] = useState(false);

  const detail = mockScanDetail;

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
        {/* Scan progress header */}
        <div
          className="px-6 py-5 flex-shrink-0"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div className="flex items-center gap-6 mb-5">
            {/* Circular progress */}
            <div className="flex-shrink-0">
              <CircularProgress
                value={detail.progress}
                size={100}
                strokeWidth={7}
                label={`${detail.progress}%`}
                sublabel="In Progress"
              />
            </div>

            {/* Step tracker */}
            <div className="flex-1 min-w-0">
              <StepTracker steps={detail.steps} currentStep={detail.currentStep} />
            </div>
          </div>

          {/* Metadata row */}
          <div
            className="flex items-center overflow-x-auto no-scrollbar"
            style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', gap: 0 }}
          >
            {metaItems.map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && (
                  <span
                    className="w-px flex-shrink-0 self-stretch"
                    style={{ backgroundColor: 'var(--border-color)', minHeight: '36px' }}
                    aria-hidden="true"
                  />
                )}
                <div className="flex flex-col gap-0.5 px-5 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: 'var(--text-muted)' }} aria-hidden="true">
                      {metaIcons[item.label]}
                    </span>
                    <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </span>
                  </div>
                  <span
                    className="text-sm font-semibold whitespace-nowrap"
                    style={{
                      color: item.label === 'Checklists' ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main split panel */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-4 p-4 overflow-hidden">
          {/* Left: Console */}
          <div className="flex flex-col flex-1 min-w-0 min-h-0" style={{ minHeight: '320px' }}>
            <LiveConsole
              logs={detail.consoleLogs}
              verificationLoops={detail.verificationLoops}
            />
          </div>

          {/* Right: Findings */}
          <div className="flex flex-col lg:w-[340px] w-full min-h-0 flex-shrink-0" style={{ minHeight: '240px' }}>
            <FindingLog findings={detail.findings} />
          </div>
        </div>

        {/* Status bar */}
        <ScanStatusBar detail={detail} />
      </div>

      {/* Stop scan confirmation modal */}
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
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: 'var(--severity-critical-bg)' }}
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
          <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
            Are you sure you want to stop the scan? This action cannot be undone. All partial results will be preserved.
          </p>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default function ScanDetailPage() {
  return <ScanDetailContent />;
}
