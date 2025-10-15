
import React from 'react'
import Image from 'next/image';

const Banner = () => {
   
  return (
    <div className='py-10 flex flex-col justify-center items-center container-landingpage'>
       <div className='flex flex-col justify-center items-center text-center mb-10'>
        <h4 className='fs-64 mb-2 text-center'>Secure and Anonymous Financial Analysis with <span className="text-[#30C5D2]">Covertly AI</span></h4>
      </div>
      <figure className='mt-4 sm:mt-0'>
        <Image src={'/assets/images/use-cases/banner.png'} width={1296} height={790} alt="how-it-works-banner-image" className='object-center'/>
      </figure>
    </div>
  )
}

export default Banner