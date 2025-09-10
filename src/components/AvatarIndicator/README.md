# AvatarIndicator Component

A small circular indicator component used to display status or presence information.

## Usage

```tsx
import { AvatarIndicator } from './components/AvatarIndicator';

// Basic usage
<AvatarIndicator type="green" size="small" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'green' \| 'grey' \| 'red'` | `'grey'` | The color type of the indicator |
| size | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | `'small'` | The size of the indicator |
| className | `string` | - | Additional CSS class names |
| ...props | `React.HTMLAttributes<HTMLDivElement>` | - | Standard HTML div attributes |

## Type Variants

- **green**: Active/Online status
- **grey**: Inactive/Offline status (default)
- **red**: Busy/Do not disturb status

## Size Variants

- **xsmall**: 6px diameter
- **small**: 8px diameter
- **medium**: 10px diameter
- **large**: 12px diameter
- **xlarge**: 14px diameter

## Design Tokens

The component uses the following design tokens:

- Colors:
  - `--cbds-bg-positive-default` (green)
  - `--cbds-bg-neutral-weak` (grey)
  - `--cbds-bg-danger-default` (red)
  - `--cbds-border-tertiary` (border)

## Accessibility

The component includes `aria-hidden="true"` by default as it's a decorative element. The actual status should be communicated through proper text alternatives.

## Examples

See the [Storybook stories](./AvatarIndicator.stories.tsx) for interactive examples and all variant combinations.
