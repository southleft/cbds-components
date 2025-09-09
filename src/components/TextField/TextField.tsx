import React from "react";
import styles from "./TextField.module.css";

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & { 
  label?: string; 
  id?: string; 
};

/**
 * TextField component for form inputs
 * Automatically generates IDs and associates labels
 */
export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  id, 
  ...props 
}) => {
  const inputId = id || React.useId();
  
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
      <input id={inputId} className={styles.input} {...props} />
    </div>
  );
};

export default TextField;