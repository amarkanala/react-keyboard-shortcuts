name: Bug Report
description: Report a bug or issue
title: "[BUG] "
labels: ["bug"]
body:

- type: markdown
  attributes:
  value: |
  Thanks for reporting an issue! Please fill out the form below.
- type: input
  id: version
  attributes:
  label: Package Version
  description: What version of react-keyboard-shortcuts are you using?
  placeholder: "1.0.0"
  validations:
  required: true
- type: input
  id: react-version
  attributes:
  label: React Version
  description: What version of React are you using?
  placeholder: "18.2.0"
  validations:
  required: true
- type: textarea
  id: description
  attributes:
  label: Description
  description: A clear description of the bug
  placeholder: "When I try to use the hook with X, it does Y instead of Z..."
  validations:
  required: true
- type: textarea
  id: steps
  attributes:
  label: Steps to Reproduce
  description: Steps to reproduce the behavior
  placeholder: | 1. Create a component with useKeyboardShortcut('ctrl+s', ...) 2. Press Ctrl+S 3. Expected: handler executes 4. Actual: nothing happens
  validations:
  required: true
- type: textarea
  id: expected
  attributes:
  label: Expected Behavior
  description: What should happen?
  validations:
  required: true
- type: textarea
  id: actual
  attributes:
  label: Actual Behavior
  description: What actually happens?
  validations:
  required: true
- type: textarea
  id: code
  attributes:
  label: Code Example
  description: Minimal code example to reproduce the issue
  render: javascript
  placeholder: |
  import { useKeyboardShortcut } from 'react-keyboard-shortcuts';
      function MyComponent() {
        useKeyboardShortcut('ctrl+s', () => {
          console.log('save');
        });
        return <div>Test</div>;
      }
- type: textarea
  id: environment
  attributes:
  label: Environment
  description: Include browser, OS, and any other relevant environment details
  placeholder: "macOS 14.0, Chrome 119"
- type: textarea
  id: additional
  attributes:
  label: Additional Context
  description: Any other relevant information?
