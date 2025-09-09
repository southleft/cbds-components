# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library built with TypeScript, Vite, and Storybook. The project is configured for component development with visual testing and accessibility checks.

## Development Commands

```bash
# Start development server
npm run dev

# Start Storybook for component development
npm run storybook

# Build the project
npm run build

# Run ESLint
npm run lint

# Build Storybook for production
npm run build-storybook

# Run tests (Storybook Vitest integration)
npm test
```

## Architecture & Structure

### Component Development Workflow
- Components are developed in `src/stories/` directory
- Each component has:
  - Component file: `ComponentName.tsx`
  - Story file: `ComponentName.stories.ts`
  - CSS file: `componentname.css`
- Stories are automatically tested via Vitest integration with Playwright

### Testing Setup
- Tests run through Storybook's Vitest addon
- Browser testing enabled with Playwright (Chromium)
- Configuration in `vite.config.ts` extends Vitest for Storybook tests
- Setup file: `.storybook/vitest.setup.ts`

### Build Configuration
- **Vite**: Main build tool with React plugin
- **TypeScript**: Strict mode enabled with separate configs:
  - `tsconfig.app.json`: Application code configuration
  - `tsconfig.node.json`: Node/build tool configuration
- **ESLint**: Configured with React hooks and refresh plugins

### Storybook Configuration
- Main config: `.storybook/main.ts`
- Preview config: `.storybook/preview.ts`
- Addons:
  - Chromatic for visual testing
  - Docs for documentation
  - A11y for accessibility checks
  - Vitest for testing integration

## Key Dependencies

- **React 19.1.1** with React DOM
- **Vite 7.1.2** with React plugin
- **Storybook 9.1.5** with React-Vite integration
- **TypeScript 5.8.3**
- **Vitest 3.2.4** with Playwright browser testing