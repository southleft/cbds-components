import React from "react";
import { clsx } from "clsx";
import { X } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Icon } from "../Icon/Icon";
import styles from "./Chip.module.css";

export type ChipType = "brand" | "neutral";
export type ChipStyle = "fill" | "outline";
export type ChipSize = "small" | "large";

export interface ChipProps {
  /** Chip label text */
  label: string;
  /** Semantic color type */
  type?: ChipType;
  /** Visual style: fill (tinted background) or outline (bordered) */
  variant?: ChipStyle;
  /** Size: small (24px) or large (36px) */
  size?: ChipSize;
  /** Pill-shaped corners */
  round?: boolean;
  /** Selected (toggled-on) state */
  selected?: boolean;
  /** Disabled state — suppresses all interaction */
  disabled?: boolean;
  /** Leading Phosphor icon. Ignored when `avatar` is provided. */
  icon?: PhosphorIcon;
  /** Leading avatar node (e.g. an <img>). Takes precedence over `icon`. */
  avatar?: React.ReactNode;
  /** Show the trailing dismiss (X) button */
  dismissible?: boolean;
  /** Accessible label for the dismiss button */
  dismissLabel?: string;
  /** Callback when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Callback when the chip body is clicked — makes the chip a toggle */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Chip component matching CBDS Figma design specifications.
 *
 * A compact label for tags, filters, selected values, and dismissible metadata.
 * Provide `onClick` to make it a toggle (reflected via aria-pressed), and
 * `dismissible` to reveal a trailing close button.
 *
 * Not a substitute for Button — use Button for primary actions.
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  type = "brand",
  variant = "fill",
  size = "small",
  round = false,
  selected = false,
  disabled = false,
  icon,
  avatar,
  dismissible = false,
  dismissLabel = `Remove ${label}`,
  onDismiss,
  onClick,
  className,
}) => {
  const clickable = Boolean(onClick);

  const rootClass = clsx(
    styles["cbds-c-chip"],
    styles[`cbds-c-chip--${type}`],
    styles[`cbds-c-chip--${variant}`],
    styles[`cbds-c-chip--${size}`],
    round && styles["cbds-c-chip--round"],
    selected && styles["cbds-c-chip--selected"],
    disabled && styles["cbds-c-chip--disabled"],
    (clickable || dismissible) && styles["cbds-c-chip--interactive"],
    className
  );

  // Avatar and leading icon are mutually exclusive; avatar wins.
  const leading = avatar ? (
    <span className={styles["cbds-c-chip__avatar"]}>{avatar}</span>
  ) : icon ? (
    <span className={styles["cbds-c-chip__icon"]}>
      <Icon icon={icon} size="small" />
    </span>
  ) : null;

  const labelNode = <span className={styles["cbds-c-chip__label"]}>{label}</span>;

  const dismissNode = dismissible ? (
    <button
      type="button"
      className={styles["cbds-c-chip__dismiss"]}
      onClick={onDismiss}
      disabled={disabled}
      aria-label={dismissLabel}
    >
      <Icon icon={X} size="small" />
    </button>
  ) : null;

  // A clickable chip with a dismiss button needs two sibling buttons rather
  // than a button nested inside a button.
  if (clickable && dismissible) {
    return (
      <div className={rootClass}>
        <button
          type="button"
          className={styles["cbds-c-chip__action"]}
          onClick={onClick}
          disabled={disabled}
          aria-pressed={selected}
        >
          {leading}
          {labelNode}
        </button>
        {dismissNode}
      </div>
    );
  }

  if (clickable) {
    return (
      <button
        type="button"
        className={rootClass}
        onClick={onClick}
        disabled={disabled}
        aria-pressed={selected}
      >
        {leading}
        {labelNode}
      </button>
    );
  }

  return (
    <div className={rootClass} aria-disabled={disabled || undefined}>
      {leading}
      {labelNode}
      {dismissNode}
    </div>
  );
};

export default Chip;
