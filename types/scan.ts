export type ScanStatus = 'Completed' | 'Scheduled' | 'Failed' | 'Running';
export type ScanType = 'Greybox' | 'Blackbox';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface VulnerabilityCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface ScanEntry {
  id: string;
  name: string;
  type: ScanType;
  status: ScanStatus;
  progress: number;
  vulnerabilities: VulnerabilityCount;
  lastScan: string;
  target: string;
  startedAt: string;
  credentials: string;
  files: string;
  checklists: string;
}

export interface ConsoleLogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'code';
}

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  endpoint: string;
  description: string;
  timestamp: string;
}

export interface VerificationLoop {
  id: string;
  loopId: string;
  status: 'running' | 'completed' | 'failed';
  target: string;
  iterations: number;
  timestamp: string;
}

export interface ScanDetail {
  id: string;
  name: string;
  type: ScanType;
  status: ScanStatus;
  progress: number;
  currentStep: number;
  steps: string[];
  target: string;
  startedAt: string;
  credentials: string;
  files: string;
  checklists: string;
  consoleLogs: ConsoleLogEntry[];
  verificationLoops: VerificationLoop[];
  findings: Finding[];
  subAgents: number;
  parallelExecutions: number;
  operations: number;
  vulnerabilities: VulnerabilityCount;
}

export interface FilterState {
  statuses: ScanStatus[];
  types: ScanType[];
}
