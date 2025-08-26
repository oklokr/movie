import React from "react";
import style from "./style.module.scss";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  width?: string | number;
}

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled,
  width,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${style.button} ${style[variant]} ${style[size]} ${
        disabled || isLoading ? style.disabled : ""
      }`}
      disabled={disabled || isLoading}
      style={{ width: width || "auto" }}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
