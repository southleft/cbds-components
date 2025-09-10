import React from "react";
import { clsx } from "clsx";
import styles from "./Button.module.css";

// Button component variants matching Figma design
type Variant = "primary" | "surface" | "danger" | "ghost";
type Size = "small" | "medium" | "large";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

/**
 * Button component matching CBDS Figma design specifications
 * Follows BEM naming conventions with cbds-c-button namespace
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        styles["cbds-c-button"],
        variant !== "primary" && styles[`cbds-c-button--${variant}`],
        size !== "medium" && styles[`cbds-c-button--${size}`],
        fullWidth && styles["cbds-c-button--full-width"],
        className
      )}
    >
      {iconLeft && <span className={styles["cbds-c-button__icon-left"]}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles["cbds-c-button__icon-right"]}>{iconRight}</span>}
    </button>
  );
};

export default Button;
