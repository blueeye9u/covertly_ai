import React, { useMemo } from "react";
import NextImage from "next/image";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "../../../../context/themeContext";
import ConversationImageModal from "./ConversationImageModal";
import { EModels } from '../../../../enums/modals.enum';

const skeletonCount = 3;

const tryLoadImage = (url: string, timeout = 8000): Promise<boolean> =>
  new Promise((resolve) => {
    const img = new Image();

    const done = (ok: boolean) => {
      clearTimeout(timer);
      img.onload = img.onerror = null;
      resolve(ok);
    };

    img.onload = () => done(true);   // downloaded *and* decoded as an image
    img.onerror = () => done(false);  // 404, wrong MIME‑type, network error …

    const timer = setTimeout(() => done(false), timeout);
    img.src = url;
  });

const SourcesSidebar = ({ message, answerHeight }: { message: any, answerHeight?: number }): JSX.Element => {
  const [isWebSearch, setIsWebSearch] = React.useState(false);
  const { citations, showResources } = message;
  const { isDarkMode } = useTheme();
  const [validImages, setValidImages] = React.useState<any[]>([]);

  const updatedShowResources = showResources || message.model === EModels.DEEP_SEARCH;

  const adjustedHeight = useMemo(() => {
    const minHeight = 500; // or something reasonable
    let displayHeight = globalThis.window === undefined ? minHeight : globalThis.window.innerHeight - 180;
    const estimatedGalleryHeight = 150 * validImages.length + 8 * (validImages.length - 1) + 16 * 2 + 4;
    if(!updatedShowResources && validImages.length > 0)
      displayHeight = estimatedGalleryHeight;
    return answerHeight && answerHeight < displayHeight ? answerHeight : displayHeight;
  }, [answerHeight, validImages, updatedShowResources]);

  React.useEffect(() => {
    if (!isWebSearch) {
      const shouldSetWebSearch =
        (message.chatEvent === "Searching the web..." && !isWebSearch) ||
        !!message.citations?.results;

      setIsWebSearch(shouldSetWebSearch);
    }
  }, [message.chatEvent, message.citations, isWebSearch]);

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  React.useEffect(() => {
    const filterAndValidateImages = async () => {
      const filtered = await Promise.all(
        (citations?.images ?? []).map(async (c: any) => {
          try {
            // Check if the URL is valid and not an IP address
            const isValidUrl = !/^https?:\/\/(\d{1,3}\.){3}\d{1,3}(\/|$)/i.test(c.url);
            if (!isValidUrl) return false;

            // Check if the URL is an image URL
            const isImageUrl = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(c.url);
            if (!isImageUrl) return false;

            const ok = await tryLoadImage(c.url);
            return ok ? c : false;
          } catch {
            return false;
          }
        })
      );
      setValidImages(filtered.filter(Boolean));
    };
    filterAndValidateImages();
  }, [citations?.images]);

  // Check if there's actual content to display
  const hasValidImages = validImages.length > 0;
  const hasValidSources = citations?.results?.length > 0;
  const hasContent = hasValidImages || hasValidSources;
  
  if (!isWebSearch || !hasContent) return <></>;

  return (
    <div className="relative top-0 overflow-hidden rounded-2xl border border-linkWater dark:border-blackPearl md:sticky w-full xl:w-[305px] shrink-0"
      style={{ height: adjustedHeight }}
    >
      <GalleryView
        showResources={updatedShowResources}
        validImages={validImages}
        isDarkMode={isDarkMode}
      />
      <SourcesView
        showResources={updatedShowResources}
        citations={citations}
        isDarkMode={isDarkMode}
        openInNewTab={openInNewTab}
      />
    </div>
  );
};

// Extracted component for the gallery view
const GalleryView = ({ showResources, validImages, isDarkMode }: {
  showResources: boolean;
  validImages: any;
  isDarkMode: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const openModalAt = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className={`absolute left-0 top-0 flex h-full w-full transform flex-col transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${showResources
        ? "pointer-events-none scale-95 opacity-0"
        : "scale-100 opacity-100"
        }`}
    >
      <div className="themeScrollbar h-full grid grid-cols-12 gap-2 overflow-auto p-4">
        {validImages.length ? (
          validImages.map((img: { url: any; }, index: number) => (
            <GalleryImage key={img.url} image={img} onClick={() => openModalAt(index)} />
          ))
        ) : (
          <ImageSkeletons isDarkMode={isDarkMode} />
        )}
      </div>

      {isModalOpen && (
        <ConversationImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={validImages[currentIndex]?.url}
          imageName={validImages[currentIndex]?.url?.split("/")?.pop() || "image"}
        />
      )}
    </div>
  );
};

// Extracted component for image skeletons
const ImageSkeletons = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const renderSkeleton = (key: number) => (
    <div key={key} className="relative h-full col-span-12">
      <SkeletonTheme
        baseColor={isDarkMode ? '#2b2b2b' : '#e0e0e0'}
        highlightColor={isDarkMode ? '#3c3c3c' : '#f5f5f5'}
      >
        <Skeleton className="h-full w-full" />
      </SkeletonTheme>
    </div>
  );

  const skeletons = [];
  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(renderSkeleton(i));
  }

  return <>{skeletons}</>;
};

// Extracted component for a single gallery image
const GalleryImage = ({ image, onClick }: { image: any; onClick: () => void; }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full h-full min-h-[150px] max-h-[200px] cursor-pointer rounded-md col-span-12`}
  >
    <figure className="w-full h-full cursor-pointer rounded-md">
      <figure className="w-full h-full relative">
        <NextImage unoptimized
          src={image?.url}
          alt="web-source"
          layout="fill"
          className="w-full h-full rounded-md object-cover"
        />
      </figure>
    </figure>
  </button>
);

// Extracted component for the sources view
const SourcesView = ({ showResources, citations, isDarkMode, openInNewTab }: {
  showResources: boolean;
  citations: any;
  isDarkMode: boolean;
  openInNewTab: (url: string) => void;
}) => (
  <div
    className={`absolute left-0 top-0 flex h-full w-full transform flex-col transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${showResources
      ? "scale-100 opacity-100"
      : "pointer-events-none scale-95 opacity-0"
      }`}
  >
    <div className="themeScrollbar h-full flex flex-col space-y-3 overflow-auto p-4">
      {citations?.results ? (
        citations.results.map((c: any) => (
          <SourceItem
            key={c.url}
            source={c}
            openInNewTab={openInNewTab}
          />
        ))
      ) : (
        <SourceSkeletons isDarkMode={isDarkMode} />
      )}
    </div>
  </div>
);

// Extracted component for source skeletons
const SourceSkeletons = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const renderSkeleton = () => {
    const subSkeleton = (key: number) => (
      <Skeleton key={key} height={5} />
    )

    const subSkeletons = [];

    for (let i = 0; i < skeletonCount + 1; i++) {
      subSkeletons.push(subSkeleton(i));
    }
    return (
      <div key={uuidv4()} className="mb-5 h-[150px] w-full rounded-md bg-[#f5f5f5] p-3 dark:bg-[#3c3c3c]">
        <div className="rt-skeletonsection-sources relative mb-2">
          <Skeleton className="h-1 w-full" height={5} />
        </div>
        <div className="rt-skeletonsection-sources relative mb-2">
          <Skeleton className="h-1 w-3/4" height={5} />
        </div>
        <div className="relative flex items-center">
          <div className="rt-skeletonsection-sources relative flex-shrink-0">
            <Skeleton circle={true} width={30} height={30} />
          </div>
          <div className="relative ml-3 h-1 w-full">
            {subSkeletons}
          </div>
        </div>
      </div>
    )
  };

  const skeletons = [];
  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(renderSkeleton());
  }

  return (
    <div>
      <SkeletonTheme
        baseColor={isDarkMode ? '#2b2b2b' : '#e0e0e0'}
        highlightColor={isDarkMode ? '#3c3c3c' : '#f5f5f5'}
      >
        {skeletons}
      </SkeletonTheme>
    </div>
  );
};

// Extracted component for a single source item
const SourceItem = ({ source, openInNewTab }: { source: any; openInNewTab: (url: string) => void }) => (
  <button
    onClick={() => openInNewTab(source.url)}
    className="w-full rounded-md bg-whiteSmoke p-3 dark:bg-blackRussian2 cursor-pointer"
  >
    <p className="display-webkit-box !mb-3 !line-clamp-2 text-xs dark:text-white">
      {source?.title}
    </p>
    <div className="flex items-start gap-2">
      <span className="text-xs text-greyChateau word-break">
        {_.truncate(source.content, { length: 200 })}
      </span>
    </div>
  </button>
);

export default SourcesSidebar;