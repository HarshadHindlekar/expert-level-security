import React from 'react';
import { type ToastType } from '@/types/ui';

export const toastIcons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="var(--severity-low)" fillOpacity="0.2" />
      <path d="M5 8l2 2 4-4" stroke="var(--severity-low)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="var(--severity-critical)" fillOpacity="0.2" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="var(--severity-critical)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="var(--accent)" fillOpacity="0.2" />
      <path d="M8 7v4M8 5.5v.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="var(--severity-medium)" fillOpacity="0.2" />
      <path d="M8 5v4M8 10.5v.5" stroke="var(--severity-medium)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};
