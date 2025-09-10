# Story UI AI Considerations

This file contains specific instructions and considerations for the AI when generating stories for your component library. You can customize this file to match your design system's requirements.

## Component Library Details

**Library Name**: cbds-components
**Import Path**: Use relative imports from component directories

## Core Principles

<!-- Add the fundamental principles of your design system -->
-
-
-

## Component Usage Rules

### Layout Components
<!-- Describe how layouts should be structured -->
-
-
-

### Spacing and Sizing
<!-- Explain your spacing/sizing system -->
-
-
-

### Color System
<!-- Describe how colors should be used -->
-
-
-

## Import Guidelines

### CRITICAL: Component Imports
**IMPORTANT**: This is a local component library project, not an npm package. 
All component imports MUST use relative paths from the components directory.

### Primary Imports
```javascript
// ✅ CORRECT - Use relative imports from the components directory
import { Button } from '../../components/Button/Button';
import { AvatarIndicator } from '../../components/AvatarIndicator/AvatarIndicator';
import { TokenShowcase } from '../../components/TokenShowcase/TokenShowcase';

// ❌ WRONG - Do NOT import from 'cbds-components' package name
// import { Button } from 'cbds-components';
```

### Import Pattern
- All components are located in `/src/components/[ComponentName]/[ComponentName].tsx`
- From generated stories in `/src/stories/generated/`, use `../../components/[ComponentName]/[ComponentName]`
- Never use the package name 'cbds-components' for imports

## Common Patterns

### Card Layouts
```jsx
// Example of proper card structure
```

### Form Layouts
```jsx
// Example of proper form structure
```

### Grid Layouts
```jsx
// Example of proper grid structure
```

## Do's and Don'ts

### ✅ DO
- Use relative imports for all components: `../../components/ComponentName/ComponentName`
- Follow the consistent component directory structure
- Import React types from '@storybook/react' or '@storybook/react-vite'

### ❌ DON'T
- Never import components from 'cbds-components' package name
- Don't assume components are exported from an index file
- Don't use barrel exports or index.ts files for imports

## Special Considerations

<!-- Add any library-specific quirks or important notes -->
-
-
-

## Examples of Correct Usage

### Example 1: [Component Name]
```jsx
// Show a complete, correct example
```

### Example 2: [Component Name]
```jsx
// Show another complete, correct example
```

## Error Patterns to Avoid

<!-- List common mistakes and how to avoid them -->
1. **Wrong**: `<div>...</div>`
   **Right**: `<View>...</View>`
   **Why**: [Explanation]

2. **Wrong**: `style={{margin: '10px'}}`
   **Right**: `margin="size-100"`
   **Why**: [Explanation]
