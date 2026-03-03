'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/theme-context';
import { Button } from '@/components/ui/Button';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopBarProps {
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const HomeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export function TopBar({ breadcrumbs = [], actions }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pl-14 pr-4 md:px-5 flex-shrink-0 py-2 bg-[var(--bg-sidebar)] border-b border-[var(--border-color)]"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center justify-end sm:justify-start gap-1.5 text-sm min-w-0 overflow-x-auto no-scrollbar w-full sm:w-auto" aria-label="Breadcrumb">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 transition-colors hover:text-[var(--text-primary)] text-[var(--text-secondary)]"
          aria-label="Scan home"
        >
          <HomeIcon />
          <span>Scan</span>
        </Link>
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            <span className="text-[var(--text-muted)]" aria-hidden="true">/</span>
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="transition-colors hover:text-[var(--text-primary)] text-[var(--text-secondary)]"
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                className="font-medium text-[var(--text-primary)]"
                aria-current="page"
              >
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0 w-full sm:w-auto overflow-x-auto no-scrollbar">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center transition-all duration-150 hover:bg-[var(--bg-hover)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] text-[var(--text-secondary)]"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className="flex items-center justify-end gap-1.5 md:gap-2 flex-wrap sm:flex-nowrap min-w-0">
          {actions}
        </div>
      </div>
    </header>
  );
}
