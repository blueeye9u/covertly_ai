import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../global/button/Button';
import { RightArrow } from '../../svgs/svg';
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../constants/routes';

interface BannerProps {
  /**
   * Main heading text
   */
  title: string;
  
  /**
   * Secondary text to display below the title
   */
  description?: string;
  
  /**
   * Optional subtitle or tag line to display above the title
   */
  subtitle?: string;
  
  /**
   * Text to display on the CTA button
   * @default "Get Started"
   */
  buttonText?: string;
  
  /**
   * Link for the CTA button
   * If not provided, will use default routes based on login status
   */
  buttonLink?: string;
  
  /**
   * Whether to show a button
   * @default true
   */
  showButton?: boolean;
  
  /**
   * Button variant/color
   * @default "primary"
   */
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * Additional CSS classes for the button
   */
  buttonClassName?: string;
  
  /**
   * Main image source URL
   */
  imageSrc?: string;
  
  /**
   * Width of the main image
   * @default 1220
   */
  imageWidth?: number;
  
  /**
   * Height of the main image
   * @default 660
   */
  imageHeight?: number;
  
  /**
   * Alt text for the main image
   * @default ""
   */
  imageAlt?: string;
  
  /**
   * Optional custom component to render as the main content
   */
  customComponent?: ReactNode;
  
  /**
   * Children to render in the cards section
   */
  children?: ReactNode;
  
  /**
   * Whether to use a grid layout for children
   * @default false
   */
  useGrid?: boolean;
  
  /**
   * Grid CSS classes
   * @default "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
   */
  gridClassName?: string;
  
  /**
   * Container CSS classes
   */
  containerClassName?: string;
  
  /**
   * Header section CSS classes
   */
  headerClassName?: string;
  
  /**
   * Title CSS classes
   */
  titleClassName?: string;
  
  /**
   * Description CSS classes
   */
  descriptionClassName?: string;
  
  /**
   * Content section CSS classes
   */
  contentClassName?: string;
  
  /**
   * Background CSS classes
   */
  backgroundClassName?: string;
  
  /**
   * Whether to show the right arrow icon in the button
   * @default true
   */
  showArrow?: boolean;
  
  /**
   * On click handler for the button
   */
  onButtonClick?: () => void;
}

/**
 * A reusable banner component that provides a consistent UI for banner sections
 * across the application. Supports various layouts, content types, and styling options.
 */
const Banner: React.FC<BannerProps> = ({
  title,
  description,
  subtitle,
  buttonText = "Get Started",
  buttonLink,
  showButton = true,
  buttonVariant = 'primary',
  buttonClassName = "btn rounded-full !min-w-auto !flex-none",
  imageSrc,
  imageWidth = 1220,
  imageHeight = 660,
  imageAlt = "",
  customComponent,
  children,
  useGrid = false,
  gridClassName = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
  containerClassName = "container-landingpage py-10 md:py-20 lg:py-[110px]",
  headerClassName = "flex flex-col justify-center items-center mb-16",
  titleClassName = "fs-64 text-center leading-tight mb-6",
  descriptionClassName = "text-center dark:text-[#FFFFFF] mb-8",
  contentClassName = "",
  backgroundClassName = "",
  showArrow = true,
  onButtonClick,
}) => {
  const [isLoggedIn] = useLoggedInStatus();
  
  // Determine the button link based on login status if not explicitly provided
  const getButtonLink = () => {
    if (buttonLink) return buttonLink;
    return isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string;
  };
  
  return (
    <div className={`${containerClassName} ${backgroundClassName}`}>
      {/* Header Section */}
      <div className={headerClassName}>
        {subtitle && (
          <p className="text-lg text-center text-[#30C5D2] mb-4">{subtitle}</p>
        )}
        
        <h3 className={titleClassName}>{title}</h3>
        
        {description && (
          <p className={descriptionClassName}>{description}</p>
        )}
        
        {showButton && (
          <Link href={getButtonLink()}>
            <Button 
              size="lg" 
              color={buttonVariant === 'secondary' ? 'secondary' : undefined}
              variant={buttonVariant === 'outline' ? 'outline' : undefined}
              className={buttonClassName}
              onClick={onButtonClick}
            >
              {buttonText}
              {showArrow && (
                <span className="rotate-180">
                  <RightArrow />
                </span>
              )}
            </Button>
          </Link>
        )}
      </div>
      
      {/* Content Section */}
      <div className={contentClassName}>
        {customComponent}
        
        {imageSrc && (
          <figure>
            <Image 
              src={imageSrc} 
              width={imageWidth} 
              height={imageHeight} 
              alt={imageAlt} 
              className="w-full" 
            />
          </figure>
        )}
        
        {children && useGrid ? (
          <div className={gridClassName}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Banner;