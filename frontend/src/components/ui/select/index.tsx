"use client";

import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  label?: string;
  options: Option[];
  error?: string;
  validate?: boolean;
  orientation?: string;
  width?: string | number;
  onChange?: (value: string | number) => void;
  value?: string | number;
  children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  validate = false,
  orientation = "row",
  width,
  onChange,
  value,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    options.find((o) => o.value === value)?.label || ""
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt: Option) => {
    setInputValue(opt.label);
    onChange?.(opt.value);
    setOpen(false);
  };

  return (
    <div
      className={`input-wrap ${error ? "error" : ""} ${
        orientation === "col" ? "input-wrap--col" : ""
      } ${validate ? "input-wrap--validate" : ""}`}
      style={{ width: width || "auto" }}
      ref={ref}
    >
      {label && <label>{label}</label>}
      <div className="input-content">
        <div className="input-item">
          <div className="select">
            <input
              value={inputValue}
              onFocus={() => setOpen(true)}
              readOnly
              {...props}
            />
            <i className={`arrow ${open ? "open" : ""}`}></i>
            {open && (
              <ul className="options">
                {options.map((opt) => (
                  <li key={opt.value} onClick={() => handleSelect(opt)}>
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {children}
        </div>
        {error && validate && <p className="msg">{error}</p>}
      </div>
    </div>
  );
};

export default Select;
