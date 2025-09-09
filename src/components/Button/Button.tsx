import React from "react";
import { clsx } from "clsx";
import styles from "./Button.module.css";

// Button component variants and sizes
type Variant = "default" | "primary" | "danger" | "ghost";
type Size = "md" | "sm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

/**
 * Button component using Tenet design tokens
 * Supports multiple variants and sizes
 */
export const Button: React.FC<ButtonProps> = ({ 
  variant = "default", 
  size = "md", 
  className, 
  ...props 
}) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.root, 
        variant !== "default" && styles[variant], 
        size === "sm" && styles.sm, 
        className
      )}
    />
  );
};

export default Button;