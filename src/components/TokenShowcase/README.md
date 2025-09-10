# TokenShowcase Component

A comprehensive demonstration component that showcases all CBDS design tokens and verifies the integration is working correctly.

## Overview

The `TokenShowcase` component provides a visual reference for the entire CBDS design system, displaying:

- **Semantic Colors**: Brand, success, error, warning, neutral, accent, and info colors
- **Color Palettes**: Full primitive color scales (grey, blue, green, red, yellow, indigo)
- **Spacing Scale**: Complete spacing system from 0.125rem to 10rem
- **Typography**: Font sizes, weights, and usage guidelines
- **Elevation**: Box shadow styles for different UI layers
- **Interactive States**: Hover and focus states for buttons
- **Border Radius**: Corner radius scale for components
- **Component Sizes**: Standard component sizing scale
- **Theme Switching**: Toggle between light and dark themes

## Features

### 🌓 Theme Switching
- Automatic system theme detection
- Interactive theme toggle button
- Seamless light/dark mode transitions
- Uses CSS custom properties for theming

### 🎨 Visual Design Token Reference
- Color swatches with hover tooltips showing token names
- Interactive buttons demonstrating hover states
- Typography examples with size and weight labels
- Elevation cards showing different shadow levels

### 📱 Responsive Design
- Responsive grid layouts that adapt to container sizes
- Mobile-friendly spacing and typography
- Maintains readability across all screen sizes

### ♿ Accessibility
- WCAG compliant color contrast ratios
- Keyboard navigation support
- Screen reader friendly markup
- Focus management for interactive elements

## Usage

### Basic Usage

```tsx
import { TokenShowcase } from './components/TokenShowcase';

function App() {
  return <TokenShowcase />;
}
```

### With Custom Styling

```tsx
import { TokenShowcase } from './components/TokenShowcase';

function App() {
  return (
    <TokenShowcase 
      className="custom-showcase-styling"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes to apply to the root element |

## Integration Verification

Use the `TokenVerification` story in Storybook to quickly verify that design tokens are properly loaded and accessible. If the component renders with proper styling, the token integration is working correctly.

## File Structure

```
TokenShowcase/
├── TokenShowcase.tsx          # Main component
├── TokenShowcase.module.css   # Component styles
├── TokenShowcase.stories.tsx  # Storybook stories
├── TokenTest.tsx              # Quick verification component
├── index.ts                   # Exports
└── README.md                  # This documentation
```

## Storybook Stories

- **Default**: Complete showcase with automatic theme detection
- **WithCustomStyling**: Demonstrates component extensibility
- **Responsive**: Shows responsive behavior in constrained containers
- **TokenVerification**: Quick test to verify token integration

## CSS Custom Properties Used

The component uses the complete set of CBDS design tokens via CSS custom properties:

- `--cbds-*-color-*`: All color tokens (primitive and semantic)
- `--cbds-spacing-*`: Spacing scale tokens
- `--cbds-font-*`: Typography tokens
- `--cbds-corner-radius-*`: Border radius tokens
- `--cbds-elevation-*`: Shadow/elevation tokens
- `--cbds-component-size-*`: Component sizing tokens

## Theme Implementation

The component implements theming through:

1. **CSS Data Attributes**: Uses `data-theme="dark"` on the document root
2. **CSS Custom Properties**: Theme-aware tokens that switch automatically
3. **JavaScript Theme Detection**: System preference detection and manual toggle
4. **Storybook Integration**: Works with Storybook's theme toolbar

## Best Practices

1. **Use as Reference**: Great for developers and designers to understand available tokens
2. **Integration Testing**: Use the TokenVerification story to test token loading
3. **Design Review**: Share with stakeholders to review the design system
4. **Component Development**: Reference when building new components with tokens

## Browser Support

Supports all modern browsers that support:
- CSS Custom Properties
- CSS Grid
- ES6+ JavaScript features
- MediaQueryList API

## Performance

- Lightweight implementation using CSS custom properties
- No JavaScript color calculations
- Efficient CSS Grid layouts
- Optimized for fast rendering