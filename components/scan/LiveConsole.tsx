'use client';

import React, { useState, useRef, useEffect } from 'react';
import { type ConsoleLogEntry, type VerificationLoop } from '@/lib/mock-data';

interface LiveConsoleProps {
  logs: ConsoleLogEntry[];
  verificationLoops: VerificationLoop[];
}

type ConsoleTab = 'activity' | 'verification';

function highlightLog(message: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const urlRegex = /\b(https?:\/\/[^\s"']+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s"']*)?)/g;
  const pathRegex = /\/[a-zA-Z0-9/_?=&%-]+/g;
  const keywordRegex = /\b(IDOR|TODO|vulnerability|injection|bypass|admin|password|token|SQL|XSS|error|WARNING|critical|CRITICAL|HIGH|MEDIUM|LOW)\b/gi;
  const codeBlockRegex = /`([^`]+)`/g;

  type MatchInfo = {
    start: number;
    end: number;
    content: string;
    type: 'url' | 'path' | 'keyword' | 'code';
  };

  const matches: MatchInfo[] = [];

  let m: RegExpExecArray | null;
  urlRegex.lastIndex = 0;
  while ((m = urlRegex.exec(message)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, content: m[0], type: 'url' });
  }

  pathRegex.lastIndex = 0;
  while ((m = pathRegex.exec(message)) !== null) {
    const overlaps = matches.some(
      (existing) => m!.index < existing.end && m!.index + m![0].length > existing.start
    );
    if (!overlaps) {
      matches.push({ start: m.index, end: m.index + m[0].length, content: m[0], type: 'path' });
    }
  }

  keywordRegex.lastIndex = 0;
  while ((m = keywordRegex.exec(message)) !== null) {
    const overlaps = matches.some(
      (existing) => m!.index < existing.end && m!.index + m![0].length > existing.start
    );
    if (!overlaps) {
      matches.push({ start: m.index, end: m.index + m[0].length, content: m[0], type: 'keyword' });
    }
  }

  codeBlockRegex.lastIndex = 0;
  while ((m = codeBlockRegex.exec(message)) !== null) {
    const overlaps = matches.some(
      (existing) => m!.index < existing.end && m!.index + m![0].length > existing.start
    );
    if (!overlaps) {
      matches.push({ start: m.index, end: m.index + m[0].length, content: m[1], type: 'code' });
    }
  }

  matches.sort((a, b) => a.start - b.start);

  let cursor = 0;
  matches.forEach((match, i) => {
    if (match.start > cursor) {
      parts.push(message.slice(cursor, match.start));
    }
    switch (match.type) {
      case 'url':
        parts.push(
          <span key={i} style={{ color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer' }}>
            {match.content}
          </span>
        );
        break;
      case 'path':
        parts.push(
          <span key={i} className="px-1 rounded text-xs" style={{ backgroundColor: 'rgba(12,200,168,0.15)', color: 'var(--accent)', fontFamily: 'monospace' }}>
            {match.content}
          </span>
        );
        break;
      case 'keyword':
        parts.push(
          <span key={i} style={{ color: '#F97316', fontWeight: 600 }}>
            {match.content}
          </span>
        );
        break;
      case 'code':
        parts.push(
          <span key={i} className="px-1 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#E5C07B', fontFamily: 'monospace', fontSize: '0.85em' }}>
            {match.content}
          </span>
        );
        break;
    }
    cursor = match.end;
  });

  if (cursor < message.length) {
    parts.push(message.slice(cursor));
  }

  return parts.length > 0 ? parts : [message];
}

function ActivityLog({ logs }: { logs: ConsoleLogEntry[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-3 scrollbar-thin"
      style={{ backgroundColor: '#111', color: '#d4d4d4' }}
      role="log"
      aria-live="polite"
      aria-label="Activity log"
    >
      {logs.map((log, index) => (
        <div
          key={index}
          className="console-log-line flex gap-3"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <span
            className="flex-shrink-0 font-semibold"
            style={{ color: '#6B7280', minWidth: '70px' }}
          >
            [{log.timestamp}]
          </span>
          <span className="flex-1 break-all whitespace-pre-wrap leading-relaxed">
            {log.type === 'code' ? (
              <span style={{ color: '#9CA3AF' }}>{highlightLog(log.message)}</span>
            ) : log.type === 'error' ? (
              <span style={{ color: '#F87171' }}>{highlightLog(log.message)}</span>
            ) : log.type === 'warning' ? (
              <span style={{ color: '#FBBF24' }}>{highlightLog(log.message)}</span>
            ) : log.type === 'success' ? (
              <span style={{ color: '#6EE7B7' }}>{highlightLog(log.message)}</span>
            ) : (
              highlightLog(log.message)
            )}
          </span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function VerificationLoops({ loops }: { loops: VerificationLoop[] }) {
  const statusColors: Record<VerificationLoop['status'], string> = {
    running: 'var(--accent)',
    completed: 'var(--severity-low)',
    failed: 'var(--severity-critical)',
  };

  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-2"
      style={{ backgroundColor: '#111' }}
      role="list"
      aria-label="Verification loops"
    >
      {loops.map((loop) => (
        <div
          key={loop.id}
          className="flex items-center justify-between p-3 rounded-lg font-mono text-xs"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
          role="listitem"
        >
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: statusColors[loop.status] }}
              aria-hidden="true"
            />
            <div>
              <span style={{ color: '#9CA3AF' }}>{loop.loopId}</span>
              <span className="mx-2" style={{ color: '#4B5563' }}>→</span>
              <span style={{ color: 'var(--accent)' }}>{loop.target}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ color: '#6B7280' }}>
              {loop.iterations} iteration{loop.iterations !== 1 ? 's' : ''}
            </span>
            <span style={{ color: '#4B5563' }}>{loop.timestamp}</span>
            <span
              className="capitalize font-semibold"
              style={{ color: statusColors[loop.status] }}
            >
              {loop.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LiveConsole({ logs, verificationLoops }: LiveConsoleProps) {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('activity');

  return (
    <div
      className="flex flex-col flex-1 min-h-0 rounded-[var(--radius-md)] overflow-hidden"
      style={{
        border: '1px solid var(--border-color)',
        backgroundColor: '#111',
      }}
    >
      {/* Console header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
        style={{ borderBottom: '1px solid #1f1f1f', backgroundColor: '#161616' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: 'var(--accent)' }}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold" style={{ color: '#f0f0f0' }}>
            Live Scan Console
          </span>
          <span
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ml-1"
            style={{ backgroundColor: 'rgba(12,200,168,0.15)', color: 'var(--accent)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--accent)' }}
              aria-hidden="true"
            />
            Running...
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer"
            style={{ color: '#6B7280' }}
            aria-label="Minimize console"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button
            className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer"
            style={{ color: '#6B7280' }}
            aria-label="Close console"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex px-4 gap-4 flex-shrink-0"
        style={{ borderBottom: '1px solid #1f1f1f', backgroundColor: '#161616' }}
        role="tablist"
      >
        {[
          { id: 'activity' as ConsoleTab, label: 'Activity Log' },
          { id: 'verification' as ConsoleTab, label: 'Verification Loops' },
        ].map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer -mb-px"
            style={{
              borderBottomColor: activeTab === tab.id ? 'var(--accent)' : 'transparent',
              color: activeTab === tab.id ? 'var(--accent)' : '#6B7280',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {activeTab === 'activity' ? (
          <ActivityLog logs={logs} />
        ) : (
          <VerificationLoops loops={verificationLoops} />
        )}
      </div>
    </div>
  );
}
