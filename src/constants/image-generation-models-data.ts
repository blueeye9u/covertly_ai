import { EImageGenerationModel } from "../enums/image-generation-models.enum";
import { DALLE_DIMENSIONS, STABLE_DIFFUSION_DIMENSIONS } from "./image-size-map";

export interface ImageGenerationModelData {
    name: string;
    key: EImageGenerationModel;
    img: string;
    des: string;
    version: string;
    count: number[];
    size: string[];
    style?: string[];
    negativePrompt?: boolean;
    modelIcon?:string;
    sizeImages?:string[]
}

export const Image_Generation_Model_Data: ImageGenerationModelData[] = [
    {
        name: "Stable Diffusion",
        key: EImageGenerationModel.STABLE_DIFFUSION,
        img: "",
        des: "",
        version: "",
        count: [1, 2, 3, 4],
        size: STABLE_DIFFUSION_DIMENSIONS,
        negativePrompt: true,
        modelIcon:"/assets/images/stable-diffusion.svg",
        sizeImages:["/assets/images/dimensions/stable/01.svg","/assets/images/dimensions/stable/02.svg","/assets/images/dimensions/stable/03.svg",
            "/assets/images/dimensions/stable/04.svg","/assets/images/dimensions/stable/05.svg","/assets/images/dimensions/stable/06.svg",
            "/assets/images/dimensions/stable/07.svg","/assets/images/dimensions/stable/08.svg","/assets/images/dimensions/stable/02.svg"

        ],
    },
    {
        name: "Dall E",
        key: EImageGenerationModel.DALL_E,
        img: "",
        des: "",
        version: "",
        count: [1, 2, 3, 4],
        size: DALLE_DIMENSIONS,
        style: ['vivid', 'natural'],
        modelIcon:"/assets/images/dall-e.svg",
        sizeImages:["/assets/images/dimensions/dall-e/01.svg","/assets/images/dimensions/dall-e/03.svg","/assets/images/dimensions/dall-e/02.svg"],
        
    }
];