'use client';

import React from 'react';
import { type StepTrackerProps } from '@/types/ui';
import { stepIcons } from '@/components/icons/StepIcons';

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
                className={
                  isActive
                    ? 'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 bg-[var(--accent)] text-white border-2 border-[var(--accent)] shadow-[0_0_12px_rgba(12,200,168,0.4)]'
                    : isCompleted
                      ? 'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 bg-[var(--accent-light)] text-[var(--accent)] border-2 border-[var(--accent)]'
                      : 'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 bg-[var(--bg-hover)] text-[var(--text-muted)] border-2 border-[var(--border-color)]'
                }
                aria-label={`${step}: ${isActive ? 'active' : isCompleted ? 'completed' : 'pending'}`}
              >
                {stepIcons[step] ?? (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={
                  isActive
                    ? 'text-xs font-medium text-center leading-tight whitespace-nowrap text-[var(--accent)]'
                    : isCompleted
                      ? 'text-xs font-medium text-center leading-tight whitespace-nowrap text-[var(--text-secondary)]'
                      : 'text-xs font-medium text-center leading-tight whitespace-nowrap text-[var(--text-muted)]'
                }
              >
                {step}
              </span>
            </div>
            {!isLast && (
              <div
                className={
                  isCompleted
                    ? 'flex-1 h-[2px] mx-2 transition-all duration-500 bg-[var(--accent)] mt-[-20px]'
                    : 'flex-1 h-[2px] mx-2 transition-all duration-500 bg-[var(--border-color)] mt-[-20px]'
                }
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
