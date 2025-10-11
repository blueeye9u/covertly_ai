import React, { memo } from 'react';
import Image from "next/image";

interface IProps {
  src: any;
  width?: number;
  height?: number;
  className?: string;
  figClassName?: string;
  alt?: string;
  blurEffect?: boolean;
  priority?: boolean;
  fill?: any;
  onLoad?: () => void; // Add this line
}

const ImageComponent = ({
  src,
  width,
  height,
  className,
  figClassName,
  alt,
  blurEffect,
  priority,
  fill,
  onLoad,
  ...rest
}: IProps) => {
  return (
    <figure
        className={`relative leading-0 ${figClassName ?? ""}`}
      >
        <Image
          src={src}
          fill={fill}
          width={width}
          height={height}
          className={className}
          placeholder={blurEffect ? "blur" : "empty"}
          blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
          alt={alt ?? "Image"}
          priority={priority}
          {...rest}
        />
      </figure>
  );
};

export default memo(ImageComponent);