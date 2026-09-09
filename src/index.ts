/**
 * CBDS Components — the public package entry point.
 *
 * This is the surface that ships to consuming products, and it is deliberately
 * narrower than `src/components/index.ts`. Workshop fixtures and Storybook-only
 * helpers stay behind; only components meant to be used in a real application
 * are re-exported here.
 *
 * ── Adding a generated component ──────────────────────────────────────────
 * Add one line to the matching tier below, and one line to the types block.
 * If it is not exported from this file, it is not in the package.
 */

/* Primitives — no dependencies on other components */
export { Icon } from "./components/Icon/Icon";
export { AvatarIndicator } from "./components/AvatarIndicator/AvatarIndicator";

/* Atomics — compose Icon, nothing deeper */
export { ProgressBar } from "./components/ProgressBar/ProgressBar";
export { Chip } from "./components/Chip/Chip";
export { BadgeNotification } from "./components/BadgeNotification/BadgeNotification";

/* Types */
export type { IconProps, IconSize, IconWeight } from "./components/Icon/Icon";
export type { AvatarIndicatorProps } from "./components/AvatarIndicator/AvatarIndicator";
export type {
  ProgressBarProps,
  ProgressBarType,
  ProgressBarSize,
} from "./components/ProgressBar/ProgressBar";
export type { ChipProps, ChipType, ChipStyle, ChipSize } from "./components/Chip/Chip";
export type {
  BadgeNotificationProps,
  BadgeNotificationType,
  BadgeNotificationStyle,
  BadgeNotificationSize,
} from "./components/BadgeNotification/BadgeNotification";
