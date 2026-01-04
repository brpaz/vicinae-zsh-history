import {
  Action,
  ActionPanel,
  Clipboard,
  closeMainWindow,
  Form,
  showToast,
  Toast,
} from '@vicinae/api';
import { useState } from 'react';

interface EditCommandProps {
  command: string;
}

export default function Command(props: EditCommandProps) {
  const [command, setCommand] = useState(props.command);

  async function handlePaste() {
    try {
      await Clipboard.paste(command);
      await closeMainWindow();
    } catch (err) {
      await showToast({
        style: Toast.Style.Failure,
        title: 'Failed to Paste',
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  async function handleCopy() {
    try {
      await Clipboard.copy(command);
      await showToast({
        style: Toast.Style.Success,
        title: 'Copied to Clipboard',
      });
      await closeMainWindow();
    } catch (err) {
      await showToast({
        style: Toast.Style.Failure,
        title: 'Failed to Copy',
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  return (
    <Form
      navigationTitle="Edit Command"
      actions={
        <ActionPanel>
          <Action
            title="Paste Command"
            onAction={handlePaste}
            shortcut={{ modifiers: ['cmd'], key: 'enter' }}
          />
          <Action
            title="Copy to Clipboard"
            onAction={handleCopy}
            shortcut={{ modifiers: ['cmd'], key: 'c' }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="command"
        title="Command"
        value={command}
        onChange={setCommand}
      />
    </Form>
  );
}
