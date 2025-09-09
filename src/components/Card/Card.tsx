import React from "react";
import styles from "./Card.module.css";

/**
 * Card component for content containers
 * Uses Tenet design tokens for consistent styling
 */
export const Card: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ 
  title, 
  children 
}) => (
  <div className={styles.card}>
    {title && <div className={styles.header}>{title}</div>}
    <div className={styles.body}>{children}</div>
  </div>
);

export default Card;