import React from "react";
import Image from "next/image";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import { Tick } from "../../svgs/svg";
import { handleModelChange } from "../../utils/imageGenerationUtils";

const Model = () => {
    const { imageGeneration, setImageGeneration } = useImageGeneration();
    
    const handleChange = (modelKey: string) => {
        const updatedImageGeneration = handleModelChange(imageGeneration, modelKey);
        setImageGeneration(updatedImageGeneration);
    };

    return (

        <div>
            <p className='text-white text-center mb-6 text-xl font-medium'>Model</p>
            <div className="space-y-4">
                {Image_Generation_Model_Data.map((config: any) => (
                    <div key={config.key} className="flex gap-4 items-center">
                        <div className={`w-5 h-5 rounded-md flex justify-center items-center`}>
                            {
                                imageGeneration.model === config.key &&
                                <span className="text-white"><Tick /> </span>

                            }
                        </div>
                        <button
                            className="flex gap-2.5 items-center text-white cursor-pointer"
                            onClick={() => handleChange(config.key)}
                        >
                            <figure className="bg-primary-100 rounded-full">
                                <Image src={config.modelIcon} alt="model-rounded-icon" height={25} width={25} className="rounded-full" />
                            </figure>
                            {config.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Model;
