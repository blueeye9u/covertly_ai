export interface BsProps {
  solid: string;
  outline: string;
}
export interface VsProps {
  solid: any;
  outline: any;
}
export interface SsProps {
  sm: string;
  lg: string;
  md: string;
}
export interface Iprops {
  variant?: "solid" | "outline";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  className?: string;
  href?: string;
  children: any;
  loaderClass?: string;
  size?: "sm" | "md" | "lg";
  type?: any;
  onClick?: any;
  disabled?: boolean;
  isLoading?: boolean;
}
