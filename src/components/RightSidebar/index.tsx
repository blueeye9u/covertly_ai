import React from 'react';
import { v4 as uuidv4 } from "uuid";
import ImageComponent from '../global/imageComponent/ImageComponent';
import { CrossArrowIcon } from '../../svgs/svg';

interface IProps {
    rightSidebar?: any;
    setRightSidebar?: any,
    copyFiles?: any,
    currentChat?:any
}

const RightSidebar = ({ rightSidebar, setRightSidebar,copyFiles,currentChat }: IProps) => {
    const filesToDisplay = (currentChat?.files?.length > 0 && currentChat.files) || []
    
    return (
        <div className={`${rightSidebar === false ? "right-0 duration-300" : " -right-full duration-300"}  fixed top-0 duration-300 h-full w-72 bg-white dark:bg-black z-30 p-4 pb-14`}>
            <div className='flex items-center justify-between gap-2 mb-3'>
                <h6 className='dark:text-white text-lg truncate'>Uploaded Documents</h6>
                <button
                    className='cursor-pointer  hover:opacity-70 duration-300'
                    onClick={() => { setRightSidebar(!rightSidebar) }}
                >
                    <CrossArrowIcon />
                </button>
            </div>
            <div className='space-y-3 h-full overflow-auto themeScrollbarOverflow pr-1'>
                {filesToDisplay?.map((item:any) => (
                    <div key={uuidv4()} className='w-full bg-whiteSmoke dark:bg-blackRussian3 py-3 px-4 rounded-md flex gap-3 items-start group'>
                        <ImageComponent src={'/assets/images/pdf.svg'} width={20} height={20} alt={`pdf-image-${uuidv4()}`}/>
                        <div className='grow flex flex-col'>
                            <div className='flex justify-between gap-2 mb-1'>
                                <p className='text-sm dark:text-white truncate leading-tight w-36'>{item.name}</p>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-xs'>{item.size}</span>
                                <span className='text-xs'>{item.date}</span>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RightSidebar;