import React from "react";
import { clsx } from "clsx";
import styles from "./AvatarIndicator.module.css";

// AvatarIndicator component variants matching Figma design
type Type = "green" | "grey" | "red";
type Size = "xsmall" | "small" | "medium" | "large" | "xlarge";

export type AvatarIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: Type;
  size?: Size;
};

/**
 * AvatarIndicator component matching CBDS Figma design specifications
 * Follows BEM naming conventions with cbds-c-avatar-indicator namespace
 * Used to show status or presence indicators on avatars
 */
export const AvatarIndicator: React.FC<AvatarIndicatorProps> = ({
  type = "grey",
  size = "small",
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        styles["cbds-c-avatar-indicator"],
        styles[`cbds-c-avatar-indicator--${type}`],
        styles[`cbds-c-avatar-indicator--${size}`],
        className
      )}
      aria-hidden="true"
    />
  );
};

export default AvatarIndicator;
