import type { IconProps as PhosphorIconProps, Icon as PhosphorIcon } from '@phosphor-icons/react';
import styles from './Icon.module.css';
import { clsx } from 'clsx';

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge';
export type IconWeight = 'regular' | 'fill' | 'bold' | 'light' | 'thin' | 'duotone';

const sizeMap: Record<IconSize, number> = {
  xsmall: 12,
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 32,
  '2xlarge': 48,
};

export interface IconProps {
  /** A Phosphor icon component, e.g. WarningCircle from @phosphor-icons/react */
  icon: PhosphorIcon;
  /** CBDS size token — maps to icon-size variables */
  size?: IconSize;
  /** Phosphor weight — "regular" for outline, "fill" for filled */
  weight?: IconWeight;
  /** Override color (defaults to currentColor, inheriting from parent) */
  color?: string;
  /** Additional CSS class */
  className?: string;
  /** Accessible label — renders as aria-label */
  'aria-label'?: string;
}

/**
 * CBDS Icon wrapper around Phosphor Icons.
 *
 * Uses the same icon set as the Figma CBDS UI Kit.
 * Sizes map to CBDS icon-size tokens (xsmall=12, small=16, medium=20, large=24, xlarge=32, 2xlarge=48).
 */
export const Icon: React.FC<IconProps> = ({
  icon: PhosphorComponent,
  size = 'medium',
  weight = 'regular',
  color,
  className,
  'aria-label': ariaLabel,
}) => {
  return (
    <PhosphorComponent
      size={sizeMap[size]}
      weight={weight}
      color={color}
      className={clsx(styles.icon, className)}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  );
};

export default Icon;
