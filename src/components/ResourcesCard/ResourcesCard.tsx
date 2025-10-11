import React from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from "uuid";
import ImageComponent from '../global/imageComponent/ImageComponent';

const ResourcesCard = ({ data }: any) => {
  const renderCard = (item:any) => {
    if(item.link){
      return (
        <Link href={item.link ?? '#'} target={item.link ? '_blank' : ''} className='flex flex-col flex-grow no-underline'>
          <ImageComponent src={item.img} figClassName='w-full' width={392} height={220} alt='card' />
          <div className='px-6 py-5 bg-white dark:bg-blackRussian2 flex flex-col grow'>
            <h5 className={`fs-24 leading-7`}>{item.title}</h5>
            {item.desc && <p className='text-sm mb-0 grow text-black dark:text-dark-50'>{item.desc}</p>}
          </div>
        </Link>
      )
    } else if (item.title === 'Expert Advice') {
        return (
          <Link href={`mailto:${item.email ?? 'sales@covertly.ai'}`} className='flex flex-col flex-grow no-underline'>
            <ImageComponent src={item.img} figClassName='w-full' width={392} height={220} alt='card' />
            <div className='px-6 py-5 bg-white dark:bg-blackRussian2 flex flex-col grow'>
              <h5 className={`fs-24 leading-7`}>{item.title}</h5>
              {item.desc && <p className='text-sm mb-0 grow text-black dark:text-dark-50'>{item.desc}</p>}
            </div>
          </Link>
        )
    } else {
      return (
        <>
          <ImageComponent src={item.img} figClassName='w-full' width={392} height={220} alt='card' />
          <div className='px-6 py-5 bg-white dark:bg-blackRussian2 flex flex-col grow'>
            <div className={`flex justify-between items-center ${item.desc ? 'mb-2.5' : ''}`}>
              <h5 className={`fs-24 leading-7`}>{item.title}</h5>
              {item.download && (<Link download href={"/Prompts.zip"} className='py-[2px] px-[5px] h-[30px] max-w-[30px] rounded !bg-whiteSmoke dark:!bg-blackRussian3'>{item.download}</Link>)}
            </div>
            {item.desc && <p className='text-sm mb-0 grow text-black dark:text-dark-50'>{item.desc}</p>}
          </div>
        </>
      )
    }
  }

  return (
    <div className={`discover__covertly__articles flex justify-center flex-wrap`}>
      {data.map((item: any) => (
        <div className='w-full md:w-1/2 lg:w-1/3 flex flex-col p-4' key={uuidv4()}>
          <div className='flex flex-col grow shadow-sm rounded-[20px] overflow-hidden'>{renderCard(item)}</div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesCard;
