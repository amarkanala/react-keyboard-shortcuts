# Contributing to React Keyboard Shortcuts

Thank you for your interest in contributing to React Keyboard Shortcuts! We welcome contributions from the community. Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Issues

1. **Search existing issues** before creating a new one
2. **Use the issue templates** provided (bug report or feature request)
3. **Provide clear examples** and reproduction steps
4. **Include environment details** (Node version, React version, OS, browser)

### Submitting Changes

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/your-username/react-keyboard-shortcuts.git
   cd react-keyboard-shortcuts
   ```

3. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Make your changes** following our code style guidelines

6. **Add or update tests**:

   ```bash
   npm test
   npm run test:watch  # For development
   ```

7. **Run linter**:

   ```bash
   npm run lint
   ```

8. **Format your code**:

   ```bash
   npm run format
   ```

9. **Commit with a clear message** following [Conventional Commits](#commit-messages):

   ```bash
   git commit -m "feat: add support for custom modifiers"
   ```

10. **Push to your fork**:

    ```bash
    git push origin feature/your-feature-name
    ```

11. **Create a Pull Request** to the main repository
    - Fill out the PR template completely
    - Link related issues
    - Describe your changes and why they're needed

## Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format
```

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body

footer
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, or tooling

**Examples:**

```
feat(hook): add support for meta key combinations
fix: correct modifier key detection for ctrl+shift
docs: update README with new examples
test: add tests for arrow key shortcuts
```

## Code Style

- Use modern JavaScript (ES6+)
- Follow React best practices and hooks conventions
- Add JSDoc comments for exported functions
- Keep code modular and well-documented
- Use meaningful variable and function names
- Maximum line length: 100 characters
- Use 2 spaces for indentation
- Use single quotes for strings
- No trailing commas

### Example Function Comment:

```javascript
/**
 * Hook for handling a single keyboard shortcut
 * @param {string} shortcut - Keyboard shortcut combination (e.g., 'ctrl+s')
 * @param {function} handler - Callback function that receives the keyboard event
 * @param {object} [options] - Configuration options
 * @param {boolean} [options.preventDefault=true] - Whether to call event.preventDefault()
 * @returns {void}
 */
export function useKeyboardShortcut(shortcut, handler, options = {}) {
  // implementation
}
```

## Testing

- Add unit tests for all new features
- Ensure all existing tests pass: `npm test`
- Aim for high test coverage
- Test edge cases and error conditions
- Update tests when modifying existing functionality

## Documentation

- Update README.md for user-facing changes
- Update CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/)
- Add JSDoc comments to functions
- Include examples for new features

## Pull Request Process

1. Update CHANGELOG.md with your changes
2. Update README.md if needed
3. Ensure all tests pass
4. Ensure code is properly formatted
5. Request review from maintainers
6. Address feedback and suggestions
7. Your PR will be merged once approved

## Release Process

Maintainers will:

1. Update version in package.json following [Semantic Versioning](https://semver.org/)
2. Update CHANGELOG.md
3. Create a git tag
4. Push to npm registry

## Questions?

Feel free to open a discussion or issue if you have questions about contributing.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to React Keyboard Shortcuts!** 🎉
