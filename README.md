# CBDS Components

A Storybook-based component library powered by the CBDS (Component-Based Design System) design tokens. Built as a companion to the [CBDS UI Kit Demo](https://www.figma.com/design/WofZT8xaxXuc2Q6Je9S4XE/CBDS-UI-Kit-Demo) Figma project, this repo demonstrates the full pipeline from Figma design tokens to coded React components.

## Prerequisites

- **Node.js** 18+ (tested with v22)
- **npm** 9+

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

Storybook will open at [http://localhost:6006](http://localhost:6006).

## What's Inside

| Sidebar Section | Description |
|---|---|
| **Components** | Hand-built React components (AvatarIndicator, Button) using CBDS tokens |
| **Design System** | Token Showcase displaying all color palettes, spacing, typography, elevation, and sizing tokens |
| **Story UI** | AI-powered story generator (optional setup below) |
| **Generated** | Stories created by Story UI or other tools |

## Design Tokens

Tokens are generated from JSON source files using [Style Dictionary](https://amzn.github.io/style-dictionary/) and output as CSS custom properties.

```bash
# Rebuild tokens after editing JSON source files
npm run tokens
```

Source files live in `tokens/json/`. Output goes to `src/styles/tokens.css` and `src/styles/tokens.dark.css`.

The token architecture mirrors the Figma variable collections:

- **Colour Primitive** -- raw color scales (grey, blue, green, red, yellow, indigo) for light and dark
- **Colour Semantic** -- contextual tokens (bg, text, icon, border) with Light and Dark modes
- **Number Primitive** -- spacing, corner-radius, component-size, icon-size
- **Text Primitive** -- font sizes, line heights, font weights
- **Text Semantic** -- composed typography tokens (body, label, heading, display)

## Theme Switching

Use the theme toggle in the Storybook toolbar (sun/moon icon) to switch between light and dark modes.

## Component Development

Components live in `src/components/` and follow this structure:

```
src/components/Button/
  Button.tsx              # Component implementation
  Button.stories.tsx      # Storybook stories
  Button.module.css       # Scoped styles using CBDS tokens
  index.ts                # Barrel export
```

All components use CSS Modules with CBDS design token CSS custom properties (e.g. `var(--cbds-bg-brand-default)`).

## Story UI (Optional)

Story UI is an AI-powered story generator that lets you describe a component in natural language and generates a working Storybook story. It requires a Claude API key.

### Setup

```bash
# 1. Create a .env file with your API key
cp .env.example .env
# Then edit .env and add your CLAUDE_API_KEY

# 2. Initialize Story UI (downloads panel files into your project)
npx story-ui init

# 3. Start Storybook + Story UI together
npm run storybook-with-ui
```

This starts Storybook on port 6006 and the Story UI MCP server on port 4001.

### Using Story UI

1. Navigate to **Story UI > Story Generator** in the Storybook sidebar
2. Type a component description (e.g. "Create a card component with an image, title, and description")
3. Story UI generates a `.stories.tsx` file in `src/stories/generated/`
4. The new story appears in the **Generated** section of the sidebar

### Adding New Components

When you add new components to `src/components/`, Story UI automatically discovers them within about 60 seconds (no restart needed). The AI can then reference your components when generating stories.

If Storybook doesn't pick up a new generated story file, a quick page refresh (Cmd+R) will load it.

## Available Scripts

| Command | Description |
|---|---|
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run dev` | Start Vite dev server (builds tokens first) |
| `npm run build` | Build tokens + production bundle |
| `npm run tokens` | Rebuild design tokens from JSON sources |
| `npm run lint` | Run ESLint |
| `npm run build-storybook` | Build static Storybook for deployment |
| `npm run storybook-with-ui` | Start Storybook + Story UI together |

## Tech Stack

- **React 19** with TypeScript
- **Storybook 10** with React-Vite integration
- **Vite 7** as build tool
- **Style Dictionary** for token generation
- **Story UI** for AI-powered story generation (optional)
