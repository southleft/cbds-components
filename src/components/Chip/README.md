# Chip

A compact, interactive label used to represent tags, filters, selected values, or contextual metadata.

Ported from the CBDS UI Kit Figma component (`node-id=279:2861`).

> Chip is not a substitute for a primary action control — use `Button` for that.

## Usage

```tsx
import { Chip } from "@/components";
import { Funnel } from "@phosphor-icons/react";

// Static tag
<Chip label="Design" />

// Filter pill (toggle)
<Chip label="Active" round selected={isActive} onClick={toggle} />

// Removable tag
<Chip label="typescript" dismissible onDismiss={remove} />

// With a leading icon
<Chip label="Filters" icon={Funnel} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | — | Chip label text (required) |
| `type` | `'brand' \| 'neutral'` | `'brand'` | Semantic color type |
| `variant` | `'fill' \| 'outline'` | `'fill'` | Visual style |
| `size` | `'small' \| 'large'` | `'small'` | 24px or 32px tall |
| `round` | `boolean` | `false` | Pill-shaped corners |
| `selected` | `boolean` | `false` | Toggled-on state |
| `disabled` | `boolean` | `false` | Suppresses all interaction |
| `icon` | `PhosphorIcon` | — | Leading icon. Ignored when `avatar` is set. |
| `avatar` | `ReactNode` | — | Leading avatar. Takes precedence over `icon`. |
| `dismissible` | `boolean` | `false` | Show the trailing close button |
| `dismissLabel` | `string` | `` `Remove ${label}` `` | Accessible label for the close button |
| `onDismiss` | `() => void` | — | Fired when the close button is clicked |
| `onClick` | `() => void` | — | Makes the chip a toggle |
| `className` | `string` | — | Additional CSS class |

## Behavior notes

**Rendered element depends on the props.** A chip with no `onClick` is a plain `<div>` — a tag, not a control. Adding `onClick` promotes it to a `<button>` with `aria-pressed` reflecting `selected`. When a chip is *both* clickable and dismissible it renders a `<div>` wrapping two sibling buttons, because a `<button>` nested inside a `<button>` is invalid HTML.

**Hover is CSS, not a prop.** Figma models `hover` as a fourth value on the `state` variant axis. In code it's a `:hover` rule, applied only to interactive chips — a static tag shouldn't give hover feedback.

**`icon` and `avatar` are mutually exclusive.** Per the Figma component notes, only one leading element renders; `avatar` wins.

## Design-token drift

Two places where this implementation intentionally diverges from a naive reading of the Figma variables. Both are worth reconciling with design.

1. **Large chip height.** Figma binds the large chip to `component-size/medium = 36px`, but `tokens.css` defines `--cbds-component-size-medium: 32px` (the scale runs 16/24/32/40/48 and has no 36px step). The component honors the token, so a large chip renders **32px**, 4px shorter than the Figma frame. Either the Figma variable or the token scale needs updating.

2. **Outline stroke color.** Figma binds the outline stroke to the `bg/*` tokens, not `border/*`. This matters for the neutral chip: `--cbds-border-neutral-default` is `#a2aebf`, a visibly lighter grey than `--cbds-bg-neutral-default` (`#3a475b`) that the design actually uses. The component follows the Figma binding and uses the `bg/*` tokens for the stroke.

## Implementation notes

The outline stroke is drawn with `box-shadow: inset` rather than `border`. Figma draws the stroke *inside* the box — a fill chip and an outline chip with the same label are both 61px wide. An inset shadow reproduces that exactly and, because it doesn't participate in layout, guarantees that a chip never changes size as it moves between default, hover, selected, and disabled.
