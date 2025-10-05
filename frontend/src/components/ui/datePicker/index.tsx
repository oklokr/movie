"use client";

import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";

interface DatePickerFieldProps {
  type?: "single" | "range";
  label?: string;
  error?: string;
  orientation?: string;
  validate?: boolean;
  width?: string | number;
  value?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange: (date: Date | [Date | null, Date | null] | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  disabled?: boolean;
}

export default function DatePickerField({
  type = "single",
  label,
  error,
  orientation = "row",
  validate,
  width,
  value = null,
  startDate = null,
  endDate = null,
  onChange,
  placeholder = "날짜 선택",
  minDate,
  maxDate,
  className = "",
  disabled = false,
}: DatePickerFieldProps) {
  return (
    <div
      className={`input-wrap ${error ? "error" : ""} ${
        orientation === "col" ? "input-wrap--col" : ""
      } ${validate ? "input-wrap--validate" : ""}`}
      style={{ width: width || "auto" }}
    >
      {label && <label>{label}</label>}
      {type === "single" ? (
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          dateFormatCalendar="yyyy년 MM월"
          selected={value}
          onChange={(date) => onChange(date)}
          placeholderText={placeholder}
          minDate={minDate}
          maxDate={maxDate}
          className={`datepicker-input ${className}`}
          disabled={disabled}
          disabledKeyboardNavigation
          popperPlacement="bottom"
          popperModifiers={{
            /* @ts-expect-error – react-datepicker 타입 불일치 무시 */
            flip: { behavior: ["bottom"] },
            preventOverflow: { enabled: false },
            hide: { enabled: false },
          }}
        />
      ) : (
        <DatePicker
          locale={ko}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(dates) => onChange(dates)}
          dateFormat="yyyy-MM-dd"
          dateFormatCalendar="yyyy년 MM월"
          placeholderText={placeholder}
          minDate={minDate}
          maxDate={maxDate}
          className={`datepicker-input ${className}`}
          disabled={disabled}
          disabledKeyboardNavigation
          popperPlacement="bottom"
          popperModifiers={{
            /* @ts-expect-error – react-datepicker 타입 불일치 무시 */
            flip: { behavior: ["bottom"] },
            preventOverflow: { enabled: false },
            hide: { enabled: false },
          }}
        />
      )}
    </div>
  );
}
