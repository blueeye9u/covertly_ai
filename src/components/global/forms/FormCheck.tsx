import React from "react";
import clsx from "clsx";

interface Iprops {
  label: string;
  className?: any;
  type?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange?: (isChecked: boolean) => void;
  checked?: boolean;
}

const FormCheck = ({
  label,
  className,
  type,
  disabled,
  id,
  name,
  checked,
  onChange,
}: Iprops) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };
  return (
    <div className={clsx(className, "form-check")}>
      <input
        checked={checked}
        type={type ?? "checkbox"}
        className={clsx(
          type == "radio" && "form-radio-input",
          "form-check-input"
        )}
        name={name}
        id={`${id}`}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={`${id}`} className="form-check-label">
        {label}
      </label>
    </div>
  );
};

export default FormCheck;
