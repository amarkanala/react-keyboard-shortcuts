name: Feature Request
description: Suggest a new feature or enhancement
title: "[FEATURE] "
labels: ["enhancement"]
body:

- type: markdown
  attributes:
  value: |
  Thanks for suggesting a feature! Please describe your idea below.
- type: textarea
  id: description
  attributes:
  label: Description
  description: A clear description of the feature you'd like
  placeholder: "I would like to add support for..."
  validations:
  required: true
- type: textarea
  id: motivation
  attributes:
  label: Motivation
  description: Why would this feature be useful?
  placeholder: "This would help with..."
  validations:
  required: true
- type: textarea
  id: solution
  attributes:
  label: Proposed Solution
  description: How do you think this should work?
  render: javascript
- type: textarea
  id: alternatives
  attributes:
  label: Alternative Solutions
  description: Any alternative approaches you've considered?
- type: textarea
  id: additional
  attributes:
  label: Additional Context
  description: Any other relevant information?
