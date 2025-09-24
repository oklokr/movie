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
  searchable?: boolean;
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
  searchable = false,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState<Option | null>(
    options.find((option) => option.value === value) || null
  );
  const [filter, setFilter] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        if (searchable) {
          setFilter("");
          setTyping(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchable]);

  useEffect(() => {
    const selectValue =
      options.find((option) => option.value === value) || null;
    setSelectedValue(selectValue);
    setFilter("");
    setTyping(false);
  }, [value, options]);

  const handleSelect = (option: Option) => {
    setSelectedValue(option);
    setFilter("");
    setTyping(false);
    onChange?.(option.value);
    setOpen(false);
  };

  const optionItems = searchable
    ? options.filter((option) => option.label.includes(filter))
    : options;

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
              value={
                searchable
                  ? typing
                    ? filter
                    : selectedValue?.label || ""
                  : selectedValue?.label || ""
              }
              onChange={(e) => {
                if (searchable) {
                  setFilter(e.target.value);
                  setTyping(true);
                }
              }}
              onFocus={() => setOpen(true)}
              readOnly={!searchable}
              {...props}
            />
            <i className={`arrow ${open ? "open" : ""}`}></i>
            {open && (
              <ul className="options">
                {optionItems.map((option) => (
                  <li key={option.value} onClick={() => handleSelect(option)}>
                    {option.label}
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
