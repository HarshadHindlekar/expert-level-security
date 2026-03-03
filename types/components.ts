import React from 'react';
import { type ScanEntry, type Finding, type ConsoleLogEntry, type VerificationLoop, type ScanDetail, type FilterState } from './scan';

export type { FilterState } from './scan';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  topBarActions?: React.ReactNode;
}

export interface TopBarProps {
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface TopStatsCardProps {
  label: string;
  count: number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
  colorBg: string;
}

export interface DashboardMetaBarProps {
  org: string;
  owner: string;
  totalScans: number;
  scheduled: number;
  rescans: number;
  failedScans: number;
  lastUpdated: string;
}

export interface ScanTableProps {
  scans: ScanEntry[];
}

export interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

export interface FindingCardProps {
  finding: Finding;
}

export interface FindingLogProps {
  findings: Finding[];
}

export interface LiveConsoleProps {
  logs: ConsoleLogEntry[];
  verificationLoops: VerificationLoop[];
}

export interface ScanStatusBarProps {
  detail: ScanDetail;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface SocialButtonsProps {
  metaButtonClassName?: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}
