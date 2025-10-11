import React, { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import NiceModal from "@ebay/nice-modal-react";
import DatePicker from "react-datepicker";
import { FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import toast from "react-hot-toast";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../components/global/button/Button";
import ImageGenerationHeader from "../../components/ImageGenerationHeader";
import { imageGenerationService } from "../../services/image-generate";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { AddArrowIcon, DateIcon } from "../../svgs/svg";
import { useTheme } from "../../context/themeContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ImageComponent from "../../components/global/imageComponent/ImageComponent";
import { images } from "../../assets/images";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import CommonTooltip from "../../components/ComonTooltip";
import useLoggedInUser from '../../hooks/useLoggedInUser';

const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);
const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);

const formatDateForQuery = (value: any): string | undefined => {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getBaseUrlWithoutQueryParams = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
  } catch (error) {
    console.warn("Invalid URL provided:", url, error);
    // If URL parsing fails, return the original URL (fallback)
    return url.split('?')[0];
  }
};

const ImageLibrary = () => {
  const [,,userAvatar] = useLoggedInUser();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateError, setDateError] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set()); // stores "recordId|imageUrl" combinations
  const { isDarkMode } = useTheme();
  const [availableDatesByMonth, setAvailableDatesByMonth] = useState<Map<string, Set<string>>>(new Map());
  const monthKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const addMonths = (date: Date, n: number) => new Date(date.getFullYear(), date.getMonth() + n, 1);

  const {
    imageGenerationLibrary,
    setImageGenerationLibrary,
    imageGeneration,
    setImageGeneration,
  } = useImageGeneration();

  const { records, paginationInfo, isLibraryLoading, filter } = imageGenerationLibrary;

  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);
  const masonryContainerRef = useRef<HTMLDivElement | null>(null);
  const [removeGeneratedImg, setRemoveGeneratedImg] = useState(false);

  // Fetch images
  const getAllImages = async (page: number, createdAt?: any) => {
    try {
      updateLibraryLoadingState(true, createdAt);
      if (!paginationInfo.perPage) return;
      const response: any = await fetchGeneratedImages(page, createdAt);
      handleResponse(response, page);
    } catch (error) {
      console.error("Failed to fetch generated images:", error);
      handleError();
    }
  };

  const updateLibraryLoadingState = (isLoading: boolean, createdAt?: any) => {
    setImageGenerationLibrary((prev: any) => ({
      ...prev,
      filter: {
        createdAt,
      },
      isLibraryLoading: isLoading,
      error: "",
    }));
  };

  const fetchGeneratedImages = async (page: number, createdAt?: any) => {
    return await imageGenerationService.getAllGeneratedImages({
      page,
      limit: paginationInfo.perPage,
      createdAt: formatDateForQuery(createdAt),
    });
  };

  const handleResponse = (response: any, page: number) => {
    if (response?.payload?.records) {
      setImageGenerationLibrary((prev: any) => ({
        ...prev,
        ...response.payload,
        records: page === 1 ? response.payload.records : [...prev.records, ...response.payload.records],
        isLibraryLoading: false,
        error: "",
      }));
    }
  };

  const handleError = () => {
    setImageGenerationLibrary((prev: any) => ({
      ...prev,
      isLibraryLoading: false,
      error: "Something went wrong.",
    }));
  };

  const getFilterImages = async (createdAt: any) => {
    if (masonryContainerRef.current) {
      masonryContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsDatePickerOpen(false);
    setDateError("");
    await getAllImages(1, createdAt);
  };

  const minSelectableDate = new Date("2025-01-01");
  const maxSelectableDate = new Date();

  const formatDisplayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  const validateDateInput = (rawValue: string) => {
    if (!rawValue || rawValue.trim() === "") {
      setDateError("");
      return;
    }
    const parsed = new Date(rawValue);
    if (Number.isNaN(parsed.getTime())) {
      setDateError("Enter a valid date, e.g., 01/15/2025.");
      return;
    }
    if (parsed < minSelectableDate || parsed > maxSelectableDate) {
      setDateError(
        `Pick a date between ${formatDisplayDate(minSelectableDate)} and ${formatDisplayDate(maxSelectableDate)}.`
      );
      return;
    }
    setDateError("");
  };

  const isValidDateString = (rawValue: string): boolean => {
    if (!rawValue) return false;
    const value = rawValue.trim();
    const mmddyyyy = /^(0\d|1[0-2])\/(0\d|[12]\d|3[01])\/\d{4}$/;
    if (!mmddyyyy.test(value)) return false;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return false;
    if (parsed < minSelectableDate || parsed > maxSelectableDate) return false;
    return true;
  };

  const handleDateRawChange = async (e: any) => {
    const value = e?.target?.value ?? "";
    validateDateInput(value);

    if (value.trim() === "") {
      await getFilterImages(null);
      return;
    }

    if (isValidDateString(value)) {
      const parsed = new Date(value);
      const current = imageGenerationLibrary.filter?.createdAt
          ? new Date(imageGenerationLibrary.filter.createdAt)
          : undefined;
      if (!current || current.getTime() !== parsed.getTime()) {
        await getFilterImages(parsed);
      }
    }
  };

  const loadAvailableDatesForMonth = useCallback(async (baseDateInput: Date | number) => {
    try {
      const baseDate = (typeof baseDateInput === 'number') ? new Date(baseDateInput) : baseDateInput;
      const res = await imageGenerationService.getAvailableDatesByMonth(baseDate.getTime());
      const dates: string[] = res?.payload?.dates || [];
      setAvailableDatesByMonth(prev => {
        const next = new Map(prev);
        next.set(monthKey(baseDate), new Set(dates));
        return next;
      });
    } catch (error) {
      console.error("Failed to load available dates for month:", error);
    }
  }, []);

  const loadMonthAndNeighbors = useCallback(async (baseDateInput: Date | number) => {
    const base = (typeof baseDateInput === 'number') ? new Date(baseDateInput) : baseDateInput;
    const prev = addMonths(base, -1);
    const next = addMonths(base, 1);
    await Promise.all([
      loadAvailableDatesForMonth(base),
      loadAvailableDatesForMonth(prev),
      loadAvailableDatesForMonth(next),
    ]);
  }, [loadAvailableDatesForMonth]);

  useEffect(() => {
    if (removeGeneratedImg) {
      // Refresh the library
      getAllImages(1, filter?.createdAt).then(_ => {
        setSelectedImages(new Set());
        setRemoveGeneratedImg(false);
      });
    }
  }, [removeGeneratedImg]);

  useEffect(() => {
    return () => {
      setImageGenerationLibrary({
        records: [],
        paginationInfo: {
          currentPage: 0,
          perPage: 10,
          pages: 1,
          totalRecords: 0,
        },
        isLibraryLoading: true,
        filter: {
          createdAt: null,
        },
        error: "",
      });
      setImageGeneration({
        _id: "",
        model: Image_Generation_Model_Data[0].key || "",
        prompt: "",
        size: Image_Generation_Model_Data[0].size ? Image_Generation_Model_Data[0].size[0] : "",
        style: Image_Generation_Model_Data[0].style?.[0] ?? "",
        negativePrompt: "",
        count: Image_Generation_Model_Data[0].count ? Image_Generation_Model_Data[0].count[0] : 1,
        imageUrls: [],
        isImageGenerating: false,
        error: "",
      });
    }
  }, []);

  useEffect(() => {
    loadMonthAndNeighbors(new Date());
  }, [loadMonthAndNeighbors]);

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          paginationInfo.currentPage < paginationInfo.pages
        ) {
          getAllImages(paginationInfo.currentPage + 1, imageGenerationLibrary.filter?.createdAt);
        }
      });
      if (node) observer.current.observe(node);
    },
    [paginationInfo.currentPage, paginationInfo.pages]
  );

  const generatedImage = (record: any, selectedIndex: number) => {
    setImageGeneration({
      ...imageGeneration,
      _id: record._id,
      prompt: record.prompt || "",
      model: record.model || imageGeneration.model,
      size: record.size || imageGeneration.size,
      style: record.style || imageGeneration.style,
      negativePrompt: record.negativePrompt || "",
      count: record.count || imageGeneration.count,
      imageUrls: record.imageUrls || [],
    });
    
    // Also show the modal for viewing the image
    NiceModal.show("GeneratedImageModal", { record, selectedIndex, setRemoveGeneratedImg });
  };

  const renderEmptyLibrary = () => (
    <div className="flex grow flex-col items-center justify-center px-6 lg:px-12">
      <Image
        src={"/assets/images/empty-library.svg"}
        alt={"empty placeholder"}
        height={192}
        width={192}
      />
      <h5 className="fs-24 mb-2 dark:text-white">
        Your Image Library Awaits
      </h5>
      <p className="w-[328px] text-center text-sm dark:text-[#A5A6A9]">
        Start building your collection! Generate stunning images or upload
        your own to bring this space to life.
      </p>
      <Link href="/image-generate" className="mt-4 inline-block rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors">
        Go to Image Generation
      </Link>
    </div>
  );

  const renderNoResultsForDate = () => (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={"/assets/images/empty-library.svg"}
        alt={"empty placeholder"}
        height={192}
        width={192}
      />
      <h5 className="fs-20 mb-2 dark:text-white mt-3">No Images were Generated on this Date</h5>
    </div>
  );

  const handleYearChange = (dateOrYear: Date | number) => {
    if (typeof dateOrYear === 'number') {
      const current = filter?.createdAt || new Date();
      const d = new Date(current);
      d.setFullYear(dateOrYear);
      loadMonthAndNeighbors(d);
    } else {
      loadMonthAndNeighbors(dateOrYear);
    }
  };

  const handleDateFilter = (date: Date) => {
    const key = formatDateForQuery(date);
    const mKey = monthKey(date);
    const setForMonth = availableDatesByMonth.get(mKey);
    if (!setForMonth) return false;
    return key ? setForMonth.has(key) : false;
  };

  const getRandomHeight = () => Math.floor(Math.random() * (600 - 200 + 1)) + 300;

  const handleImageSelect = (recordId: string, imageUrl: string) => {
    const baseUrl = getBaseUrlWithoutQueryParams(imageUrl);
    const imageKey = `${recordId}|${baseUrl}`;
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageKey)) {
        newSet.delete(imageKey);
      } else {
        newSet.add(imageKey);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.size === 0) return;
    
    NiceModal.show("imageDeleteModal", {
      onConfirm: async () => {
        try {
          // Convert selected image keys back to recordId + imageUrl pairs
          // Note: imageUrl is already the base URL without query params from selection
          const items = Array.from(selectedImages).map(imageKey => {
            const [recordId, imageUrl] = imageKey.split('|');
            return { recordId, imageUrl };
          });
          
          await imageGenerationService.deleteSelectedImageUrls({ items });
          toast.success("Selected images deleted successfully");
          
          // Refresh the library
          await getAllImages(1, filter?.createdAt);
          
          // Clear selection
          setSelectedImages(new Set());
        } catch (error) {
          console.error("Failed to delete selected images:", error)
          toast.error("Failed to delete selected images");
        }
      },
      selectedCount: selectedImages.size
    });
  };

  const handleDeleteAll = () => {
    NiceModal.show("imageDeleteModal", {
      onConfirm: async () => {
        try {
          const allIds = records
            .map(record => record._id)
            .filter((id): id is string => id !== undefined);
          await imageGenerationService.deleteSelectedImages({ ids: allIds });
          toast.success("All images deleted successfully");
          
          // Refresh the library
          await getAllImages(1, filter?.createdAt);
          
          // Clear selection
          setSelectedImages(new Set());
        } catch (error) {
          console.error("Failed to delete all images:", error);
          toast.error("Failed to delete images");
        }
      },
      isAll: true
    });
  };

  return (
    <div className="relative flex grow flex-col">
      <div className="px-6 lg:px-12">
        <ImageGenerationHeader />
      </div>

      {records.length === 0 &&
        !isLibraryLoading &&
        !paginationInfo.pages &&
        paginationInfo.currentPage &&
        !filter?.createdAt ? 
        renderEmptyLibrary() : (
        <div className="pt-20">
          {(paginationInfo.pages && paginationInfo.currentPage) ||
            filter?.createdAt ? (
            <div className="mb-4 flex flex-col justify-between gap-2.5 px-6 sm:flex-row lg:px-12">
              <h3 className="fs-24 font-medium">Image Library</h3>
              <div className="flex items-center gap-2.5 xs:flex-col">
                <div className="relative w-full">
                  <DatePicker
                    className="h-10 w-full rounded-md border-none bg-whiteSmoke pl-4 text-sm dark:bg-blackRussian2"
                    selected={filter?.createdAt}
                    onChange={(date) => {
                      setDateError("");
                      getFilterImages(date);
                    }}
                    open={isDatePickerOpen}
                    onClickOutside={() => setIsDatePickerOpen(false)}
                    placeholderText="MM/DD/YYYY"
                    dateFormat="MM/dd/yyyy"
                    maxDate={maxSelectableDate}
                    minDate={minSelectableDate}
                    onCalendarOpen={() => loadMonthAndNeighbors(filter?.createdAt || new Date())}
                    onMonthChange={loadMonthAndNeighbors}
                    onYearChange={handleYearChange}
                    filterDate={handleDateFilter}
                    onChangeRaw={handleDateRawChange}
                    onBlur={(e: any) => validateDateInput(e.target.value)}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  >
                    <DateIcon />
                  </button>
                  {filter?.createdAt && (
                    <button
                      className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer text-red-500"
                      onClick={() => getFilterImages(null)}
                    >
                      <RxCross2 />
                    </button>
                  )}
                  {dateError && (
                    <div className="pointer-events-none absolute left-0 top-full z-30 mt-1 max-w-[280px] rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-500 shadow-sm backdrop-blur">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 10-2 0v5a1 1 0 002 0V6zm-1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-4">{dateError}</span>
                      </div>
                    </div>
                  )}
                </div>
                {selectedImages.size > 0 && (
                  <Button
                    onClick={handleDeleteSelected}
                    size="lg"
                    className="!h-10 !text-sm xs:!w-full !bg-red-500 hover:!bg-red-600"
                  >
                    Delete Selected ({selectedImages.size})
                  </Button>
                )}
                <Button
                  onClick={handleDeleteAll}
                  size="lg"
                  className="!h-10 !text-sm xs:!w-full !bg-red-500 hover:!bg-red-600"
                >
                  Delete All
                </Button>
                <Button
                  onClick={() => router.push("/image-generate")}
                  size="lg"
                  className="!h-10 !text-sm xs:!w-full"
                >
                  Create New
                </Button>
                <button
                  onClick={() => {
                    sessionStorage.setItem("settings-tab", "2");
                    router.push("/settings");
                  }}
                  className='w-10 h-10 flex justify-center items-center border border-whiteSmoke dark:border-blackRussian3 dark:text-white text-black shrink-0 rounded-lg cursor-pointer'
                >
                  <CommonTooltip position='top' name={"Purging Settings"} className={"mt-4 !px-2 !w-[130px] !text-center"}>
                    <IoMdSettings />
                  </CommonTooltip>
                </button>
              </div>
            </div>
          ) : null}
          
          <div
            className="themeScrollbar h-[calc(100vh-136px)] overflow-auto px-6 pb-28 lg:px-12"
            ref={masonryContainerRef}
          >
            {filter?.createdAt && records.length === 0 ? 
              renderNoResultsForDate() : (
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
              >
                <Masonry gutter="30px">
                  {records.map((record: any, index: number) =>
                    record.imageUrls.map((url: string, i: number) => (
                      <button
                        key={`${index}-${i}`}
                        onClick={() => generatedImage(record, i)}
                        className="image-item group relative w-full cursor-pointer"
                      >
                        <button
                          className={`absolute bottom-2 left-2 z-10 w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                            selectedImages.has(`${record._id}|${getBaseUrlWithoutQueryParams(url)}`) 
                              ? 'bg-blue-500 border-blue-500 text-white' 
                              : 'bg-white dark:bg-blackRussian2 border-whiteSmoke dark:border-blackRussian3 opacity-0 group-hover:opacity-100'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageSelect(record._id, url);
                          }}
                        >
                          {selectedImages.has(`${record._id}|${getBaseUrlWithoutQueryParams(url)}`) && <FaCheck size={12} />}
                        </button>
                        <div className="image_opacity absolute bottom-0 hidden h-full w-full items-start justify-between gap-4 rounded-lg p-4 group-hover:flex">
                          <div className="flex items-center justify-between w-full gap-2">
                            <div className="flex items-center gap-2">
                              <ImageComponent
                                src={userAvatar || images.avatar}
                                fill={"fill"}
                                figClassName="shrink-0 w-8 h-8"
                                className="rounded-full object-cover"
                                blurEffect={true}
                              />
                              <p className="line-clamp-2 text-sm text-white">
                                {record.prompt}
                              </p>
                            </div>
                            <span>
                              <AddArrowIcon />
                            </span>
                          </div>
                        </div>

                        <Image
                          src={url}
                          alt={`Library Image ${index}`}
                          className="h-auto w-full rounded-md"
                          width={267}
                          height={208}
                          placeholder="blur"
                          blurDataURL={`/_next/image?url=${encodeURIComponent(url)}&w=16&q=1`}
                        />
                      </button>
                    ))
                  )}
                  <figure ref={lastImageElementRef}></figure>
                  {isLibraryLoading
                    ? new Array(4)
                      .fill(0)
                      .map((_) => (
                        <SkeletonTheme
                          key={uuidv4()}
                          baseColor={isDarkMode ? "#2b2b2b" : "#e0e0e0"}
                          highlightColor={isDarkMode ? "#3c3c3c" : "#f5f5f5"}
                        >
                          <div className="relative">
                            <Skeleton
                              className="h-full w-full"
                              height={getRandomHeight()}
                            />
                          </div>
                        </SkeletonTheme>
                      ))
                    : null}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ImageLibrary;
