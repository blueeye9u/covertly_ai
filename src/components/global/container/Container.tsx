import clsx from "clsx";
import { SsProps } from "../../../interfaces/Container";

interface Iprops {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  children?: any;
}

const sizeStyles: SsProps = {
  xs: "container-xs",
  sm: "container-sm",
  md: "container-md",
  lg: "container-lg",
  xl: "container-xl",
  xxl: "container-xxl",
};

export function Container({ size = "sm", className, ...props }: Readonly<Iprops>) {
  return <div className={clsx(sizeStyles[size], className)} {...props} />;
}