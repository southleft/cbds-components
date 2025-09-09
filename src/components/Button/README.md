# Button Component

A comprehensive button component following CBDS design system with BEM naming conventions and Token Studio integration.

## Overview

The Button component has been updated to:
- Follow BEM (Block Element Modifier) methodology with `cbds-c-button` namespace
- Use CSS custom properties (tokens) from Token Studio parsed tokens
- Align with Figma design specifications for variants and sizes
- Support all interactive states (hover, active, focus, disabled)

## Button Variants

### Primary (Default)
- Uses brand color tokens (`--tenet-bg-brand-*`)
- White text on blue background
- Default variant when no variant prop is specified

### Surface
- Uses surface color tokens (`--tenet-bg-surface-secondary-*`)
- Dark text on light grey background
- For secondary actions

### Danger
- Uses danger color tokens (`--tenet-bg-danger-*`)
- White text on red background
- For destructive actions

### Ghost
- Transparent background with border
- Uses border tokens (`--tenet-border-primary-*`)
- For tertiary actions

## Sizes

- **Small**: 32px height, 14px font
- **Medium**: 40px height, 16px font (default)
- **Large**: 48px height, 16px font

## Token Usage

All styles use CSS custom properties from `src/styles/tokens.css`:

- **Colors**: Background, text, and border tokens
- **Spacing**: Padding using spacing tokens
- **Typography**: Font size and line height tokens
- **Sizing**: Component size tokens for height
- **Radius**: Corner radius tokens for rounded corners

## Example Usage

```tsx
import { Button } from './components/Button/Button';

// Primary button
<Button>Click me</Button>

// Surface variant
<Button variant="surface">Secondary Action</Button>

// Danger variant
<Button variant="danger">Delete</Button>

// Ghost variant
<Button variant="ghost">Cancel</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="large">Large</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

## Files

- `Button.tsx` - React component implementation
- `Button.module.css` - Styles using BEM and tokens
- `Button.stories.tsx` - Storybook stories for documentation
- `Button.spec.ts` - Component tests (if applicable)

## Design System Alignment

This component serves as a reference implementation for:
- BEM naming conventions with design system namespace
- Token Studio integration
- Figma design alignment
- Component architecture patterns

All future components should follow the same patterns established here.