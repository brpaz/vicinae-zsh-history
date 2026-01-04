export interface HistoryEntry {
  command: string;
  timestamp?: number;
  duration?: number;
}

export interface Preferences {
  historyFilePath: string;
}
