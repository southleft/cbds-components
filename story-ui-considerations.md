# Story UI AI Considerations

Instructions for the AI when generating stories for the CBDS component library.

## Component Library Details

**Library Name**: cbds-components
**Import Path**: Use relative imports from component directories
**Design Tokens**: CBDS CSS custom properties (e.g. `var(--cbds-bg-brand-default)`)

## Import Guidelines

### CRITICAL: Component Imports
This is a local component library, not an npm package.
All component imports MUST use relative paths from the components directory.

```javascript
// ✅ CORRECT - relative imports from generated stories
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { AvatarIndicator } from '../../components/AvatarIndicator/AvatarIndicator';

// ❌ WRONG - do NOT import from package name
// import { Button } from 'cbds-components';
```

### Import Pattern
- Components live at `/src/components/[ComponentName]/[ComponentName].tsx`
- From generated stories in `/src/stories/generated/`, use `../../components/[ComponentName]/[ComponentName]`

## Icons

**IMPORTANT**: This project uses [Phosphor Icons](https://phosphoricons.com/) via `@phosphor-icons/react` — the same icon set as the CBDS Figma UI Kit (1,500+ icons).

There is a CBDS `Icon` wrapper component that should be used for all icons:

```tsx
import { Icon } from '../../components/Icon/Icon';
import { House, MagnifyingGlass, Bell, WarningCircle } from '@phosphor-icons/react';

// Basic usage
<Icon icon={House} size="medium" />

// With weight (regular = outline, fill = solid)
<Icon icon={Bell} size="large" weight="fill" />

// With semantic color
<Icon icon={WarningCircle} size="medium" weight="fill" color="var(--cbds-icon-warning-default)" />
```

### Icon sizes (maps to CBDS icon-size tokens)
- `xsmall` = 12px
- `small` = 16px
- `medium` = 20px (default)
- `large` = 24px
- `xlarge` = 32px
- `2xlarge` = 48px

### Icon weights
- `regular` — outline style (default)
- `fill` — solid/filled style
- `bold`, `light`, `thin`, `duotone` — additional weights

### Do NOT:
- Use raw `<svg>` markup for icons
- Use any other icon library
- Import Phosphor icons without the `Icon` wrapper component

### Common icons used in CBDS components:
CaretDown, CaretUp, CaretRight, X, Check, MagnifyingGlass, WarningCircle, CheckCircle, XCircle, Info, Eye, EyeSlash, Plus, Minus, Trash, PencilSimple, Gear, User, Bell, House, ArrowRight, ArrowLeft, DotsThreeVertical, FunnelSimple, SortAscending, Download, Upload, Copy

## Design Tokens

### Spacing
Use `var(--cbds-spacing-{scale})` for all spacing: 025, 050, 100, 150, 200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000.

### Colors
- Backgrounds: `var(--cbds-bg-{semantic}-{variant})` (e.g. `--cbds-bg-brand-default`, `--cbds-bg-danger-weak`)
- Text: `var(--cbds-text-{semantic})` (e.g. `--cbds-text-primary`, `--cbds-text-brand-default`)
- Borders: `var(--cbds-border-{semantic})` (e.g. `--cbds-border-primary`, `--cbds-border-brand-default`)
- Icons: `var(--cbds-icon-{semantic})` (e.g. `--cbds-icon-primary`, `--cbds-icon-danger-default`)

### Corner Radius
Use `var(--cbds-corner-radius-{scale})`: 050 (4px), 100 (8px), 150 (12px), 200 (16px), 250 (20px), 300 (24px), 1200 (96px).

### Component Sizes
Use `var(--cbds-component-size-{size})`: xsmall (16px), small (24px), medium (32px), large (40px), xlarge (48px).

## Styling Approach

- Use **CSS Modules** (`.module.css`) for component styles
- Reference CBDS tokens as CSS custom properties
- Use `clsx` for conditional class names
- Components should support light and dark themes via the token system (no hardcoded colors)

## Do's and Don'ts

### DO
- Use the `Icon` component with Phosphor icons for all icon needs
- Use CBDS design token CSS variables for colors, spacing, radii, and sizes
- Use CSS Modules for scoped styles
- Use `clsx` for conditional class names
- Follow the existing component structure (ComponentName.tsx, ComponentName.module.css, ComponentName.stories.tsx, index.ts)

### DON'T
- Use raw SVG for icons
- Hardcode color values — use semantic tokens
- Import from 'cbds-components' package name
- Use inline styles for layout — prefer CSS Modules with token variables
