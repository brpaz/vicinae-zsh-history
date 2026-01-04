# ZSH History - Vicinae Extension

[![CI](https://github.com/brpaz/vicinae-zsh-history/actions/workflows/ci.yml/badge.svg)](https://github.com/brpaz/vicinae-zsh-history/actions/workflows/ci.yml)

Browse and paste commands from your ZSH history directly into any application.

## Features

- **Browse History**: View up to 1000 most recent commands from your ZSH history file
- **Quick Paste**: Press Enter to paste the selected command into the frontmost application
- **Edit Before Action**: Press Cmd+E to edit a command before pasting or copying
- **Copy to Clipboard**: Press Ctrl+C to copy the command to clipboard
- **Search**: Instantly search through your command history
- **Timestamps**: See when each command was last used
- **Configurable**: Set a custom path to your ZSH history file

## Installation

### From Source

1. Clone or download this extension to your local machine
2. Navigate to the extension directory:
   ```bash
   cd vicinae-zsh-history
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the extension:
   ```bash
   npm run build
   ```
5. The extension will be automatically installed to `~/.local/share/vicinae/extensions/zsh-history`
6. Restart Vicinae or reload extensions

## Usage

### Browse History

Open the command palette and search for "Browse ZSH History" to see your command history.

### Paste Command

Select a command and press Enter to paste it into the currently active application. The Vicinae window will automatically close after pasting.

### Edit Command

Select a command and press Cmd+E to open an edit form where you can modify the command before pasting or copying it. This is useful for:
- Adjusting file paths
- Changing command arguments
- Fixing typos in historical commands
- Customizing commands for the current context

In the edit form:
- Press Cmd+Enter to paste the edited command
- Press Cmd+C to copy the edited command to clipboard

### Copy to Clipboard

Select a command and press Ctrl+C to copy it to your clipboard without pasting.

### Search History

Use the search bar at the top to filter commands by text. The search is instant and works across all your history.

## Configuration

### History File Path

By default, the extension looks for your ZSH history at `~/.zsh_history`. If your history file is located elsewhere, you can configure the path in Vicinae preferences:

1. Open Vicinae preferences
2. Navigate to Extensions > ZSH History
3. Update the "History File Path" setting
4. Common alternative locations:
   - `~/.zsh/history`
   - `~/.histfile`
   - Custom path set via `$HISTFILE`

The path supports tilde (`~`) expansion for your home directory.

## Supported History Formats

The extension handles both ZSH history formats:

### Extended Format (Default)
```
: 1704446400:0;ls -la
: 1704446405:0;cd /home/user
: 1704446410:0;git status
```

### Simple Format
```
ls -la
cd /home/user
git status
```

Multi-line commands are displayed as-is with line breaks preserved.

## Limitations

- Displays up to 1000 most recent commands (configurable in source)
- Requires read access to the history file
- History file must be in ZSH format

## Development

### Build

Builds the extension to `~/.local/share/vicinae/extensions/zsh-history`:

```bash
npm run build
```

### Development Mode

Run the extension in development mode with hot reloading:

```bash
npm run dev
```

### Type Check

```bash
npm run typecheck
```

### Lint

Runs Biome linting and Vicinae manifest validation:

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Format Check (without fixes)

```bash
npm run format:check
```

## CI/CD

This project uses GitHub Actions for continuous integration. The CI pipeline runs on every push and pull request to the `main` branch.

### CI Pipeline

The workflow (`.github/workflows/ci.yml`) runs the following checks:

1. **Format Check**: Ensures code is properly formatted
2. **Lint**: Runs Biome linting and Vicinae manifest validation
3. **Type Check**: Validates TypeScript types
4. **Build**: Compiles the extension and uploads build artifacts

All checks must pass before merging pull requests.

## File Structure

```
src/
├── types.ts              # TypeScript interfaces
├── history.ts            # History file parser and utilities
├── list-command.tsx      # Main list view component
└── edit-command.tsx      # Edit command form component
```

## License

MIT

## Author

brpaz

## Contributing

Issues and pull requests are welcome!
