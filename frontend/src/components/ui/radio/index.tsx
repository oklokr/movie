"use client";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label?: string;
  error?: string;
  orientation?: "row" | "col";
  validate?: boolean;
  width?: string | number;
  options: Option[];
  value: string;
  onChange: (selected: string) => void;
}

export default function RadioGroup({
  label,
  error,
  orientation = "row",
  validate = false,
  width,
  options,
  value,
  onChange,
}: RadioGroupProps) {
  return (
    <div
      className={`input-wrap ${error ? "error" : ""} ${
        orientation === "col" ? "input-wrap--col" : ""
      } ${validate ? "input-wrap--validate" : ""}`}
      style={{ width: width || "auto" }}
    >
      {label && <label>{label}</label>}
      <div className="input-content radio-group">
        <div className="input-item">
          {options &&
            options?.map((option) => (
              <label key={option.value} style={{ marginRight: 14 }}>
                <input
                  type="radio"
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
        </div>
        {error && validate && <p className="msg">{error}</p>}
      </div>
    </div>
  );
}
