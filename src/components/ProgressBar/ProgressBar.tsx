import React from "react";
import { clsx } from "clsx";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { Icon } from "../Icon/Icon";
import styles from "./ProgressBar.module.css";

export type ProgressBarType = "brand" | "success" | "error";
export type ProgressBarSize = "large" | "medium" | "small";

export interface ProgressBarProps {
  /** Current value (0–max). Clamped to [0, max]. */
  value: number;
  /** Maximum value the bar represents. Defaults to 100. */
  max?: number;
  /** Semantic color type. */
  type?: ProgressBarType;
  /** Track height variant. */
  size?: ProgressBarSize;
  /** Label displayed above the bar. Hides the header row when omitted. */
  label?: React.ReactNode;
  /** Show the value/percentage in the header row. */
  showValue?: boolean;
  /** Custom renderer for the value text. Receives clamped value and max. */
  formatValue?: (value: number, max: number) => React.ReactNode;
  /** Supporting text displayed below the bar. */
  supportingText?: React.ReactNode;
  /** Accessible label when no visible label is rendered. */
  "aria-label"?: string;
  /** Additional CSS class on the root element. */
  className?: string;
}

const TYPE_COMPLETION_ICON: Partial<Record<ProgressBarType, typeof CheckCircle>> = {
  success: CheckCircle,
  error: WarningCircle,
};

/**
 * ProgressBar component matching CBDS Figma design specifications.
 * Three sizes (large/medium/small), three semantic types (brand/success/error),
 * and optional label, value, and supporting text rows.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  type = "brand",
  size = "large",
  label,
  showValue = true,
  formatValue,
  supportingText,
  className,
  ...rest
}) => {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const percent = (clamped / safeMax) * 100;
  const isComplete = clamped >= safeMax;
  const CompletionIcon = isComplete ? TYPE_COMPLETION_ICON[type] : undefined;
  const showHeader = Boolean(label) || showValue;

  const renderedValue = formatValue
    ? formatValue(clamped, safeMax)
    : `${Math.round(percent)}%`;

  return (
    <div
      className={clsx(
        styles["cbds-c-progress"],
        styles[`cbds-c-progress--${type}`],
        styles[`cbds-c-progress--${size}`],
        className
      )}
    >
      {showHeader && (
        <div className={styles["cbds-c-progress__header"]}>
          {label && <span className={styles["cbds-c-progress__label"]}>{label}</span>}
          {showValue && (
            <span className={styles["cbds-c-progress__value"]}>
              {CompletionIcon ? (
                <Icon icon={CompletionIcon} size="xsmall" weight="fill" />
              ) : (
                renderedValue
              )}
            </span>
          )}
        </div>
      )}
      <div
        className={styles["cbds-c-progress__track"]}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        aria-label={rest["aria-label"] ?? (typeof label === "string" ? label : undefined)}
      >
        <div
          className={styles["cbds-c-progress__bar"]}
          style={{ width: `${percent}%` }}
        />
      </div>
      {supportingText && (
        <span className={styles["cbds-c-progress__supporting"]}>{supportingText}</span>
      )}
    </div>
  );
};

export default ProgressBar;
