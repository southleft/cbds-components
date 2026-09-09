/**
 * CBDS component library.
 *
 * This is the workshop starting point: the primitives and the simplest atomics.
 * Button, Tabs, Accordion and the rest are generated live from Figma during the
 * session — they are intentionally absent here.
 */

// Primitives — no dependencies on other components
export { Icon } from './Icon/Icon';
export { AvatarIndicator } from './AvatarIndicator/AvatarIndicator';
export { TokenShowcase } from './TokenShowcase/TokenShowcase';

// Atomics — compose Icon, nothing deeper
export { ProgressBar } from './ProgressBar/ProgressBar';
export { Chip } from './Chip/Chip';
export { BadgeNotification } from './BadgeNotification/BadgeNotification';

export type { IconProps, IconSize, IconWeight } from './Icon/Icon';
export type { AvatarIndicatorProps } from './AvatarIndicator/AvatarIndicator';
export type { ProgressBarProps, ProgressBarType, ProgressBarSize } from './ProgressBar/ProgressBar';
export type { ChipProps, ChipType, ChipStyle, ChipSize } from './Chip/Chip';
export type {
  BadgeNotificationProps,
  BadgeNotificationType,
  BadgeNotificationStyle,
  BadgeNotificationSize,
} from './BadgeNotification/BadgeNotification';
