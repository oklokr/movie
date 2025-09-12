"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  orientation?: string;
  validate?: boolean;
  width?: string | number;
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  orientation = "row",
  validate = false,
  children,
  width,
  ...props
}) => {
  return (
    <div
      className={`input-wrap ${error ? "error" : ""} ${
        orientation === "col" ? "input-wrap--col" : ""
      } ${validate ? "input-wrap--validate" : ""}`}
      style={{ width: width || "auto" }}
    >
      {label && <label>{label}</label>}
      <div className="input-content">
        <div className="input-item">
          <input {...props} />
          {children}
        </div>
        {error && validate && <p className="msg">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
