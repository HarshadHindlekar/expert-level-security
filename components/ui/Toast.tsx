'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { type ToastType, type ToastItem, type ToastContextValue } from '@/types/ui';
import { toastIcons } from '@/components/icons/ToastIcons';

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

function ToastItem({ item, onRemove }: { item: ToastItem; onRemove: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(item.id), item.duration ?? 4000);
    return () => clearTimeout(t);
  }, [item.id, item.duration, onRemove]);

  const borderLeftClasses: Record<ToastType, string> = {
    success: 'border-l-[var(--severity-low)]',
    error: 'border-l-[var(--severity-critical)]',
    info: 'border-l-[var(--accent)]',
    warning: 'border-l-[var(--severity-medium)]',
  };

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] animate-toast-in min-w-[280px] max-w-sm bg-[var(--bg-card)] border border-[var(--border-color)] border-l-[3px] ${borderLeftClasses[item.type]}`}
      role="alert"
      aria-live="polite"
    >
      <span className="flex-shrink-0 mt-0.5">{toastIcons[item.type]}</span>
      <p className="text-sm flex-1 text-[var(--text-primary)]">
        {item.message}
      </p>
      <button
        onClick={() => onRemove(item.id)}
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded transition-colors hover:bg-[var(--bg-hover)] cursor-pointer text-[var(--text-muted)]"
        aria-label="Dismiss notification"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration?: number) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
