"use client";

import React from "react";
import styles from "./style.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        {...props}
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
};

export default Input;
