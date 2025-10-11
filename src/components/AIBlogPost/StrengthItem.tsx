import React, { ReactNode } from 'react';

interface StrengthItemProps {
  /**
   * Number or title of the strength
   */
  title: string;
  
  /**
   * Description of the strength
   */
  description: string | ReactNode;
  
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

/**
 * A reusable component for displaying strength items in AI model blog posts
 */
const StrengthItem: React.FC<StrengthItemProps> = ({
  title,
  description,
  titleClassName = "",
  descriptionClassName = "",
}) => {
  return (
    <li className={`fs-24 font-bold dark:text-white mb-8 ${titleClassName}`}>
      {title}
      <div className={`block text-base font-light mt-2 text-blackPearl dark:text-manatee ${descriptionClassName}`}>
        {description}
      </div>
    </li>
  );
};

export default StrengthItem;