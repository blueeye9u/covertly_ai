import React from 'react'
import { ImageGeneration, useImageGeneration } from '../../context/imageGeneration.context';

const NegativePrompt = () => {

    const { imageGeneration, setImageGeneration } = useImageGeneration();
    const { negativePrompt, isImageGenerating } = imageGeneration;
    const handleChange = (val: ImageGeneration) => {
        if (!isImageGenerating) {
          setImageGeneration({ ...imageGeneration, ...val });
        }
      };
  return (
    <div>
        <p className="mb-4 text-xl text-center text-white">Negative Prompt</p>
         <textarea
              value={negativePrompt}
              onChange={(e) => handleChange({ negativePrompt: e.target.value })}
              disabled={isImageGenerating}
              placeholder={"Write here..."}
              className="h-[160px] w-full resize-none rounded-md border border-transparent opacity-100 duration-500 focus:border-primary-100 bg-[#1E2129] text-white"
            />
    </div>
  )
}

export default NegativePrompt