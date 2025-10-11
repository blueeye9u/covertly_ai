import Image from 'next/image'
import React from 'react'
import { Button } from '../../../components/global/button/Button'

const Banner = () => {
  return (

    <div className='py-10 md:py-20 lg:py-[110px] container-landingpage'>
      <div className='flex flex-col justify-center items-center mb-16'>
        <h3 className='fs-64 text-center leading-tight mb-6'>Our Story of <span className='block'>Innovation and Privacy</span></h3>
        <p className='dark:text-[#FFFFFF] text-center max-w-[642px] mx-auto mb-8'>Covertly AI was founded with a vision to revolutionize privacy in digital interactions. Our cutting-edge AI solutions ensure secure, anonymous conversations, empowering users to communicate with confidence.</p>
        <Button size='lg' color='secondary' className="btn !rounded-md !min-w-auto !flex-none relative !py-4 !text-blackRussian2">Discover Our Journey</Button>
      </div>

      <figure>
        <Image src={"/assets/images/about-us/banner.svg"} className='w-full z-10' width={1220} height={660} alt='about us banner' />
      </figure>
    </div>
  )
}

export default Banner