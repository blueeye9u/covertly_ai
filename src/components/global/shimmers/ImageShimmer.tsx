import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ImageShimmer = ({
  height,
  width,
  borderRadius,
  forceDimensions = false,
  show = true,
  className,
}: any) => {
  if (!show) return null;
  return (
    <div>
      <SkeletonTheme>
        <Skeleton
          containerClassName={`flex ${className}`}
          className="!h-full !w-full rounded-2xl object-cover"
          height={height}
          width={width}
          inline={true}
          style={{ borderRadius: "12px" }}
        />
      </SkeletonTheme>
    </div>
  );
};

export default ImageShimmer;
