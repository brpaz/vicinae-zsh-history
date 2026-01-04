import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import type { HistoryEntry } from './types';

/**
 * Expands the tilde (~) in a file path to the user's home directory
 */
export function expandHomePath(path: string): string {
  if (path.startsWith('~/') || path === '~') {
    return path.replace('~', homedir());
  }
  return path;
}

/**
 * Parses ZSH history file content and returns array of history entries
 * Handles both extended format (: timestamp:duration;command) and simple format
 */
export function parseHistoryContent(content: string): HistoryEntry[] {
  const lines = content.split('\n').filter((line) => line.trim());
  const entries: HistoryEntry[] = [];

  for (const line of lines) {
    // Extended format: : 1704446400:0;command
    const match = line.match(/^: (\d+):(\d+);(.+)$/);
    if (match) {
      entries.push({
        timestamp: Number.parseInt(match[1], 10),
        duration: Number.parseInt(match[2], 10),
        command: match[3],
      });
    } else {
      // Simple format: just the command
      entries.push({ command: line });
    }
  }

  // Return in reverse order (most recent first) and limit to 1000 entries
  return entries.reverse().slice(0, 1000);
}

/**
 * Loads and parses ZSH history file
 */
export async function loadHistory(filePath: string): Promise<HistoryEntry[]> {
  const expandedPath = expandHomePath(filePath);
  const content = await readFile(expandedPath, 'utf-8');
  return parseHistoryContent(content);
}

/**
 * Formats a Unix timestamp to a human-readable string
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Less than 1 hour ago
  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }

  // Less than 24 hours ago
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  // Less than 7 days ago
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  // Otherwise show date
  return date.toLocaleDateString();
}
