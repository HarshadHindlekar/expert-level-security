'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const ScansIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ScheduleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const NotificationsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SupportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const primaryNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Projects', href: '/projects', icon: <ProjectsIcon /> },
  { label: 'Scans', href: '/dashboard', icon: <ScansIcon /> },
  { label: 'Schedule', href: '/schedule', icon: <ScheduleIcon /> },
];

const secondaryNavItems: NavItem[] = [
  { label: 'Notifications', href: '/notifications', icon: <NotificationsIcon /> },
  { label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
  { label: 'Support', href: '/support', icon: <SupportIcon /> },
];

function NavLink({ item, isCollapsed }: { item: NavItem; isCollapsed: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
  const isScansActive = item.label === 'Scans' && (pathname === '/dashboard' || pathname.startsWith('/scan'));

  const active = isActive || isScansActive;

  return (
    <Link
      href={item.href}
      className={cn(
        'relative flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] transition-all duration-150 group',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        active
          ? 'font-semibold text-[var(--accent)] bg-[var(--accent-light)]'
          : 'font-normal text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
      )}
      aria-current={active ? 'page' : undefined}
      title={isCollapsed ? item.label : undefined}
    >
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r bg-[var(--accent)]"
          aria-hidden="true"
        />
      )}
      <span
        className={cn(
          'flex-shrink-0 transition-colors w-5 h-5 flex items-center justify-center',
          active ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
        )}
      >
        {item.icon}
      </span>
      {!isCollapsed && (
        <span className="text-sm leading-none truncate">{item.label}</span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-[var(--radius-sm)] shadow-[var(--shadow-md)] transition-colors cursor-pointer bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)]"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          'w-[240px] min-w-[240px] bg-[var(--bg-sidebar)] border-r border-[var(--border-color)]'
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 flex-shrink-0 h-14 border-b border-[var(--border-color)]"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[var(--accent)]"
            aria-hidden="true"
          >
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 4v4c0 2.8 2.1 5.4 5 6 2.9-.6 5-3.2 5-6V4L7 1z" fill="white" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-[var(--text-primary)]">APS Security</span>
            <span className="text-[10px] mt-0.5 text-[var(--text-muted)]">Pentest Platform</span>
          </div>
        </div>

        {/* Primary nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto no-scrollbar">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Main
          </p>
          <div className="flex flex-col gap-0.5 mb-5">
            {primaryNavItems.map((item) => (
              <NavLink key={item.label} item={item} isCollapsed={false} />
            ))}
          </div>

          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            System
          </p>
          <div className="flex flex-col gap-0.5">
            {secondaryNavItems.map((item) => (
              <NavLink key={item.label} item={item} isCollapsed={false} />
            ))}
          </div>
        </nav>

        {/* User profile */}
        <div
          className="flex-shrink-0 px-3 pb-3 border-t border-[var(--border-color)]"
        >
          <div
            className="flex items-center gap-3 px-3 py-3 mt-3 rounded-[var(--radius-md)] cursor-pointer transition-colors hover:bg-[var(--bg-hover)]"
            role="button"
            tabIndex={0}
            aria-label="User profile"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white bg-[linear-gradient(135deg,#4B6A8A_0%,#2D4A6A_100%)]"
              aria-hidden="true"
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate text-[var(--text-primary)]">
                admin@edu.com
              </p>
              <p className="text-[11px] truncate mt-0.5 text-[var(--text-muted)]">
                Security Lead
              </p>
            </div>
            <span className="text-[var(--text-muted)]" aria-hidden="true">
              <ChevronRightIcon />
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
