# CBDS UI Design Tokens

This directory contains the design tokens for the CBDS UI component library. The tokens are managed using Token Studio and processed by Style Dictionary to generate CSS custom properties.

## Directory Structure

```
tokens/
├── json/                     # Token Studio JSON exports
│   ├── global.json          # Global tokens (typography, elevation, etc.)
│   ├── $themes.json         # Theme configuration
│   ├── $metadata.json       # Token metadata
│   ├── colour primitive/    # Primitive color tokens
│   ├── colour semantic/     # Semantic color tokens (Light/Dark)
│   ├── number primitive/    # Primitive number tokens (spacing, sizing)
│   └── text primitive/      # Text-related tokens
├── build.mjs               # Style Dictionary build script
└── README.md              # This file
```

## Generated Output

The build process generates the following files in `src/styles/`:

- `tokens.css` - Light theme CSS custom properties
- `tokens.dark.css` - Dark theme overrides
- `tokens.d.ts` - TypeScript definitions for all token names
- `themes.css` - Helper utilities and theme setup

## Token Categories

### Colors

#### Primitive Colors
- Light and dark color palettes for each hue
- Available hues: grey, blue, green, red, yellow, indigo
- Each hue has 10-11 shades (100-1000)

#### Semantic Colors
Semantic tokens reference primitive colors and provide meaningful names:
- `bg-*` - Background colors
- `text-*` - Text colors  
- `icon-*` - Icon colors
- `border-*` - Border colors
- `utility-*` - Utility colors

### Spacing & Sizing
- `spacing-*` - Spacing values in rem units
- `icon-size-*` - Icon sizes
- `component-size-*` - Component sizes
- `corner-radius-*` - Border radius values

### Typography
- `font-families-*` - Font family stacks
- `font-size-*` - Font sizes
- `font-weights-*` - Font weights  
- `line-heights-*` - Line heights
- `letter-spacing-*` - Letter spacing values

### Elevation
- `elevation-*` - Box shadow definitions for depth

## Usage

### CSS
```css
/* Import all tokens and theme utilities */
@import './src/styles/themes.css';

/* Use semantic tokens in your components */
.button {
  background-color: var(--cbds-bg-brand-default);
  color: var(--cbds-text-inverse-primary);
  padding: var(--cbds-spacing-100) var(--cbds-spacing-200);
  border-radius: var(--cbds-corner-radius-050);
}

.button:hover {
  background-color: var(--cbds-bg-brand-hover);
}
```

### Theme Switching
```html
<!-- Light theme (default) -->
<html>

<!-- Dark theme -->
<html data-theme="dark">

<!-- System preference -->
<html> <!-- Will respect prefers-color-scheme -->
```

### TypeScript
```ts
import type { CBDSVar } from './src/styles/tokens';

// Get TypeScript autocomplete for all token names
const primaryBg: CBDSVar = '--cbds-bg-brand-default';
```

## Building Tokens

The tokens are automatically built when you run:

```bash
npm run tokens:build
```

This command:
1. Loads Token Studio JSON files from `tokens/json/`
2. Merges primitive and semantic tokens
3. Handles token references (e.g., `{light.blue.600}`)
4. Generates CSS custom properties with `--cbds-` prefix
5. Creates separate light and dark theme files
6. Generates TypeScript definitions
7. Cleans up temporary files

## Token Naming Convention

All generated CSS custom properties follow this pattern:
```
--cbds-{category}-{subcategory}-{variant}
```

Examples:
- `--cbds-bg-brand-default`
- `--cbds-text-danger-hover`
- `--cbds-spacing-200`
- `--cbds-corner-radius-100`

## Development Workflow

1. **Edit tokens** in Token Studio or directly in the JSON files
2. **Export from Token Studio** to `tokens/json/` (if using Token Studio)
3. **Run build** with `npm run tokens:build`
4. **Use tokens** in components via CSS custom properties
5. **Test themes** by switching the `data-theme` attribute

## Token Studio Integration

To work with Token Studio:
1. Import the JSON files from `tokens/json/`
2. Make your changes in Token Studio
3. Export back to the same directory structure
4. Run the build process

## Customization

### Adding New Tokens
1. Add to the appropriate JSON file in `tokens/json/`
2. Follow the Token Studio format:
   ```json
   {
     "tokenName": {
       "value": "tokenValue",
       "type": "tokenType"
     }
   }
   ```
3. Run the build process

### Custom Transforms
Edit `tokens/build.mjs` to add custom Style Dictionary transforms for new token types.

## Best Practices

1. **Use semantic tokens** instead of primitive colors in components
2. **Reference existing tokens** instead of creating new ones when possible
3. **Test both themes** when developing components
4. **Use TypeScript definitions** for autocomplete and type safety
5. **Keep token names consistent** with the established naming convention