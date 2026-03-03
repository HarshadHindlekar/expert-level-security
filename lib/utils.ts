import { type ScanStatus, type Severity } from './mock-data';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatRelativeTime(dateStr: string): string {
  return dateStr;
}

export function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case 'Critical':
      return 'var(--severity-critical)';
    case 'High':
      return 'var(--severity-high)';
    case 'Medium':
      return 'var(--severity-medium)';
    case 'Low':
      return 'var(--severity-low)';
  }
}

export function getSeverityBg(severity: Severity): string {
  switch (severity) {
    case 'Critical':
      return 'var(--severity-critical-bg)';
    case 'High':
      return 'var(--severity-high-bg)';
    case 'Medium':
      return 'var(--severity-medium-bg)';
    case 'Low':
      return 'var(--severity-low-bg)';
  }
}

export function getStatusColor(status: ScanStatus): string {
  switch (status) {
    case 'Completed':
      return 'var(--status-completed)';
    case 'Scheduled':
      return 'var(--status-scheduled)';
    case 'Failed':
      return 'var(--status-failed)';
    case 'Running':
      return 'var(--accent)';
  }
}

export function getStatusBg(status: ScanStatus): string {
  switch (status) {
    case 'Completed':
      return 'var(--status-completed-bg)';
    case 'Scheduled':
      return 'var(--status-scheduled-bg)';
    case 'Failed':
      return 'var(--status-failed-bg)';
    case 'Running':
      return 'var(--accent-light)';
  }
}

export function generateScanId(): string {
  return `scan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
