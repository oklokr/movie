"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  orientation?: string;
  validate?: boolean;
  width?: string | number;
  labelWidth?: string | number;
  labelAlign?: "left" | "center" | "right";
  light?: boolean;
  children?: React.ReactNode;
}

export default function Input({
  label,
  error,
  orientation = "row",
  validate = false,
  children,
  width,
  labelWidth = "auto",
  labelAlign = "left",
  light = false,
  ...props
}: InputProps) {
  return (
    <div
      className={`input-wrap ${error ? "error" : ""} ${
        orientation === "col" ? "input-wrap--col" : ""
      } ${validate ? "input-wrap--validate" : ""} ${light ? "light" : ""}`}
      style={{ width: width || "auto" }}
    >
      {label && (
        <label style={{ width: labelWidth, textAlign: labelAlign }}>
          {label}
        </label>
      )}
      <div className="input-content">
        <div className="input-item">
          <input {...props} />
          {children}
        </div>
        {error && validate && <p className="msg">{error}</p>}
      </div>
    </div>
  );
}
