import { useState } from "react";
import Image from "next/image";
import ImageShimmer from "../shimmers/ImageShimmer";
interface IProps {
  src: any;
  alt: any;
  width: number;
  height: number;
  className: string;
  figClassName?: string;
  blurEffect?: boolean;
  priority?: boolean;
  fill?: any;
  borderRadius?: string;
  
}

const ShimmerImage = ({ alt, ...rest }: IProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <ImageShimmer
        show={!imageLoaded}
        className={rest.className}
        height={rest.height}
        borderRadius={rest.borderRadius}
        width={rest.width}
      />
      <Image
        {...rest}
        onLoadingComplete={() => setImageLoaded(true)}
        // onError={() => setImageLoaded(true)}
        className={`overflow-hidden duration-[0.3s] ease-in-out transition-all
          ${imageLoaded ? "blur-0 grayscale-0" : "blur-xl grayscale"} ${
          rest.className
        }`}
        style={{
          visibility: imageLoaded ? "visible" : "hidden",
          position: imageLoaded ? "relative" : "absolute",
        }}
        alt={alt}
      />
    </>
  );
};

export default ShimmerImage;
