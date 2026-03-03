import { type ButtonVariant, type ButtonSize } from '@/types/ui';

export const buttonBaseStyles = `
  inline-flex items-center justify-center gap-1.5 font-medium
  rounded-[var(--radius-sm)] transition-all duration-150
  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
  focus-visible:ring-offset-1 cursor-pointer select-none
  disabled:opacity-50 disabled:cursor-not-allowed
`;

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--accent)] text-white
    hover:bg-[var(--accent-hover)] active:scale-[0.98]
    shadow-[0_2px_8px_rgba(12,200,168,0.3)]
  `,
  secondary: `
    bg-[var(--bg-card)] text-[var(--text-primary)]
    border border-[var(--border-color)]
    hover:bg-[var(--bg-hover)] active:scale-[0.98]
  `,
  ghost: `
    bg-transparent text-[var(--text-secondary)]
    hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]
    active:scale-[0.98]
  `,
  danger: `
    bg-transparent text-[var(--severity-critical)]
    border border-[var(--severity-critical)]
    hover:bg-[var(--severity-critical-bg)] active:scale-[0.98]
  `,
  outline: `
    bg-transparent text-[var(--text-primary)]
    border border-[var(--border-color)]
    hover:bg-[var(--bg-hover)] active:scale-[0.98]
  `,
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-sm',
};
