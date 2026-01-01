import { useState, FC } from 'react';
import { useKeyboardShortcut, useKeyboardShortcuts } from './useKeyboardShortcut';

const App: FC = () => {
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>('Press keyboard shortcuts to test!');

  // Single shortcut example with TypeScript
  useKeyboardShortcut('ctrl+s', (): void => {
    setMessage('Document saved! (Ctrl+S pressed)');
  });

  // Multiple shortcuts example
  useKeyboardShortcuts({
    'ctrl+z': (): void => {
      setCount((c) => Math.max(0, c - 1));
      setMessage('Undo! Count decreased');
    },
    'ctrl+y': (): void => {
      setCount((c) => c + 1);
      setMessage('Redo! Count increased');
    },
    space: (): void => {
      setCount(0);
      setMessage('Reset! Count set to 0');
    },
    esc: (): void => {
      setMessage('Escape pressed - clearing message');
      setTimeout(() => setMessage('Press keyboard shortcuts to test!'), 2000);
    },
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Keyboard Shortcuts Demo (TypeScript)</h1>

      <div
        style={{
          margin: '20px 0',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <p>
          <strong>Count:</strong> {count}
        </p>
        <p>
          <strong>Message:</strong> {message}
        </p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3>Available Shortcuts:</h3>
        <ul>
          <li>
            <kbd>Ctrl+S</kbd> - Save document
          </li>
          <li>
            <kbd>Ctrl+Z</kbd> - Decrease count
          </li>
          <li>
            <kbd>Ctrl+Y</kbd> - Increase count
          </li>
          <li>
            <kbd>Space</kbd> - Reset count
          </li>
          <li>
            <kbd>Esc</kbd> - Clear message
          </li>
        </ul>
      </div>

      <div style={{ margin: '20px 0' }}>
        <p>
          <em>Note: Shortcuts are ignored when typing in input fields.</em>
        </p>
        <input
          type="text"
          placeholder="Try typing here - shortcuts won't work"
          style={{ padding: '5px', width: '300px' }}
        />
      </div>
    </div>
  );
};

export default App;
