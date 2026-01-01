import { renderHook, act } from '@testing-library/react';
import { useKeyboardShortcut, useKeyboardShortcuts } from '../dist/useKeyboardShortcut.js';

// Mock document methods
const mockAddEventListener = jest.spyOn(document, 'addEventListener');
const mockRemoveEventListener = jest.spyOn(document, 'removeEventListener');

beforeEach(() => {
  mockAddEventListener.mockClear();
  mockRemoveEventListener.mockClear();
});

afterEach(() => {
  mockAddEventListener.mockRestore();
  mockRemoveEventListener.mockRestore();
});

describe('useKeyboardShortcut', () => {
  it('should add and remove event listeners on mount/unmount', () => {
    const mockHandler = jest.fn();
    const { unmount } = renderHook(() =>
      useKeyboardShortcut('ctrl+s', mockHandler)
    );

    expect(mockAddEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(mockRemoveEventListener).not.toHaveBeenCalled();

    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should call handler when shortcut matches', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+s', mockHandler));

    const event = new KeyboardEvent('keydown', {
      keyCode: 83, // 's'
      ctrlKey: true,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).toHaveBeenCalledWith(event);
  });

  it('should not call handler when shortcut does not match', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+s', mockHandler));

    const event = new KeyboardEvent('keydown', {
      keyCode: 65, // 'a'
      ctrlKey: true,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should handle modifier combinations correctly', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+shift+s', mockHandler));

    const event = new KeyboardEvent('keydown', {
      keyCode: 83, // 's'
      ctrlKey: true,
      shiftKey: true,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).toHaveBeenCalledWith(event);
  });

  it('should respect preventDefault option', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+s', mockHandler, { preventDefault: false }));

    const event = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    act(() => {
      document.dispatchEvent(event);
    });

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should respect stopPropagation option', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+s', mockHandler, { stopPropagation: true }));

    const event = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });
    const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');

    act(() => {
      document.dispatchEvent(event);
    });

    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('should respect enabled option', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+s', mockHandler, { enabled: false }));

    const event = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should ignore events on input elements', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+s', mockHandler));

    const input = document.createElement('input');
    document.body.appendChild(input);

    const event = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });
    Object.defineProperty(event, 'target', { value: input });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });

  it('should ignore events on textarea elements', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+s', mockHandler));

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    const event = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });
    Object.defineProperty(event, 'target', { value: textarea });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).not.toHaveBeenCalled();
    document.body.removeChild(textarea);
  });

  it('should ignore events on select elements', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('ctrl+s', mockHandler));

    const select = document.createElement('select');
    document.body.appendChild(select);

    const event = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });
    Object.defineProperty(event, 'target', { value: select });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).not.toHaveBeenCalled();
    document.body.removeChild(select);
  });

  it('should handle special keys', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('enter', mockHandler));

    const event = new KeyboardEvent('keydown', {
      keyCode: 13, // enter
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).toHaveBeenCalledWith(event);
  });

  it('should handle function keys', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('f1', mockHandler));

    const event = new KeyboardEvent('keydown', {
      keyCode: 112, // f1
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).toHaveBeenCalledWith(event);
  });

  it('should handle arrow keys', () => {
    const mockHandler = jest.fn();
    renderHook(() => useKeyboardShortcut('left', mockHandler));

    const event = new KeyboardEvent('keydown', {
      keyCode: 37, // left arrow
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockHandler).toHaveBeenCalledWith(event);
  });
});

describe('useKeyboardShortcuts', () => {
  it('should handle multiple shortcuts', () => {
    const mockSave = jest.fn();
    const mockOpen = jest.fn();
    renderHook(() => useKeyboardShortcuts({
      'ctrl+s': mockSave,
      'ctrl+o': mockOpen
    }));

    // Test ctrl+s
    const saveEvent = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(saveEvent);
    });

    expect(mockSave).toHaveBeenCalledWith(saveEvent);
    expect(mockOpen).not.toHaveBeenCalled();

    // Test ctrl+o
    const openEvent = new KeyboardEvent('keydown', {
      keyCode: 79,
      ctrlKey: true,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(openEvent);
    });

    expect(mockOpen).toHaveBeenCalledWith(openEvent);
  });

  it('should respect enabled option for all shortcuts', () => {
    const mockSave = jest.fn();
    const mockOpen = jest.fn();
    renderHook(() => useKeyboardShortcuts({
      'ctrl+s': mockSave,
      'ctrl+o': mockOpen
    }, { enabled: false }));

    const event = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockSave).not.toHaveBeenCalled();
    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('should handle multiple different shortcuts', () => {
    const mockSave = jest.fn();
    const mockOpen = jest.fn();
    const mockClose = jest.fn();

    renderHook(() => useKeyboardShortcuts({
      'ctrl+s': mockSave,
      'ctrl+o': mockOpen,
      'esc': mockClose
    }));

    // Test ctrl+s
    const saveEvent = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(saveEvent);
    });

    expect(mockSave).toHaveBeenCalledWith(saveEvent);
    expect(mockOpen).not.toHaveBeenCalled();
    expect(mockClose).not.toHaveBeenCalled();

    // Reset mocks
    mockSave.mockClear();

    // Test esc
    const escEvent = new KeyboardEvent('keydown', {
      keyCode: 27,
      bubbles: true
    });

    act(() => {
      document.dispatchEvent(escEvent);
    });

    expect(mockClose).toHaveBeenCalledWith(escEvent);
    expect(mockSave).not.toHaveBeenCalled();
    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('should ignore events on form elements', () => {
    const mockSave = jest.fn();
    renderHook(() => useKeyboardShortcuts({
      'ctrl+s': mockSave
    }));

    const input = document.createElement('input');
    document.body.appendChild(input);

    const event = new KeyboardEvent('keydown', {
      keyCode: 83,
      ctrlKey: true,
      bubbles: true
    });
    Object.defineProperty(event, 'target', { value: input });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockSave).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });
});
