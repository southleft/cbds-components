import { clsx } from 'clsx';
import { X as XIcon } from '@phosphor-icons/react';
import { Icon } from '../Icon';
import type { IconWeight } from '../Icon';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import styles from './Chip.module.css';

export interface ChipProps {
  /** Text label displayed in the chip */
  label?: string;
  /** Visual type — brand (blue) or neutral (grey) */
  type?: 'brand' | 'neutral';
  /** Fill style — solid background or outline border */
  variant?: 'fill' | 'outline';
  /** Size of the chip */
  size?: 'small' | 'large';
  /** Use fully rounded (pill) corners */
  round?: boolean;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Optional leading icon (Phosphor icon component) */
  iconLeft?: PhosphorIcon;
  /** Optional avatar image URL */
  avatar?: string;
  /** Show dismiss (close) button */
  dismissible?: boolean;
  /** Called when the chip is clicked */
  onClick?: () => void;
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * Chip component matching CBDS Figma design specifications.
 *
 * Supports brand/neutral types, fill/outline variants, two sizes,
 * optional icons, avatars, and dismiss buttons.
 */
export const Chip: React.FC<ChipProps> = ({
  label = 'Label',
  type = 'brand',
  variant = 'fill',
  size = 'small',
  round = false,
  selected = false,
  disabled = false,
  iconLeft,
  avatar,
  dismissible = false,
  onClick,
  onDismiss,
  className,
}) => {
  const iconSize = size === 'small' ? 'small' : 'medium';
  const iconWeight: IconWeight = 'regular';

  return (
    <button
      type="button"
      className={clsx(
        styles.chip,
        styles[type],
        styles[variant],
        styles[size],
        round && styles.round,
        selected && styles.selected,
        disabled && styles.disabled,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
    >
      {iconLeft && (
        <Icon icon={iconLeft} size={iconSize} weight={iconWeight} />
      )}
      {avatar && (
        <img
          src={avatar}
          alt=""
          className={clsx(styles.avatar, size === 'small' ? styles.avatarSmall : styles.avatarLarge)}
        />
      )}
      <span className={styles.label}>{label}</span>
      {dismissible && (
        <button
          type="button"
          className={styles.dismiss}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss?.();
          }}
          aria-label={`Remove ${label}`}
          tabIndex={-1}
        >
          <Icon icon={XIcon} size={iconSize} weight={iconWeight} />
        </button>
      )}
    </button>
  );
};

export default Chip;
