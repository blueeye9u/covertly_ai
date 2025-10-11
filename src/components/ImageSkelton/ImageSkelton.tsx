import React from 'react'
import Loader from './loader'
import { SkeltonIcon } from '../../svgs/svg'

const ImageSkelton = ({imageGeneration}:any) => {
    console.log(imageGeneration.size,"imageGeneration SKelton");
    return (
        <div className='p-1 w-full h-full'>
            <figure className={` w-full h-full relative grow flex justify-center items-center rounded-xl bg-whiteSmoke dark:bg-blackRussian2 text-[#585A5D]`}>
            <div className='absolute top-3 left-3'><Loader /></div>
            <SkeltonIcon/>
        </figure>
        </div>
    )
}

export default ImageSkelton