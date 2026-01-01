# React Keyboard Shortcuts

[![npm version](https://badge.fury.io/js/react-keyboard-shortcuts.svg)](https://badge.fury.io/js/react-keyboard-shortcuts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/react-keyboard-shortcuts.svg)](https://www.npmjs.com/package/react-keyboard-shortcuts)
[![Node.js version](https://img.shields.io/node/v/react-keyboard-shortcuts.svg)](https://nodejs.org/)
[![React version](https://img.shields.io/badge/react-16.8%2B-blue)](https://react.dev)
[![GitHub Actions](https://github.com/amarkanala/react-keyboard-shortcuts/workflows/Tests/badge.svg)](https://github.com/amarkanala/react-keyboard-shortcuts/actions)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Contributor%20Covenant-blue)](./CODE_OF_CONDUCT.md)

A modern, lightweight React hook library for handling keyboard shortcuts with component-scoped event management. Built with React hooks and optimized for performance.

---

## Features

- 🎯 **Component-scoped**: Shortcuts are automatically cleaned up when components unmount
- ⚡ **Performance optimized**: Uses `useCallback` and `useMemo` for efficient re-renders
- 🎛️ **Flexible options**: Control preventDefault, stopPropagation, and enable/disable behavior
- 🔧 **TypeScript ready**: Full TypeScript support with proper type definitions
- 📦 **Zero dependencies**: Only requires React 16.8+
- 🎨 **Modern API**: Clean, intuitive hook-based API

## Installation

```bash
npm install @amarkanala/react-keyboard-shortcuts
# or
yarn add @amarkanala/react-keyboard-shortcuts
```

## Running Tests

```bash
npm test
```

The test suite covers:

- Hook mounting/unmounting behavior
- Shortcut matching and execution
- Modifier key combinations
- Options (preventDefault, stopPropagation, enabled)
- Form element filtering
- Special keys and function keys
- Multiple shortcuts handling

## Development

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Run tests with coverage
npm run test:coverage
```

### Code Style

This project uses:

- **ESLint** for code quality
- **Prettier** for code formatting
- **Jest** for testing
- **Babel** for transpilation

## Supporting this Project

- ⭐ Star the repository on GitHub
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 🤝 Contribute code improvements
- 📢 Share with your community

## Quick Example

Check out `example.js` for a complete working example, or see this simple usage:

```jsx
import React, { useState } from 'react';
import { useKeyboardShortcut } from 'react-keyboard-shortcuts';

function MyComponent() {
  const [message, setMessage] = useState('');

  useKeyboardShortcut('ctrl+s', (event) => {
    setMessage('File saved!');
  });

  return (
    <div>
      <p>{message}</p>
      <p>Press Ctrl+S to save</p>
    </div>
  );
}
```

### Multiple Shortcuts

```jsx
import { useKeyboardShortcuts } from 'react-keyboard-shortcuts';

function App() {
  useKeyboardShortcuts({
    'ctrl+s': (event) => saveDocument(),
    'ctrl+o': (event) => openFileDialog(),
    'ctrl+z': (event) => undo(),
    f1: (event) => showHelp(),
    esc: (event) => closeModal()
  });

  return <div>Your app content</div>;
}
```

### Advanced Options

```jsx
useKeyboardShortcut('ctrl+shift+z', redoAction, {
  preventDefault: true, // Prevent browser default (default: true)
  stopPropagation: false, // Stop event bubbling (default: false)
  enabled: canRedo // Conditionally enable/disable (default: true)
});
```

## TypeScript Support

This library includes full TypeScript support with comprehensive type definitions.

### TypeScript Example

```typescript
import { useState, FC } from 'react';
import { useKeyboardShortcut, useKeyboardShortcuts } from 'react-keyboard-shortcuts';

const App: FC = () => {
  const [saved, setSaved] = useState<boolean>(false);

  // Single shortcut with full type safety
  useKeyboardShortcut('ctrl+s', (event: KeyboardEvent): void => {
    setSaved(true);
  });

  // Multiple shortcuts with type inference
  useKeyboardShortcuts({
    'ctrl+z': (): void => undo(),
    'ctrl+y': (): void => redo(),
    esc: (): void => closeDialog(),
  });

  return (
    <div>
      {saved && <p>Document saved!</p>}
    </div>
  );
};

export default App;
```

### Type Definitions

The library exports the following TypeScript types and interfaces:

```typescript
// Single shortcut options
interface KeyboardShortcutOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
}

// Multiple shortcuts options
interface KeyboardShortcutsOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
}

// Handler function type
type ShortcutHandler = (event: KeyboardEvent) => void;

// Shortcuts map type
type ShortcutsMap = Record<string, ShortcutHandler>;
```

### Building from Source

To compile TypeScript files:

```bash
npm run build     # Compile TypeScript to JavaScript
npm run type-check # Check types without emitting files
```

## Supported Shortcuts

### Modifiers

- `ctrl` / `⌃` - Control key
- `shift` / `⇧` - Shift key
- `alt` / `⌥` - Alt/Option key
- `meta` / `⌘` - Command/Windows key

### Special Keys

- `backspace`, `tab`, `enter`, `esc`, `space`
- Arrow keys: `left`, `up`, `right`, `down`
- Function keys: `f1`, `f2`, ..., `f20`
- `home`, `end`, `pageup`, `pagedown`
- `del`, `delete`

### Examples

```javascript
'ctrl+s'; // Control + S
'shift+enter'; // Shift + Enter
'ctrl+shift+z'; // Control + Shift + Z
'alt+f4'; // Alt + F4
'f1'; // F1 key
'esc'; // Escape key
'ctrl+o,ctrl+n'; // Multiple shortcuts (first match wins)
```

## API Reference

### `useKeyboardShortcut(shortcut, handler, options?)`

#### Parameters

- `shortcut` (string): Keyboard shortcut combination
- `handler` (function): Callback function receiving the keyboard event
- `options` (object, optional): Configuration options

#### Options

- `preventDefault` (boolean, default: true): Call `event.preventDefault()`
- `stopPropagation` (boolean, default: false): Call `event.stopPropagation()`
- `enabled` (boolean, default: true): Enable/disable the shortcut

### `useKeyboardShortcuts(shortcutsMap, options?)`

#### Parameters

- `shortcutsMap` (object): Object mapping shortcuts to handlers
- `options` (object, optional): Configuration options

#### Options

- `enabled` (boolean, default: true): Enable/disable all shortcuts

## Behavior

- **Input filtering**: Shortcuts are ignored when focused on `input`, `select`, or `textarea` elements
- **First match wins**: For multiple shortcuts, only the first matching combination executes
- **Automatic cleanup**: Event listeners are removed when components unmount
- **Performance**: Uses React's optimization hooks to prevent unnecessary re-renders

## TypeScript Support

```tsx
import { useKeyboardShortcut, useKeyboardShortcuts } from 'react-keyboard-shortcuts';

interface ShortcutOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
}

function useKeyboardShortcut(
  shortcut: string,
  handler: (event: KeyboardEvent) => void,
  options?: ShortcutOptions
): void;

function useKeyboardShortcuts(
  shortcuts: Record<string, (event: KeyboardEvent) => void>,
  options?: { enabled?: boolean }
): void;
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.
