'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/theme-context';
import { Button } from '@/components/ui/Button';
import { type TopBarProps } from '@/types/components';
import { SunIcon, MoonIcon, HomeIcon } from '@/components/icons/NavigationIcons';

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
