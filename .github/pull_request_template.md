name: Pull Request Template
description: Please fill out this template when submitting a PR

body:

- type: markdown
  attributes:
  value: |
  Thanks for submitting a PR! Please fill out the form below.
- type: textarea
  id: description
  attributes:
  label: Description
  description: What does this PR do?
  validations:
  required: true
- type: textarea
  id: related
  attributes:
  label: Related Issues
  description: "Link to related issues (e.g., Closes #123)"
  placeholder: "Closes #"
- type: checkboxes
  id: checklist
  attributes:
  label: Checklist
  options: - label: Tests added/updated
  required: true - label: Documentation updated
  required: true - label: Code follows the style guidelines
  required: true - label: No breaking changes
  required: true
- type: textarea
  id: testing
  attributes:
  label: Testing
  description: How have you tested this PR?
- type: textarea
  id: breaking
  attributes:
  label: Breaking Changes
  description: Does this introduce any breaking changes? If yes, describe them.
