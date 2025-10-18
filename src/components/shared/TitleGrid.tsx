import React from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from "uuid";

interface TitleItem {
    title: string;
    desc: string;
    img: string;
    img1: string;
}

interface TitleGridProps {
    title: TitleItem[];
    isDarkMode: boolean;
}

const TitleGrid: React.FC<TitleGridProps> = ({ title, isDarkMode }) => {
    return (
        <div className='grid sm:grid-cols-2 gap-6 mb-24'> 
            {
                title.map((item,i)=>(
                    <div key={uuidv4()} className='flex lg:flex-row flex-col gap-2 md:gap-4 lg:gap-2 lg:items-center rounded-[16px]'>
                        <Image src={isDarkMode ? item.img : item.img1} alt={item.img} width={72} height={72} className='self-start mb-2' />
                        <div className='self-start ml-2' style={{ height: 'auto', lineHeight: '1' }}>
                            <p className='dark:text-white fs-24 font-semibold mb-2'>{item.title}</p>
                            <span className='dark:text-lavender text-sm'>{item.desc}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default TitleGrid;
