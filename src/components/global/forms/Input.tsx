import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { clsx } from "clsx";
import { ErrorMessage, FormikProps } from "formik";
import { Label } from "./Label";

interface SsProps {
  sm: string;
  lg: string;
  md: string;
}

interface Iprops {
  placeholder: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: string;
  spanClass?: string;
  name: string;
  rest?: any;
  register?: any;
  value?: any;
  onChange?: Function;
  onInput?: Function;
  max?: any;
  min?: any;
  step?: any;
  prefix?: any;
  pattern?: any;
  title?: string;
  disabled?: boolean;
  error?: any;
  autoFocus?: boolean;
  onBlur?: any;
  label?: any;
  formik?: FormikProps<any>;
  hideErrors?: boolean;
  onKeyDown?: any;
}

const sizeStyles: SsProps = {
  sm: "form-control-sm",
  md: "form-control-md",
  lg: "form-control-lg",
};

const Input = ({
  placeholder,
  size = "sm",
  className,
  value,
  onChange,
  onInput,
  type,
  register,
  max,
  min,
  step,
  pattern,
  title,
  disabled,
  error,
  autoFocus,
  onBlur,
  label,
  formik,
  hideErrors,
  name,
  ...rest
}: Iprops) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Get error message from formik or error prop
  const getErrorMessage = () => {
    if (!hideErrors && formik?.touched?.[name] && formik?.errors?.[name]) {
      return formik.errors[name]?.toString() ?? "";
    }
    return null;
  };

  const errorMessage = getErrorMessage();
  const hasError = errorMessage !== null;

  // Check if user is currently editing (input has focus or has been modified)
  const isEditing = formik?.values?.[name] && formik?.values?.[name] !== '';

  // Show error only if there's an error AND user is not currently editing
  const shouldShowError = hasError && isEditing;

  return (
    <div className="relative w-full">
      {type === "password" && (
        // div into button
        <button className="password__eye" onClick={handleTogglePassword}>
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      )}

      <input
        id="floating_outlined"
        min={min}
        max={max}
        name={name}
        title={title}
        onBlur={formik?.handleBlur}
        pattern={pattern}
        value={formik ? formik.values[name] : value}
        // step={step && step}
        step={step}
        disabled={disabled}
        onChange={formik ? formik?.handleChange : onChange}
        onInput={onInput}
        autoComplete="false"
        placeholder=""
        type={showPassword ? type : "text"}
        {...(register !== undefined && { ...register(name) })}
        className={clsx(className, sizeStyles[size], "form-control peer", shouldShowError && "border-red-500")}
        {...rest}
      />

      <Label className={shouldShowError ? "text-red-600" : ""}>
        {shouldShowError ? errorMessage : label}
      </Label>

      {error && (
        <ErrorMessage
          className="form-label floating-label text-red-600"
          component={"label"}
          name={error}
        />
      )}
    </div>
  );
};

export default Input;
