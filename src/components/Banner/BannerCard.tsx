import React, { ReactNode } from 'react';
import Image from 'next/image';

interface BannerCardProps {
  /**
   * Title text for the card
   */
  title: string;
  
  /**
   * Description text for the card
   */
  description: string;
  
  /**
   * Image source URL (relative or absolute)
   */
  imageSrc?: string;
  
  /**
   * Width of the image
   * @default 440
   */
  imageWidth?: number;
  
  /**
   * Height of the image
   * @default 203
   */
  imageHeight?: number;
  
  /**
   * Alt text for the image
   * @default ""
   */
  imageAlt?: string;
  
  /**
   * Optional custom component to render instead of an image
   */
  customComponent?: ReactNode;
  
  /**
   * Additional CSS classes for the card
   */
  className?: string;
  
  /**
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  
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
 * A reusable card component used in banner sections across the application
 */
const BannerCard: React.FC<BannerCardProps> = ({
  title,
  description,
  imageSrc,
  imageWidth = 440,
  imageHeight = 203,
  imageAlt = "",
  customComponent,
  className = "",
  imageContainerClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}) => {
  return (
    <div className={`border border-[#384B60] rounded-3xl p-8 px-6 flex flex-col ${className}`}>
      <div className={`mb-10 flex justify-center grow ${imageContainerClassName}`}>
        {customComponent ?? (
            imageSrc && (
                <figure className="flex justify-center grow">
                  <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={imageWidth}
                      height={imageHeight}
                  />
                </figure>
            )
        )}
      </div>
      
      <h5 className={`fs-24 font-semibold mb-3 ${titleClassName}`}>{title}</h5>
      <p className={`text-linkWater50 ${descriptionClassName}`}>{description}</p>
    </div>
  );
};

export default BannerCard;