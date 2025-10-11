import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Image_Generation_Model_Data } from "../constants/image-generation-models-data";

export interface ImageGenerationLibary {
  records: ImageGeneration[];
  paginationInfo: {
    currentPage: number;
    pages: number;
    perPage: number;
    totalRecords: number;
  };
  isLibraryLoading?: boolean;
  filter?: {
    createdAt?: Date | null;
  };
  error?: string;
}

export interface ImageGeneration {
  _id?: string;
  model?: string;
  prompt?: string;
  size?: string;
  style?: string;
  negativePrompt?: string;
  count?: number;
  imageUrls?: string[];
  isImageGenerating?: boolean;
  createdAt?: string;
  error?: string;
}

interface ImageGenerationContextType {
  imageGeneration: ImageGeneration;
  setImageGeneration: React.Dispatch<React.SetStateAction<ImageGeneration>>;
  imageGenerationLibrary: ImageGenerationLibary;
  setImageGenerationLibrary: React.Dispatch<React.SetStateAction<ImageGenerationLibary>>;
  refreshTrigger: number;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const ImageGenerationContext = createContext<ImageGenerationContextType | undefined>(
  undefined
);

export const useImageGeneration = (): ImageGenerationContextType => {
  const context = useContext(ImageGenerationContext);
  if (!context) {
    throw new Error(
      "useImageGeneration must be used within a ImageGenerationProvider"
    );
  }
  return context;
};

export const ImageGenerationProvider = ({ children }: { children: ReactNode }) => {
  const [imageGeneration, setImageGeneration] = useState<ImageGeneration>({
    _id: "",
    model: Image_Generation_Model_Data[0].key || "",
    prompt: "",
    size: Image_Generation_Model_Data[0].size ? Image_Generation_Model_Data[0].size[0] : "",
    style: Image_Generation_Model_Data[0].style ? Image_Generation_Model_Data[0].style[0] : "",
    negativePrompt: "",
    count: Image_Generation_Model_Data[0].count ? Image_Generation_Model_Data[0].count[0] : 1,
    imageUrls: [],
    isImageGenerating: false,
    error: "",
  });

  const [imageGenerationLibrary, setImageGenerationLibrary] = useState<ImageGenerationLibary>({
    records: [],
    paginationInfo: {
      currentPage: 0,
      perPage: 10,
      pages: 1,
      totalRecords: 0,
    },
    isLibraryLoading: false,
    filter: {
      createdAt: null,
    },
    error: "",
  });

  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const value = useMemo<ImageGenerationContextType>(() => ({
    imageGeneration,
    setImageGeneration,
    imageGenerationLibrary,
    setImageGenerationLibrary,
    refreshTrigger,
    setRefreshTrigger,
  }), [imageGeneration, imageGenerationLibrary, refreshTrigger]);

  return (
    <ImageGenerationContext.Provider value={value}>
      {children}
    </ImageGenerationContext.Provider>
  );
};