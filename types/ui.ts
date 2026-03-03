import React from 'react';
import { type Severity, type ScanStatus } from './scan';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onIconClick?: () => void;
  variant?: 'default' | 'light';
}

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'icon' | 'iconPosition' | 'onIconClick'> {}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  footer?: React.ReactNode;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  height?: number;
  color?: string;
  trackColor?: string;
  className?: string;
}

export interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  style?: React.CSSProperties;
}

export interface StepTrackerProps {
  steps: string[];
  currentStep: number;
}

export interface SeverityBadgeProps {
  severity: Severity;
  count?: number;
  size?: 'sm' | 'md';
}

export interface VulnBadgesProps {
  critical: number;
  high: number;
  medium: number;
  low: number;
  size?: 'sm' | 'md';
}

export interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  className?: string;
}

export interface StatusChipProps {
  status: ScanStatus;
  size?: 'sm' | 'md';
}

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}
