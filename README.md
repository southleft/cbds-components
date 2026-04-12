# CBDS Components

A Storybook-based component library powered by the CBDS (Component-Based Design System) design tokens. Built as a companion to the [CBDS UI Kit Demo](https://www.figma.com/design/WofZT8xaxXuc2Q6Je9S4XE/CBDS-UI-Kit-Demo) Figma project, this repo demonstrates the full pipeline from Figma design tokens to coded React components.

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or newer

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url>
cd cbds-components

# 2. Install dependencies
npm install

# 3. Start Storybook
npm run storybook
```

Storybook will open at [http://localhost:6006](http://localhost:6006). You should see the CBDS logo and a sidebar with components, design tokens, and more.

## What You'll Find

- **Components** -- Hand-built React components (AvatarIndicator, Button) styled with CBDS design tokens
- **Design System > Token Showcase** -- A visual reference of every token in the system: colors, spacing, typography, elevation, and sizing
- **Theme Switching** -- Use the sun/moon icon in the toolbar to toggle between light and dark modes

## Adding Components

New components go in `src/components/`. Each component follows this pattern:

```
src/components/MyComponent/
  MyComponent.tsx            # Component code
  MyComponent.stories.tsx    # Storybook stories
  MyComponent.module.css     # Styles using CBDS tokens
  index.ts                   # Export
```

Use CBDS tokens in your CSS via custom properties, for example: `color: var(--cbds-text-primary)` or `padding: var(--cbds-spacing-200)`.

## Story UI (Optional)

Story UI is an AI-powered tool that generates Storybook stories from natural-language descriptions. If you'd like to try it:

```bash
# 1. Initialize Story UI (creates config, .env file, and panel files)
#    It will ask for your Claude API key during setup.
npx story-ui init

# 2. Start Storybook + Story UI together
npm run storybook-with-ui
```

Once running, navigate to **Story UI > Story Generator** in the sidebar. Describe a component and it will generate a working story for you.

When you add new components to `src/components/`, Story UI picks them up automatically -- no restart needed. If a newly generated story doesn't appear in the sidebar, just refresh the page.
