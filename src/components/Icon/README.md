# Icon

A thin wrapper around [Phosphor Icons](https://phosphoricons.com) that gives every icon in the library the same size scale and accessibility behavior. It uses the same icon set as the CBDS UI Kit in Figma.

> Always render icons through `Icon`, not by importing Phosphor components directly. Never use raw SVG.

## Usage

```tsx
import { Icon } from "@/components";
import { WarningCircle } from "@phosphor-icons/react";

// Decorative (hidden from assistive tech)
<Icon icon={WarningCircle} />

// Meaningful on its own — give it a label
<Icon icon={WarningCircle} size="large" weight="fill" aria-label="Warning" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `PhosphorIcon` | — | A Phosphor icon component (required) |
| `size` | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge' \| '2xlarge'` | `'medium'` | 12, 16, 20, 24, 32 or 48px |
| `weight` | `'regular' \| 'fill' \| 'bold' \| 'light' \| 'thin' \| 'duotone'` | `'regular'` | Phosphor weight. `regular` is outline, `fill` is solid |
| `color` | `string` | `currentColor` | Override color. Defaults to inheriting from the parent |
| `aria-label` | `string` | — | Accessible label |
| `className` | `string` | — | Additional CSS class |

## Accessibility

Without `aria-label`, the icon renders `aria-hidden="true"` and is treated as decoration. Adding `aria-label` makes it visible to assistive tech. An icon that is the only content of a control should be labeled on the control instead.

## Examples

See the [Storybook stories](./Icon.stories.tsx) for sizes, weights, semantic colors and common icons.
