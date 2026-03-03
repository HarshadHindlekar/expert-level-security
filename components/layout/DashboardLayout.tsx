'use client';

import React from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  topBarActions?: React.ReactNode;
}

export function DashboardLayout({ children, breadcrumbs, topBarActions }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar breadcrumbs={breadcrumbs} actions={topBarActions} />
        <main
          className="flex-1 overflow-hidden flex flex-col bg-[var(--bg-primary)]"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
