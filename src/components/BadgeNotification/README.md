# Badge Notification

A compact count or status marker that decorates a parent element — a nav item, a tab, an avatar, an icon button.

Ported from the CBDS UI Kit Figma component (`node-id=316:2163`).

> Badge Notification is not Chip. Chip labels or categorizes inline content; Badge Notification surfaces an unread count or status marker on something else.

## Usage

```tsx
import { BadgeNotification } from "@/components";

// Count on an icon button — the button owns the accessible name
<button type="button" aria-label="Notifications, 8 unread" style={{ position: "relative" }}>
  <Icon icon={Bell} size="large" />
  <BadgeNotification count={8} size="medium" style={{ position: "absolute", top: 2, right: 2 }} />
</button>

// Presence dot — the fact of news matters more than the quantity
<BadgeNotification type="brand" size="small" />

// Capped count
<BadgeNotification count={1240} max={99} /> // renders "99+"

// Standalone, announcing itself
<BadgeNotification count={8} label="8 unread messages" live />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `string \| number` | — | Count or short status value. Strings pass through untouched, so `"99+"` is valid. |
| `max` | `number` | — | Caps a numeric `count` — a value above `max` renders as `{max}+`. Ignored for strings. |
| `type` | `'alert' \| 'success' \| 'brand' \| 'neutral' \| 'warning' \| 'accent'` | `'alert'` | Semantic color type |
| `variant` | `'fill' \| 'tonal' \| 'outline'` | `'fill'` | Visual style |
| `size` | `'large' \| 'medium' \| 'small' \| 'xsmall'` | `'large'` | 24px, 16px, 8px dot, 4px dot |
| `label` | `string` | — | Accessible text when the badge must stand on its own |
| `live` | `boolean` | `false` | Announce `label` changes politely (`role="status"`) |
| `className` | `string` | — | Additional CSS class |

Any other `span` attribute (`style`, `id`, `data-*`) passes through to the root element — that is how you position the badge against its parent.

## Sizes

`large` and `medium` are pills that carry `count`. `small` and `xsmall` are bare dots: they render no text, and `count` is ignored. Cap large counts with `max` rather than letting the pill grow across its parent.

## Accessibility

- **The parent owns the name.** With no `label`, the badge renders `aria-hidden="true"` so a screen reader never reads an orphan number. Fold the count into the parent instead: `<button aria-label="Notifications, 8 unread">`.
- **`label` is the escape hatch** for a badge with no parent to name it. It renders as visually hidden text and the visible count is hidden from assistive technology, so the value is announced once, in context.
- **`live`** adds `role="status"` (implicit `aria-live="polite"`) for counts that update in place.
- **Color is never the only signal** (WCAG 1.4.1) — the accompanying text has to carry the meaning.

## Figma fidelity notes

- **Outline dots are an extension.** Figma defines `outline` only at `large` and `medium`. At `small` and `xsmall` this implementation renders a bordered ring on a transparent background, which is the natural continuation of the outline style.
- **Brand carries a stroke in every style.** Figma outlines `brand` on `fill` (where the stroke matches the fill and is invisible) and on `tonal` (where it reads as a visible ring). Both are reproduced; the other five types have a stroke only in `outline`.
- **Two token bindings were normalized.** Figma binds `brand / tonal / xsmall` to `bg/info/weak` and `accent / outline / large` text to `bg/accent/default`. Both resolve to the same values as their siblings' `bg/brand/weak` and `text/accent/default`, so this port uses the consistent semantic token in each case.
- **Vertical padding is dropped.** Figma sets 8px vertical padding on the text sizes, which the fixed 24px / 16px height overrides on canvas. The height is reproduced; the padding is not.
