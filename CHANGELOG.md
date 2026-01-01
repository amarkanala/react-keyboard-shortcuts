# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-01

### Added

- Initial release of React Keyboard Shortcuts
- `useKeyboardShortcut` hook for single shortcuts
- `useKeyboardShortcuts` hook for multiple shortcuts
- Support for modifier keys (ctrl, shift, alt, meta)
- Support for special keys (function keys, arrows, etc.)
- Component-scoped event management
- Automatic cleanup on unmount
- Input filtering (ignores shortcuts when focused on form elements)
- TypeScript support
- Comprehensive documentation and examples

### Features

- Performance optimized with useCallback and useMemo
- Flexible options for preventDefault, stopPropagation, and enable/disable
- Zero dependencies (only requires React 16.8+)
- Modern hook-based API
