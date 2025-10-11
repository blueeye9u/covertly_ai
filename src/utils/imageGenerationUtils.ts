import { ImageGeneration } from "../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../constants/image-generation-models-data";

/**
 * Handles updating image generation settings when model changes
 * 
 * @param currentImageGeneration Current image generation state
 * @param modelKey The key of the selected model
 * @returns Updated image generation state
 */
export const handleModelChange = (
  currentImageGeneration: ImageGeneration,
  modelKey: string
): ImageGeneration => {
  // Find the configuration for the selected model
  const selectedModelConfig = Image_Generation_Model_Data.find(
    (config) => config.key === modelKey
  );
  
  // Create a new object with updated model
  const updatedImageGeneration = { 
    ...currentImageGeneration, 
    model: modelKey 
  };

  // Update count if available in model config
  if (selectedModelConfig?.count) {
    updatedImageGeneration.count = selectedModelConfig.count[0];
  }

  // Update style if available in model config
  if (selectedModelConfig?.style) {
    updatedImageGeneration.style = selectedModelConfig.style[0];
  }

  // Update size if available in model config
  if (selectedModelConfig?.size) {
    updatedImageGeneration.size = selectedModelConfig.size[0];
  }

  // Reset negative prompt when style changes
  if (updatedImageGeneration.style) {
    updatedImageGeneration.negativePrompt = "";
  }

  return updatedImageGeneration;
};