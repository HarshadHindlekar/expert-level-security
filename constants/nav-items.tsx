import React from 'react';
import { type NavItem } from '@/types/components';
import {
  DashboardIcon,
  ProjectsIcon,
  ScansIcon,
  ScheduleIcon,
  NotificationsIcon,
  SettingsIcon,
  SupportIcon,
} from '@/components/icons/NavigationIcons';

export const primaryNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Projects', href: '/projects', icon: <ProjectsIcon /> },
  { label: 'Scans', href: '/scan', icon: <ScansIcon /> },
  { label: 'Schedule', href: '/schedule', icon: <ScheduleIcon /> },
];

export const secondaryNavItems: NavItem[] = [
  { label: 'Notifications', href: '/notifications', icon: <NotificationsIcon /> },
  { label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
  { label: 'Support', href: '/support', icon: <SupportIcon /> },
];
