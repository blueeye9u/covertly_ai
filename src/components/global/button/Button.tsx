import clsx from "clsx";
import { ImSpinner9 } from "react-icons/im";
import { BsProps, Iprops, SsProps, VsProps } from "../../../interfaces/Button";

const baseStyles: BsProps = {
  solid: "btn",
  outline: "btn-outline",
};

const variantStyles: VsProps = {
  solid: {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
  },
  outline: {
    primary: "btn-outline-primary",
    secondary: "btn-outline-secondary",
    success: "btn-outline-success",
    danger: "btn-outline-danger",
    warning: "btn-outline-warning",
    info: "btn-outline-info",
    light: "btn-outline-light",
    dark: "btn-outline-dark",
  },
};

const sizeStyles: SsProps = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

export function Button({
  variant = "solid",
  color = "primary",
  size = "md",
  className,
  href,
  type,
  disabled,
  isLoading,
  children,
  loaderClass,
  ...props
}: Readonly<Iprops>) {
  return (
    <button
      className={clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        sizeStyles[size],
        className
      )}
      type={type ?? "button"}
      // disabled={disabled ? true : false}
      disabled={disabled}
      {...props}
    >
      {isLoading ? (
        <ImSpinner9 className={clsx("animate-spin text-2xl", loaderClass)} />
      ) : 
        children
      }
    </button>
  );
}