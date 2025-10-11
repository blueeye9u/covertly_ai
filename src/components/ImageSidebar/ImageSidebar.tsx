import React, { useEffect, useState, useCallback } from "react";
import NiceModal from "@ebay/nice-modal-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { imageGenerationService } from "../../services/image-generate";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "../../context/themeContext";
import { useSearchWithAbort } from "../../hooks/useSearchWithAbort";
import SidebarHeader from "../common/SidebarHeader";

interface IProps {
    switchSidebar: any;
    setSwitchSmallSidebar?: any;
    switchSmallSidebar?: any;
}

const getBaseUrlWithoutQueryParams = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
    } catch (error) {
        console.warn("Invalid URL provided:", url, error);
        return url.split('?')[0];
    }
};

const ImageSidebar = ({
    switchSidebar,
    setSwitchSmallSidebar,
    switchSmallSidebar
}: IProps) => {
    const { isDarkMode } = useTheme();
    const {
        imageGeneration,
        setImageGeneration,
        imageGenerationLibrary,
        setRefreshTrigger,
        setImageGenerationLibrary,
    } = useImageGeneration();

    const [records, setRecords] = useState<any[]>([]);
    const [isLibraryLoading, setIsLibraryLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        if (imageGeneration?.isImageGenerating) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [imageGeneration?.isImageGenerating]);

    // Fetch images
    const getAllImages = useCallback(async (searchTerm?: string, signal?: AbortSignal) => {
        try {
            setIsLibraryLoading(true);
            const response: any = await imageGenerationService.getAllGeneratedImagesGrouped({
                searchTerm
            });
            
            if (response?.payload) {
                setRecords(response.payload);
                setImageGenerationLibrary(prev => ({
                    ...prev,
                    records: response.payload,
                    isLibraryLoading: false
                }));
            }
        } catch (error) {
            console.error("Failed to fetch generated images:", error);
        } finally {
            setIsLibraryLoading(false);
        }
    }, [setImageGenerationLibrary]);

    // Use the common search hook
    const {
        searchQuery,
        isSearching,
        onChange,
        onKeyDown,
        onSearchIconClick,
        cleanup
    } = useSearchWithAbort(getAllImages, { maxLength: 50 });

    const onInitiateNewGeneration = async () => {
        NiceModal.show("imageModelSelectModal");
    };

    const handleDeleteAllImages = () => {
        NiceModal.show('imageDeleteModal', {
            onConfirm: async () => {
                try {
                    await imageGenerationService.deleteAllImages();
                    toast.success('All images deleted successfully');
                    
                    setImageGeneration({
                        ...imageGeneration,
                        _id: "",
                        prompt: "",
                        imageUrls: [],
                    });
                    
                    // Clear both local and context state immediately
                    setRecords([]);
                    setImageGenerationLibrary(prev => ({ ...prev, records: [] }));
                    
                    setRefreshTrigger(prev => prev + 1);
                    
                    await getAllImages();
                } catch (error) {
                    console.error('Failed to delete images:', error);
                    toast.error('Failed to delete images');
                }
            },
            isAll: true,
        });
    };


    // Remove infinite scroll - we load all records at once

    const selectImage = (record: any, selectedIndex: number) => {
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
    };

    // Initialize data
    useEffect(() => {
        getAllImages();
    }, []);

    useEffect(() => {
        if (imageGenerationLibrary?.records && imageGenerationLibrary.records.length > 0) {
            const contextRecords = imageGenerationLibrary.records;
            setRecords(prevRecords => {
                const existingRecordsMap = new Map(prevRecords.map(record => [record._id, record]));
                
                const newRecords = contextRecords.filter(contextRecord => 
                    !existingRecordsMap.has(contextRecord._id)
                );
                
                return [...prevRecords, ...newRecords];
            });
        }
    }, [imageGenerationLibrary?.records]);

    // Cleanup function
    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return (
        <aside className={`sidebar ${switchSmallSidebar ? "sidebar__close" : "sidebar__open"}`}>
            <SidebarHeader
                title="Image Generation"
                buttonText="Start New Generation"
                buttonDisabled={disableButton}
                onButtonClick={onInitiateNewGeneration}
                searchPlaceholder="Search"
                searchValue={searchQuery}
                searchOnChange={onChange}
                searchOnKeyDown={onKeyDown}
                searchOnSearchIconClick={onSearchIconClick}
                searchClassName="dark:!bg-blackRussian2 !bg-whiteSmoke dark:!text-white !text-gray"
                searchIconClassName="dark:!text-white !text-gray"
                isSearchLoading={isSearching}
                switchSidebar={switchSidebar}
                setSwitchSmallSidebar={setSwitchSmallSidebar}
            />
            
            {imageGenerationLibrary.records.length > 0 && (
                <div className="px-5 flex gap-2 justify-between items-center mb-2">
                    <span className="text-sm text-aluminium">
                        Your images
                    </span>
                    <button
                        className={`px-3 py-1 bg-whitesmoke dark:bg-capeCod rounded-xl dark:text-white text-black text-sm border border-danger ${isLibraryLoading ? 'pointer-events-none opacity-50' : 'pointer-events-auto opacity-100'}`}
                        onClick={handleDeleteAllImages}
                        disabled={isLibraryLoading}
                    >
                        Delete all
                    </button>
                </div>
            )}
            
            <div className="sidebar__body themeScrollbarOverflow grow overflow-x-hidden px-3">
                {imageGenerationLibrary.records.length === 0 && !isLibraryLoading ? (
                    <div className="flex flex-col items-center justify-center h-full py-8">
                        <Image
                            src={"/assets/images/empty-library.svg"}
                            alt={"empty placeholder"}
                            height={80}
                            width={80}
                        />
                        <p className="mt-4 text-sm text-center dark:text-gray-400 text-gray-600">
                            No images generated yet
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {records.map((group: any, groupIndex: number) => (
                            <div key={group._id} className="space-y-1">
                                {/* Prompt header for the group */}
                                <div className="px-2 py-1">
                                    <p className="text-xs dark:text-gray-300 text-gray-600 line-clamp-2 font-medium overflow-hidden h-4">
                                        {group.prompt}
                                    </p>
                                </div>

                                {/* 4-column grid for images in this group */}
                                <div className="grid grid-cols-4 gap-1">
                                    {group.imageUrls?.map((url: string, imageIndex: number) => (
                                        <button
                                            key={`${group._id}-${imageIndex}`}
                                            onClick={() => selectImage(group, imageIndex)}
                                            className={`relative w-full aspect-square cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${
                                                imageGeneration._id === group._id && imageGeneration.imageUrls?.[imageIndex] === url
                                                    ? 'border-primary-100' 
                                                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        >
                                            <Image
                                                src={url}
                                                alt={`Generated image ${groupIndex}-${imageIndex}`}
                                                className="w-full h-full object-cover"
                                                fill
                                                sizes="(max-width: 768px) 25vw, 20vw"
                                                placeholder="blur"
                                                blurDataURL={`/_next/image?url=${encodeURIComponent(url)}&w=16&q=1`}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200" />
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Horizontal divider between groups */}
                                {groupIndex < records.length - 1 && (
                                    <div className="border-b border-gray-200 dark:border-gray-600 my-3" />
                                )}
                            </div>
                        ))}
                        
                        {/* Loading skeletons */}
                        {isLibraryLoading && (
                            <div className="space-y-4">
                                {new Array(3)
                                    .fill(0)
                                    .map((_, groupIdx) => (
                                        <SkeletonTheme
                                            key={uuidv4()}
                                            baseColor={isDarkMode ? "#2b2b2b" : "#e0e0e0"}
                                            highlightColor={isDarkMode ? "#3c3c3c" : "#f5f5f5"}
                                        >
                                            <div className="space-y-2">
                                                {/* Skeleton for prompt */}
                                                <div className="px-2 py-1">
                                                    <Skeleton height={16} width="80%" />
                                                </div>
                                                
                                                {/* Skeleton for image grid */}
                                                <div className="grid grid-cols-4 gap-1">
                                                    {new Array(4)
                                                        .fill(0)
                                                        .map((_) => (
                                                            <div key={uuidv4()} className="aspect-square">
                                                                <Skeleton className="w-full h-full rounded-md" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </SkeletonTheme>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default ImageSidebar;