import {
  Action,
  ActionPanel,
  getPreferenceValues,
  List,
  showToast,
  Toast,
} from '@vicinae/api';
import { useEffect, useState } from 'react';
import EditCommand from './edit-command';
import { formatTimestamp, loadHistory } from './history';
import type { HistoryEntry, Preferences } from './types';

export default function Command() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistoryFile() {
      try {
        setIsLoading(true);
        setError(null);
        const preferences = getPreferenceValues<Preferences>();
        const entries = await loadHistory(preferences.historyFilePath);
        setHistory(entries);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load history file';
        setError(errorMessage);
        await showToast({
          style: Toast.Style.Failure,
          title: 'Error Loading History',
          message: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadHistoryFile();
  }, []);

  if (error && !isLoading) {
    return (
      <List>
        <List.EmptyView
          title="Error Loading History"
          description={error}
          icon={{ source: '⚠️' }}
        />
      </List>
    );
  }

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search history..."
      navigationTitle="ZSH History"
    >
      {history.length === 0 && !isLoading ? (
        <List.EmptyView
          title="No History Found"
          description="Your history file appears to be empty"
          icon={{ source: '📝' }}
        />
      ) : (
        history.map((entry, index) => (
          <List.Item
            key={`${entry.timestamp}-${index}`}
            title={entry.command}
            accessories={
              entry.timestamp
                ? [{ text: formatTimestamp(entry.timestamp) }]
                : undefined
            }
            actions={
              <ActionPanel>
                <Action.Paste title="Paste Command" content={entry.command} />
                <Action.Push
                  title="Edit Command"
                  target={<EditCommand command={entry.command} />}
                  shortcut={{ modifiers: ['ctrl'], key: 'e' }}
                />
                <Action.CopyToClipboard
                  title="Copy to Clipboard"
                  content={entry.command}
                  shortcut={{ modifiers: ['ctrl'], key: 'c' }}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
