import clsx from "clsx";
import React from "react";

interface PProps {
  left: string;
  right: string;
  top: string;
  bottom: string;
}
interface IProps {
  text: string;
  children: any;
  className?: string;
  position?: "left" | "right" | "top" | "bottom";
}

const positionStyle: PProps = {
  left: "tooltip-left",
  right: "tooltip-right",
  top: "tooltip-top",
  bottom: "tooltip-bottom",
};

const Tooltip = ({ text, children, className, position = "top" }: IProps) => {
  return (
    <div className="relative group">
      <span className={clsx(positionStyle[position], "tooltip")}>{text}</span>
      {children}
    </div>
  );
};

export default Tooltip;
