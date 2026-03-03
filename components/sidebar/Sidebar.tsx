'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types/components';
import { ChevronRightIcon, MenuIcon, CloseIcon } from '@/components/icons/NavigationIcons';
import { primaryNavItems, secondaryNavItems } from '@/constants/nav-items';

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
      {!mobileOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-[var(--radius-sm)] shadow-[var(--shadow-md)] transition-colors cursor-pointer bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)]"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          aria-expanded={false}
        >
          <MenuIcon />
        </button>
      )}

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

          {mobileOpen && (
            <button
              className="md:hidden ml-auto w-9 h-9 flex items-center justify-center rounded-[var(--radius-sm)] transition-colors cursor-pointer hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              aria-expanded={true}
            >
              <CloseIcon />
            </button>
          )}
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
