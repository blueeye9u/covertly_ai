
import React from 'react'
import Image from 'next/image';

const Banner = () => {
   
  return (
    <div className='py-10 flex flex-col justify-center items-center container-landingpage'>
       <div className='flex flex-col justify-center items-center text-center mb-10'>
            <h4 className='fs-40 mb-2 text-center'>Your Privacy — Our Priority</h4>
            <p className=''>{"Our platform brings the most advanced Large Language Models (LLMs) together in one simple, secure, and anonymous"} <span className='block'>{"experience. Built to protect your identity and streamline your workflow."}</span></p>
        </div>
        <figure className='mt-4 sm:mt-0'>
            <Image src={'/assets/images/how-it-works/banner.svg'} width={1140} height={524} alt="how-it-works-banner-image" className='object-center'/>
        </figure>
    </div>
  )
}

export default Banner