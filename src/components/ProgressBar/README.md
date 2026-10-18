# ProgressBar

A horizontal bar showing how far along a task is, with an optional label, value and supporting text.

> ProgressBar shows determinate progress only. It has no indeterminate or loading state.

## Usage

```tsx
import { ProgressBar } from "@/components";

// Basic
<ProgressBar value={60} label="Uploading" />

// Custom value text
<ProgressBar value={3} max={5} label="Steps" formatValue={(v, max) => `${v} of ${max}`} />

// Completed
<ProgressBar value={100} type="success" label="Upload complete" />

// No visible label — give it an accessible name
<ProgressBar value={40} showValue={false} aria-label="Profile completeness" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | Current value. Clamped to `0`–`max` (required) |
| `max` | `number` | `100` | Maximum value. Non-positive values fall back to `100` |
| `type` | `'brand' \| 'success' \| 'error'` | `'brand'` | Semantic color type |
| `size` | `'large' \| 'medium' \| 'small'` | `'large'` | Track height |
| `label` | `ReactNode` | — | Label above the bar. The header row is hidden when there is no label and `showValue` is false |
| `showValue` | `boolean` | `true` | Show the value in the header row |
| `formatValue` | `(value, max) => ReactNode` | — | Custom value text. Receives the clamped value and `max` |
| `supportingText` | `ReactNode` | — | Text below the bar |
| `aria-label` | `string` | — | Accessible name when there is no string `label` |
| `className` | `string` | — | Additional CSS class |

## Behavior notes

**Completion swaps the value for an icon.** At `value >= max`, the `success` and `error` types replace the value text with a check or warning icon (via `Icon`). The `brand` type keeps showing the value.

**The percentage is computed, not passed in.** Pass `value` and `max`; the default value text is `Math.round(value / max * 100)%`.

## Accessibility

The track has `role="progressbar"` with `aria-valuemin`, `aria-valuemax` and `aria-valuenow`. Its accessible name is `aria-label` if given, otherwise a string `label`. If you pass a non-string `label` and no `aria-label`, the bar has no accessible name.

## Design tokens

Fill color comes from `--cbds-bg-brand-default`, `--cbds-bg-positive-default` and `--cbds-bg-danger-default`. The track uses `--cbds-bg-neutral-weakest`, and text uses the `--cbds-text-*` and `--cbds-label-*` tokens. Nothing in the component is a raw hex or pixel value.

## Examples

See the [Storybook stories](./ProgressBar.stories.tsx) for every size and type.
