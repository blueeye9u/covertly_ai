import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableShimmer = () => {
  return (
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#ffffff">
        <div className="rounded-2xl border flex justify-between items-center p-2 lg:p-3">
          <div className="flex items-center gap-6">
            <figure className="h-12 w-12 shrink-0 overflow-hidden rounded-lg lg:h-24 lg:w-24">
              <Skeleton
                  containerClassName="flex w-full"
                  className="h-full w-full object-cover"
                  height={96}
                  width={96}
                  inline={true}
                  borderRadius="0.5rem"
              />
            </figure>
            <div className="flex w-60 flex-col gap-2.5 truncate">
              <h3 className="fs-20 w-full truncate font-bold leading-6 text-martinique">
                <Skeleton
                    containerClassName="!w-full"
                    className="fs-20 w-full truncate font-bold leading-6 text-martinique"
                    height={24}
                    width={240}
                    borderRadius="98px"
                />
              </h3>
              <p className="fs-16 w-full truncate leading-4 text-dolphin">
                <Skeleton
                    containerClassName="!w-full"
                    className="fs-16 w-full truncate leading-4 text-dolphin"
                    height={20}
                    width={240}
                    borderRadius="98px"
                />
              </p>
            </div>
          </div>
          <div className="w-80">
            <p className="line-clamp-2 text-sm leading-5 text-scarpaflow">
              <Skeleton
                  containerClassName="!w-full"
                  className="line-clamp-2 text-sm leading-5 text-scarpaflow"
                  height={40}
                  width={240}
                  borderRadius="98px"
              />
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Skeleton
                containerClassName="!w-full"
                className="line-clamp-2 text-sm leading-5 text-scarpaflow"
                height={36}
                width={92}
                borderRadius="98px"
            />
            <Skeleton
                containerClassName="!w-full"
                className="line-clamp-2 text-sm leading-5 text-scarpaflow"
                height={24}
                width={24}
                borderRadius="6px"
            />
          </div>
          <p className="text-base leading-5 text-dolphin">
            <Skeleton
                containerClassName="!w-full"
                className="line-clamp-2 text-sm leading-5 text-scarpaflow"
                height={30}
                width={120}
                borderRadius="98px"
            />
          </p>
          <p className="text-base leading-5 text-dolphin">
            <Skeleton
                containerClassName="!w-full"
                className="line-clamp-2 text-sm leading-5 text-scarpaflow"
                height={30}
                width={120}
                borderRadius="98px"
            />
          </p>
          <p className="text-base leading-5 text-dolphin">
            <Skeleton
                containerClassName="!w-full"
                className="line-clamp-2 text-sm leading-5 text-scarpaflow"
                height={30}
                width={120}
                borderRadius="98px"
            />
          </p>
          <div className="">
            <Skeleton
                containerClassName="!w-full"
                className="line-clamp-2 text-sm leading-5 text-scarpaflow"
                height={32}
                width={24}
                borderRadius="4px"
            />
          </div>
        </div>
      </SkeletonTheme>
  );
};

export default TableShimmer;
