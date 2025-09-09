# Tenet UI Workshop Sandbox

A production-ready Storybook environment for demonstrating Figma MCP component generation with the Tenet UI design system.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build design tokens (or leave running for auto-rebuild):
   ```bash
   npm run tokens:build
   ```

3. Start Storybook:
   ```bash
   npm run storybook
   ```

Optional: View standalone demo page
```bash
npm run dev
```

## Token Management

Paste Tenet token exports into `tokens/source/*.json` keeping the same key structure. 
Run `tokens:build` to regenerate CSS variables.

## Theme Switching

Use the theme toggle in the Storybook toolbar to switch between light and dark modes.

## Component Development

- Hand-written components: `src/components/`
- Generated components: `src/components/generated/`
- All components use CSS Modules with Tenet design tokens
