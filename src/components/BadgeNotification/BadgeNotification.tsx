import React from "react";
import { clsx } from "clsx";
import styles from "./BadgeNotification.module.css";

export type BadgeNotificationType =
  | "alert"
  | "success"
  | "brand"
  | "neutral"
  | "warning"
  | "accent";
export type BadgeNotificationStyle = "fill" | "tonal" | "outline";
export type BadgeNotificationSize = "large" | "medium" | "small" | "xsmall";

export interface BadgeNotificationProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Count or short status value. Strings pass through untouched, so "99+" is valid. */
  count?: string | number;
  /** Caps a numeric `count` — a value above `max` renders as `{max}+`. Ignored for strings. */
  max?: number;
  /** Semantic color type */
  type?: BadgeNotificationType;
  /** Visual style: fill (solid), tonal (weak tint) or outline (bordered) */
  variant?: BadgeNotificationStyle;
  /** Size. `small` (8px) and `xsmall` (4px) are dots and never show `count`. */
  size?: BadgeNotificationSize;
  /**
   * Accessible text for the badge itself, e.g. "8 unread messages".
   * Leave unset when the parent owns the accessible name — the badge is then
   * hidden from assistive technology so the count is not read out of context.
   */
  label?: string;
  /** Announce changes to `label` politely. Only meaningful alongside `label`. */
  live?: boolean;
  /** Additional CSS class */
  className?: string;
}

const DOT_SIZES: BadgeNotificationSize[] = ["small", "xsmall"];

/**
 * BadgeNotification component matching CBDS Figma design specifications.
 *
 * A compact count or status marker for a parent element — a nav item, a tab,
 * an avatar, an icon button. Distinct from Chip, which labels inline content.
 *
 * Position it against its parent and let the parent own the accessible name;
 * pass `label` only when the badge must stand on its own. Never let color be
 * the sole carrier of meaning (WCAG 1.4.1).
 */
export const BadgeNotification: React.FC<BadgeNotificationProps> = ({
  count,
  max,
  type = "alert",
  variant = "fill",
  size = "large",
  label,
  live = false,
  className,
  ...rest
}) => {
  const isDot = DOT_SIZES.includes(size);

  // Numeric counts cap at `max`; a string count is already whatever the caller wants.
  const displayCount =
    typeof count === "number" && max !== undefined && count > max ? `${max}+` : count;

  const showCount = !isDot && displayCount !== undefined && displayCount !== "";

  return (
    <span
      {...rest}
      className={clsx(
        styles["cbds-c-badge-notification"],
        styles[`cbds-c-badge-notification--${type}`],
        styles[`cbds-c-badge-notification--${variant}`],
        styles[`cbds-c-badge-notification--${size}`],
        className
      )}
      role={label && live ? "status" : rest.role}
      aria-hidden={label ? undefined : true}
    >
      {label ? (
        <span className={styles["cbds-c-badge-notification__sr-only"]}>{label}</span>
      ) : null}
      {showCount ? (
        <span
          className={styles["cbds-c-badge-notification__count"]}
          aria-hidden={label ? true : undefined}
        >
          {displayCount}
        </span>
      ) : null}
    </span>
  );
};

export default BadgeNotification;
