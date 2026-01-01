import { useEffect, useCallback, useRef, useMemo } from 'react';

/**
 * Options for configuring keyboard shortcut behavior
 */
export interface KeyboardShortcutOptions {
  /**
   * Whether to call event.preventDefault()
   * @default true
   */
  preventDefault?: boolean;

  /**
   * Whether to call event.stopPropagation()
   * @default false
   */
  stopPropagation?: boolean;

  /**
   * Whether the shortcut is enabled
   * @default true
   */
  enabled?: boolean;
}

/**
 * Options for multiple shortcuts
 */
export interface KeyboardShortcutsOptions {
  /**
   * Whether all shortcuts are enabled
   * @default true
   */
  enabled?: boolean;
}

/**
 * Type for shortcut handler callback
 */
export type ShortcutHandler = (event: KeyboardEvent) => void;

/**
 * Type for shortcuts map in useKeyboardShortcuts
 */
export type ShortcutsMap = Record<string, ShortcutHandler>;

// Special key code definitions
const SPECIAL_KEYS: Record<string, number> = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': 189,
  '=': 187,
  ';': 186,
  "'": 222,
  '[': 219,
  ']': 221,
  '\\': 220
};

// Generate function keys dynamically
const FUNCTION_KEYS: Record<string, number> = {};
for (let i = 1; i <= 20; i++) {
  FUNCTION_KEYS[`f${i}`] = 111 + i;
}

// Modifier key mappings
const KEY_MODIFIERS: Record<string, number> = {
  '⇧': 16,
  shift: 16,
  '⌥': 18,
  alt: 18,
  option: 18,
  '⌃': 17,
  ctrl: 17,
  control: 17,
  '⌘': 91,
  command: 91,
  meta: 91
};

interface KeyCombination {
  keyCode: number;
  modifiers: number[];
  original: string;
}

// Convert key name to key code
function convertKeyToCode(keyName: string): number {
  const normalizedKey = keyName.toLowerCase();
  return (
    SPECIAL_KEYS[normalizedKey] ||
    FUNCTION_KEYS[normalizedKey] ||
    keyName.toUpperCase().charCodeAt(0)
  );
}

// Parse a single key combination
function processKeyCombination(combination: string): KeyCombination {
  const parts = combination.split('+');
  const primaryKey = parts.pop();
  const modifierCodes = parts
    .map((mod) => KEY_MODIFIERS[mod.toLowerCase()])
    .filter((code): code is number => code !== undefined);

  return {
    keyCode: convertKeyToCode(primaryKey!),
    modifiers: modifierCodes,
    original: combination
  };
}

// Parse shortcut string into key combinations
function analyzeShortcut(shortcutString: string): KeyCombination[] {
  return shortcutString
    .replace(/\s+/g, '') // Remove whitespace
    .split(',') // Split multiple shortcuts
    .map(processKeyCombination);
}

// Check if event modifiers match required modifiers
function validateModifiers(event: KeyboardEvent, requiredModifiers: number[]): boolean {
  const activeModifiers: number[] = [];
  if (event.shiftKey) {
    activeModifiers.push(16);
  }
  if (event.ctrlKey || event.metaKey) {
    activeModifiers.push(17);
  } // Treat meta as ctrl for shortcuts
  if (event.altKey) {
    activeModifiers.push(18);
  }
  if (event.metaKey) {
    activeModifiers.push(91);
  }

  // Exact match: all required modifiers must be active, and no extra ones
  return (
    requiredModifiers.length === activeModifiers.length &&
    requiredModifiers.every((mod) => activeModifiers.includes(mod))
  );
}

// Check if target element should be ignored
function shouldIgnoreElement(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  const tagName = element?.tagName;
  return tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA';
}

/**
 * Hook for handling a single keyboard shortcut
 * @param shortcut - Keyboard shortcut combination (e.g., 'ctrl+s', 'shift+enter')
 * @param handler - Callback function that receives the keyboard event
 * @param options - Configuration options
 * @example
 * useKeyboardShortcut('ctrl+s', () => {
 *   console.log('Save triggered!');
 * });
 */
export function useKeyboardShortcut(
  shortcut: string,
  handler: ShortcutHandler,
  options: KeyboardShortcutOptions = {}
): void {
  const { preventDefault = true, stopPropagation = false, enabled = true } = options;

  // Memoize parsed shortcut to avoid recalculation
  const parsedCombinations = useMemo(() => analyzeShortcut(shortcut), [shortcut]);

  // Use ref to store latest handler to avoid stale closures
  const handlerRef = useRef<ShortcutHandler>(handler);
  handlerRef.current = handler;

  // Event handler with optimized logic
  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      // Skip if disabled
      if (!enabled) {
        return;
      }

      // Skip if focused on form elements
      if (shouldIgnoreElement(event.target)) {
        return;
      }

      // Check each key combination
      for (const combination of parsedCombinations) {
        if (event.keyCode === combination.keyCode && validateModifiers(event, combination.modifiers)) {
          // Prevent default behavior if requested
          if (preventDefault) {
            event.preventDefault();
          }

          // Stop event propagation if requested
          if (stopPropagation) {
            event.stopPropagation();
          }

          // Execute the handler
          handlerRef.current(event);

          // Only trigger first matching combination
          break;
        }
      }
    },
    [parsedCombinations, enabled, preventDefault, stopPropagation]
  );

  // Set up and clean up event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent);
    return () => document.removeEventListener('keydown', handleKeyEvent);
  }, [handleKeyEvent]);
}

/**
 * Hook for handling multiple keyboard shortcuts
 * @param shortcutsMap - Object mapping shortcut strings to handler functions
 * @param options - Configuration options
 * @example
 * useKeyboardShortcuts({
 *   'ctrl+s': () => save(),
 *   'ctrl+z': () => undo(),
 *   'esc': () => closeModal()
 * });
 */
export function useKeyboardShortcuts(
  shortcutsMap: ShortcutsMap,
  options: KeyboardShortcutsOptions = {}
): void {
  const { enabled = true } = options;

  // Store shortcuts in ref to avoid stale closures
  const shortcutsRef = useRef<ShortcutsMap>(shortcutsMap);

  // Update ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcutsMap;
  }, [shortcutsMap]);

  // Process all shortcuts into combinations
  const allCombinations = useMemo(() => {
    const combinations: Array<KeyCombination & { handler: ShortcutHandler }> = [];
    for (const [shortcut, handler] of Object.entries(shortcutsMap)) {
      const parsed = analyzeShortcut(shortcut);
      combinations.push(...parsed.map((combo) => ({ ...combo, handler })));
    }
    return combinations;
  }, [shortcutsMap]);

  // Event handler for multiple shortcuts
  const handleMultipleKeys = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) {
        return;
      }

      // Skip form elements
      if (shouldIgnoreElement(event.target)) {
        return;
      }

      // Find matching shortcut and execute its handler
      for (const combination of allCombinations) {
        if (event.keyCode === combination.keyCode && validateModifiers(event, combination.modifiers)) {
          event.preventDefault();
          combination.handler(event);
          break; // Only execute first match
        }
      }
    },
    [allCombinations, enabled]
  );

  // Manage event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleMultipleKeys);
    return () => document.removeEventListener('keydown', handleMultipleKeys);
  }, [handleMultipleKeys]);
}
