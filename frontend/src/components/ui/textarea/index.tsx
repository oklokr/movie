interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  orientation?: "row" | "col";
  validate?: boolean;
  width?: string | number;
  children?: React.ReactNode;
}

export default function Textarea({
  label,
  error,
  orientation = "row",
  validate = false,
  children,
  width,
  ...props
}: TextAreaProps) {
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
          <textarea {...props} />
          {children}
        </div>
        {error && validate && <p className="msg">{error}</p>}
      </div>
    </div>
  );
}
