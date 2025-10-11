import React from 'react'
import { ImageGeneration, useImageGeneration } from '../../context/imageGeneration.context';
import { Image_Generation_Model_Data } from '../../constants/image-generation-models-data';

const NumberOfImages = () => {
    const { imageGeneration, setImageGeneration } = useImageGeneration();
    const { isImageGenerating } = imageGeneration;
    const { count } = imageGeneration;

    const config = Image_Generation_Model_Data.find((config) => config.key === imageGeneration.model);

    const handleChange = (val: ImageGeneration) => {
        if (!isImageGenerating) {
          setImageGeneration({ ...imageGeneration, ...val });
        }
      };
  return (
    <div>
         {config?.count && (
        <div>
          <p className="text-white text-xl text-center mb-6">Number of images</p>
          <div className="grid grid-cols-4 gap-3">
            {config?.count.map((c, i) => (
              <button
                key={c}
                onClick={() => handleChange({ count: c })}
                className={`${count === c ? "border-[#30C5D2] text-[#30C5D2]" : "border-transparent"} 
                 ${isImageGenerating ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[#30C5D2]"} 
                flex h-12 w-full text-white items-center justify-center rounded-md border hover:text-[#30C5D2] bg-blackRussian2`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NumberOfImages