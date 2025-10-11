import React from 'react'
import ImageComponent from '../global/imageComponent/ImageComponent'
import Link from 'next/link'
import { v4 as uuidv4 } from "uuid";

const DiscoverArticles = ({data}:any) => {
  return (
    <div className='discover__covertly__articles grid lg:grid-cols-3 sm:grid-cols-2 gap-6'>
    {
      data.map((item:any) => (
        <div key={uuidv4()} className='flex flex-col shadow-sm'>
          {item.link ? (
            <Link className='text-black dark:text-white' href={`${item.link}`}>
              <ImageComponent src={item.img} figClassName='w-full rounded-t-2xl' width={392} height={220} alt={`card-image-${uuidv4()}`} className='w-full h-full rounded-t-[20px]' />
              <div className='px-6 py-5 bg-white dark:bg-blackRussian2 rounded-b-2xl flex flex-col grow'>
                <h5 className={`fs-24 leading-7 ${item.desc ? "mb-2.5" : ""}`}>{item.title}</h5>
                {item.desc && <p className='text-black dark:text-white text-sm mb-10 grow'>{item.desc}</p>}
              </div>
            </Link>
          ) : (
            <>
              <ImageComponent src={item.img} figClassName='w-full rounded-t-2xl' width={392} height={220} alt='card-image' className='w-full h-full rounded-t-[20px]' />
              <div className='px-6 py-5 light:text-black bg-white dark:bg-blackRussian2 rounded-b-2xl flex flex-col grow'>
                <h5 className={`fs-24 leading-7 ${item.desc ? "mb-2.5" : ""}`}>{item.title}</h5>
                {item.desc && <p className='text-black dark:text-white text-sm mb-10 grow'>{item.desc}</p>}
              </div>
            </>
          )}
        </div>
      ))
    }
  </div>
  )
}

export default DiscoverArticles