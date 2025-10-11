import React from "react";
import ReactDOM from "react-dom";

interface TooltipPortalProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ children, style, className }) => {
  if (globalThis.window === undefined) return null;
  const el = document.body;
  return ReactDOM.createPortal(
    <div style={style} className={className}>
      {children}
    </div>,
    el
  );
};

export default TooltipPortal;
