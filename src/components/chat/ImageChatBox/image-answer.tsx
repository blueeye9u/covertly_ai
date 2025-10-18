import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { v4 as uuidv4 } from "uuid";
import { useImageGeneration } from "../../../context/imageGeneration.context";
import CommonTooltip from "../../ComonTooltip";
import Fancybox from "../../FancyBox";
import ImageSkelton from "../../ImageSkelton/ImageSkelton";
import { CopyIcon, DownloadIcon, ArrowRightIcon } from "../../../svgs/svg";
import { downloadImage, copyImageLinkToClipboard } from "../../../utils/imageUtils";
import ImageModelSwitcher from "../../ImageModleSwitcher";
import { imageGenerationService } from "../../../services/image-generate";
import { getSizeConfig } from "../../../constants/image-size-map";


const ImageAnswer = () => {
    const { imageGeneration, imageGenerationLibrary, setImageGeneration, refreshTrigger } = useImageGeneration() || {
        imageGeneration: { imageUrls: ["/mock/image1.jpg"], isImageGenerating: false },
        imageGenerationLibrary: { records: [], paginationInfo: { currentPage: 0, pages: 1, perPage: 10, totalRecords: 0 } },
        setImageGeneration: () => {},
        refreshTrigger: 0,
    };
    const { isImageGenerating, imageUrls } = imageGeneration;
    const [gridColsClass, setGridColsClass] = useState("");
    const [allImages, setAllImages] = useState<any[]>([]);
    const [isLoadingImages, setIsLoadingImages] = useState(true);
    const [dynamicSpacing, setDynamicSpacing] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const getGridColsClass = (count: number) => {
        switch (count) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-3";
            case 4:
                return "grid-cols-2";
            default:
                return "grid-cols-4";
        }
    };

    const getClassNames = (size: any, count: any) => {
        const baseClass = "w-full h-auto cursor-pointer rounded-md";
        const sizeClassMap = {
            "9:21": count === 4 ? "h-[calc(100vh-690px)]" : "h-[calc(100vh-700px)]",
            "9:16": count === 4 ? "h-[calc(100vh-669px)]" : "h-[calc(100vh-670px)]",
            "1024x1792": count === 4 ? "h-[calc(100vh-669px)]" : "h-[calc(100vh-670px)]",
            "1024x1024": "h-[calc(100vh-600px)]",
            "1:1": "h-[calc(100vh-600px)]",
            "2:3": "h-[calc(100vh-700px)]",
            "4:5": count === 4 ? "h-[calc(100vh-800px)]" : "h-[calc(100vh-720px)]",
        };
        return `${baseClass} ${sizeClassMap[size as keyof typeof sizeClassMap] || ""}`;
    };

    const selectedImage = imageGenerationLibrary.records.find((r) => r._id === imageGeneration._id) || {};
    
    const isWelcomeSectionVisible = imageUrls?.length === 0 && !isImageGenerating && !isLoadingImages && allImages.length === 0;
    
    // Calculate dynamic spacing based on container height
    useEffect(() => {
        const calculateSpacing = () => {
            if (containerRef.current) {
                const containerHeight = containerRef.current.offsetHeight;
                const containerCenter = containerHeight / 2;
                const sectionB = containerRef.current.querySelector('[data-section-b]') as HTMLElement;
                
                if (sectionB) {
                    const sectionBHeight = sectionB.offsetHeight;
                    
                    // Check if welcome section is visible
                    const welcomeSection = containerRef.current.querySelector('[data-welcome-section]') as HTMLElement;
                    
                    if (welcomeSection) {
                        // Welcome section is visible, calculate spacing from bottom of section A
                        const welcomeSectionHeight = welcomeSection.offsetHeight;
                        const distanceToCenter = containerCenter - welcomeSectionHeight;
                        const adjustedSpacing = distanceToCenter - (sectionBHeight / 2);
                        
                        if (adjustedSpacing > 0) {
                            setDynamicSpacing(adjustedSpacing);
                        } else {
                            setDynamicSpacing(20);
                        }
                    } else {
                        // No welcome section, center section B in the full container
                        const adjustedSpacing = (containerHeight / 2) - (sectionBHeight / 2);
                        
                        if (adjustedSpacing > 0) {
                            setDynamicSpacing(adjustedSpacing);
                        } else {
                            setDynamicSpacing(20);
                        }
                    }
                } else {
                    setDynamicSpacing(0);
                }
            }
        };

        // Add a small delay to ensure elements are rendered
        const timeoutId = setTimeout(() => {
            calculateSpacing();
        }, 100);

        // Recalculate on window resize
        const handleResize = () => {
            calculateSpacing();
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, [isWelcomeSectionVisible, imageUrls, isImageGenerating, isLoadingImages]);

    // Fetch all images to check if intro should be shown
    useEffect(() => {
        const fetchAllImages = async () => {
            try {
                setIsLoadingImages(true);
                const response: any = await imageGenerationService.getAllGeneratedImagesGrouped({});
                if (response?.payload) {
                    setAllImages(response.payload);
                }
            } catch (error) {
                console.error("Failed to fetch generated images:", error);
            } finally {
                setIsLoadingImages(false);
            }
        };
        fetchAllImages();
    }, [refreshTrigger]);

    // Sync allImages with context when new images are generated
    useEffect(() => {
        if (imageGenerationLibrary?.records && imageGenerationLibrary.records.length > 0) {
            // Merge context records with existing allImages, avoiding duplicates
            const contextRecords = imageGenerationLibrary.records;
            setAllImages(prevImages => {
                // Create a map of existing images by ID for quick lookup
                const existingImagesMap = new Map(prevImages.map(image => [image._id, image]));
                
                // Add new records from context that don't already exist
                const newImages = contextRecords.filter(contextRecord => 
                    !existingImagesMap.has(contextRecord._id)
                );
                
                // Return existing images plus new ones
                return [...prevImages, ...newImages];
            });
        }
    }, [imageGenerationLibrary?.records]);

    useEffect(() => {
        setGridColsClass(getGridColsClass(imageGeneration?.count ?? 0));
    }, [imageGeneration.count]);

    const { className: layoutClassName, aspectRatio } = useMemo(() => {
        const activeData = imageGeneration;
        return getSizeConfig(activeData.size ?? "1024x1024", activeData.count ?? 1);
    }, [imageGeneration]);

    const records = imageGenerationLibrary?.records ?? [];
    
    const navigationRecords = allImages.length > 0 ? allImages : records;
    const navigationActiveIndex = useMemo(() => 
        navigationRecords.findIndex((r: any) => r?._id === imageGeneration?._id), 
        [navigationRecords, imageGeneration?._id]
    );

    const goPrev = useCallback(() => {
        if (navigationRecords.length === 0) return;
        const nextIndex = navigationActiveIndex > 0 ? navigationActiveIndex - 1 : 0;
        const target = navigationRecords[nextIndex];
        if (target && !imageGeneration.isImageGenerating) {
            setImageGeneration(target);
        }
    }, [navigationRecords, navigationActiveIndex, setImageGeneration, imageGeneration.isImageGenerating]);

    const goNext = useCallback(() => {
        if (navigationRecords.length === 0) return;
        const nextIndex = navigationActiveIndex < navigationRecords.length - 1 ? navigationActiveIndex + 1 : navigationRecords.length - 1;
        const target = navigationRecords[nextIndex];
        if (target && !imageGeneration.isImageGenerating) {
            setImageGeneration(target);
        }
    }, [navigationRecords, navigationActiveIndex, setImageGeneration, imageGeneration.isImageGenerating]);

    const isPrevDisabled = useMemo(() => navigationActiveIndex <= 0, [navigationActiveIndex]);
    const isNextDisabled = useMemo(() => navigationActiveIndex >= navigationRecords.length - 1, [navigationActiveIndex, navigationRecords.length]);

    return (
        <div ref={containerRef} className="w-full mb-3 grow flex flex-col items-center relative">
            
            {isWelcomeSectionVisible && (
                <div className="w-full flex justify-center px-4" data-welcome-section>
                    <div className="w-full max-w-[600px] bg-whiteSmoke dark:bg-blackRussian3 rounded-md p-4 md:p-6 backdrop-blur">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base md:text-lg font-semibold dark:text-white">Welcome to the Image Generator Interface!</h3>
                            <p className="text-sm md:text-base text-aluminium dark:text-gray-300">
                                {"To get started, click \"Start New Generation\" to create stunning images. You can choose from powerful tools like Stable Diffusion or DALL-E for image creation. Describe your desired image in the prompt box, adjust settings, and hit \"Generate Image\" to bring your vision to life. Use the Image Generation panel to view and manage your previous creations. Have fun creating!"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {imageUrls?.length === 0 && !isImageGenerating ? (
                <div className="flex flex-col items-center justify-start" style={{ marginTop: `${dynamicSpacing}px` }} data-section-b>
                    <Image
                        src={"/assets/images/start-image.svg"}
                        alt="AI Generated Image"
                        height={60}
                        width={60}
                    />
                    <p className="mt-4 mb-6">Start generating your image now!</p>
                    
                    {/* Model Selection UI */}
                    <div className="min-w-[300px]">
                        <ImageModelSwitcher />
                    </div>
                </div>
            ) : (
                <>
                    {
                        isImageGenerating ? (
                                <div
                                    className={`grid overflow-visible gap-2 w-full max-w-full h-full ${gridColsClass} ${layoutClassName}`}
                                    style={{
                                        aspectRatio: `${aspectRatio}`,
                                        transition: "max-width 0.3s ease",
                                    }}
                                >
                                    {Array.from({ length: imageGeneration.count ?? 0 }).map((_) => (
                                        <ImageSkelton key={uuidv4()} imageGeneration={imageGeneration}/>
                                    ))}
                                </div>
                            )
                            : (
                                <Fancybox
                                    options={{
                                        Carousel: {
                                            infinite: false,
                                        },
                                    }}
                                    className={`grid overflow-visible gap-2 w-full max-w-full h-full ${gridColsClass} ${layoutClassName}`}
                                    style={{
                                        aspectRatio: `${aspectRatio}`,
                                        transition: "max-width 0.3s ease",
                                    }}
                                >
                                    {imageUrls?.map((url, i) => (
                                        <figure className="rt-previewImages w-full !overflow-visible" key={url}>
                                            <div
                                                className="absolute p-3 z-10 top-0 left-0 w-full flex justify-end gap-3 duration-300 image-generate-opacity">
                                                <CommonTooltip
                                                    position="bottom"
                                                    className={"!w-[100px] text-center"}
                                                    parentClassName={"!group !z-[60]"}
                                                    name="Download"
                                                >
                                                    <button
                                                        className="text-white bg-black dark:text-black dark:bg-white w-[25px] h-[25px] gap-2 flex justify-center items-center rounded-md cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            downloadImage(imageUrls[i]);
                                                        }}
                                                    >
                                                        <DownloadIcon/>
                                                    </button>
                                                </CommonTooltip>

                                                <CommonTooltip
                                                    position="bottom"
                                                    className={"!w-[100px] text-center"}
                                                    parentClassName={"!group !z-[60]"}
                                                    name="Copy"
                                                >
                                                    <button
                                                        className="text-white bg-black dark:text-black dark:bg-white w-[25px] h-[25px] gap-2 flex justify-center items-center rounded-md cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyImageLinkToClipboard(imageUrls[i]);
                                                        }}
                                                    >
                                                        <CopyIcon/>
                                                    </button>
                                                </CommonTooltip>
                                            </div>
                                            <Link data-fancybox="gallery" href={url} className="p-1 w-full">
                                                <Image
                                                    src={url}
                                                    alt="AI Generated Image"
                                                    placeholder="blur"
                                                    blurDataURL={`/_next/image?url=${url}&w=16&q=1`}
                                                    width={0}
                                                    height={0}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className={`w-full object-contain h-auto cursor-pointer rounded-md bg-center object-center
                                                        ${getClassNames(selectedImage.size, selectedImage.count)}`}
                                                />
                                            </Link>
                                        </figure>
                                    ))}
                                </Fancybox>
                            )}
                </>
            )}
            {(imageUrls?.length ?? 0) > 0 && !isImageGenerating && navigationRecords.length > 1 && (
                <>
                    <button
                        aria-label="Previous"
                        onClick={goPrev}
                        className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-[#1f2937]/70 hover:bg-[#1f2937]/90 text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1f2937]/70"
                        disabled={isPrevDisabled}
                        aria-disabled={isPrevDisabled}
                    >
                        <span className="inline-block rotate-180 select-none"><ArrowRightIcon /></span>
                    </button>
                    <button
                        aria-label="Next"
                        onClick={goNext}
                        className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-[#1f2937]/70 hover:bg-[#1f2937]/90 text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1f2937]/70"
                        disabled={isNextDisabled}
                        aria-disabled={isNextDisabled}
                    >
                        <span className="inline-block select-none"><ArrowRightIcon /></span>
                    </button>
                </>
            )}
        </div>
    );
};

export default ImageAnswer;