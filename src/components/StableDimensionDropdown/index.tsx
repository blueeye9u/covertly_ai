import React from "react";
import Image from "next/image";
import { useImageGeneration, ImageGeneration } from "../../context/imageGeneration.context";
import { ImageGenerationModelData } from "../../constants/image-generation-models-data";

interface IProps {
    config: ImageGenerationModelData;
}

const StableDimensionsAccordion: React.FC<IProps> = ({ config }) => {
    const { imageGeneration, setImageGeneration } = useImageGeneration();
    const { size, isImageGenerating } = imageGeneration;

    const handleChange = (val: ImageGeneration) => {
        if (!isImageGenerating) {
            setImageGeneration({ ...imageGeneration, ...val });
        }
    };

    return (
        <div className="w-full">
            <div className="shadow-3xl w-full rounded-lg  p-4 dark:bg-blackRussian2 bg-stormGrey">
                <ul className="grid grid-cols-3 gap-2 justify-between">
                    {config.size.map((s, i) => (
                        <button
                            key={s}
                            className="flex flex-col cursor-pointer w-full items-center justify-center gap-1 text-sm duration-300 text-white"
                            onClick={() => handleChange({ size: s })}
                        >
                            {config.sizeImages && (
                                <figure className={`w-16 h-12 flex justify-center items-center rounded-md bg-blackRussian border 
                                        ${s === size ? "border-[#30C5D2]" : "border-transparent"}
                                         ${isImageGenerating ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}
                                        
                                        `}
                                >
                                    <Image
                                        src={config.sizeImages[i]}
                                        alt={`size-image-${s}`}
                                        width={20}
                                        height={20}
                                    />
                                </figure>
                            )}
                            <span className="text-[10px] text-white">{s}</span>
                        </button>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StableDimensionsAccordion;
