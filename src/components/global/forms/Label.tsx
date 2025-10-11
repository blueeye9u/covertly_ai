import clsx from "clsx";
import React from "react";

interface IProps {
  children: any;
  className?: string;
}

export function Label({ children, className }: Readonly<IProps>) {
  return <label htmlFor={children} className={clsx(className, "form-label floating-label")}>{children}</label>;
}
