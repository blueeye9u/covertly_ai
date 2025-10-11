import React from 'react'
import { useImageGeneration } from '../../../context/imageGeneration.context';
import { Image_Generation_Model_Data } from '../../../constants/image-generation-models-data';
import ImageModel from "./image-model";

const ImageAnswerSidebar = () => {
    const { imageGeneration } = useImageGeneration();
    const selectedModelConfig = Image_Generation_Model_Data.find((config) => config.key === imageGeneration.model);

    return (
        <div className='w-[288px] h-[calc(100vh-104px)] fixed left-6 md:block hidden '>
            <div className="dark:bg-[#2A2C33] bg-whiteSmoke p-4 rounded-md h-full overflow-y-auto AtScrollNone">
                {selectedModelConfig && <ImageModel config={selectedModelConfig} />}
            </div>
        </div>
    )
}

export default ImageAnswerSidebar