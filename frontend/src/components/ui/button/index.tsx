import React from "react";

type ButtonVariant = "primary" | "secondary" | "yellow";
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
      className={`button ${variant} ${size} ${
        disabled || isLoading ? "disabled" : ""
      }`}
      disabled={disabled || isLoading}
      style={{ width: width || "auto" }}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
