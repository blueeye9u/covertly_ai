import React, { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  figureContentClassName?: string;
  titleContentClassName?: string;
  isMobile?: boolean;
}

/**
 * A reusable feature card component used across the application
 */
const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  children,
  className = "",
  figureContentClassName = "",
  titleContentClassName = "",
  isMobile = false,
}) => {
  const baseClasses = "border border-atlantis rounded-3xl bg-darkShadow dark:bg-darkBackground flex flex-col";
  const padding = isMobile ? "p-4 py-8" : "p-8";
  const classes = `${baseClasses} ${padding} ${className}`;

  return (
    <div className={classes}>
      <div className={`grow ${figureContentClassName}`}>
        {children}
      </div>
      <h6 className={`mb-2 fs-24 font-semibold ${titleContentClassName}`}>{title}</h6>
      <p className="line-clamp-2 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;