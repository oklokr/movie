"use client";

interface Option {
  label: string;
  value: string;
}

interface CheckBoxGroupProps {
  label: string;
  error?: string;
  orientation?: "row" | "col";
  validate?: boolean;
  width?: string | number;
  options: Option[];
  value: string[];
  onChange: (selected: string[]) => void;
}

export default function CheckboxGroup({
  label,
  error,
  orientation = "row",
  validate = false,
  width,
  options,
  value,
  onChange,
}: CheckBoxGroupProps) {
  const handleChange = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div
      className={`input-wrap ${error ? "error" : ""} ${
        orientation === "col" ? "input-wrap--col" : ""
      } ${validate ? "input-wrap--validate" : ""}`}
      style={{ width: width || "auto" }}
    >
      {label && <label>{label}</label>}
      <div className="input-content checkbox-group">
        <div className="input-item">
          {options?.map((option) => (
            <label key={option.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleChange(option.value)}
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
