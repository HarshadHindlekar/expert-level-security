'use client';

import React from 'react';

interface StepTrackerProps {
  steps: string[];
  currentStep: number;
}

const stepIcons: Record<string, React.ReactNode> = {
  Spidering: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  ),
  Mapping: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  ),
  Testing: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4m-6 0h6" />
    </svg>
  ),
  Validating: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Reporting: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

export function StepTracker({ steps, currentStep }: StepTrackerProps) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                style={{
                  backgroundColor: isActive
                    ? 'var(--accent)'
                    : isCompleted
                    ? 'var(--accent-light)'
                    : 'var(--bg-hover)',
                  color: isActive
                    ? '#fff'
                    : isCompleted
                    ? 'var(--accent)'
                    : 'var(--text-muted)',
                  border: isActive
                    ? '2px solid var(--accent)'
                    : isCompleted
                    ? '2px solid var(--accent)'
                    : '2px solid var(--border-color)',
                  boxShadow: isActive ? '0 0 12px rgba(12,200,168,0.4)' : 'none',
                }}
                aria-label={`${step}: ${isActive ? 'active' : isCompleted ? 'completed' : 'pending'}`}
              >
                {stepIcons[step] ?? (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className="text-xs font-medium text-center leading-tight"
                style={{
                  color: isActive
                    ? 'var(--accent)'
                    : isCompleted
                    ? 'var(--text-secondary)'
                    : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {step}
              </span>
            </div>
            {!isLast && (
              <div
                className="flex-1 h-[2px] mx-2 transition-all duration-500"
                style={{
                  backgroundColor: isCompleted ? 'var(--accent)' : 'var(--border-color)',
                  marginTop: '-20px',
                  flexShrink: 1,
                }}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
