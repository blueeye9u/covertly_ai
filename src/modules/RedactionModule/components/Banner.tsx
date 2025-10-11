// import Image from 'next/image'
import React from 'react'
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../../constants/routes'
import Link from 'next/link'
import useLoggedInStatus from '../../../hooks/useLoggedInStatus'
import RedactionBannerAnimation from './RedactionBannerAnimation'
import Image from 'next/image'
import { Button } from '../../../components/global/button/Button'
import { RightArrow } from '../../../svgs/svg'

const Banner = () => {
  const [isLoggedIn] = useLoggedInStatus();
  return (
    <div className='py-10 md:py-20 lg:py-[110px] container-landingpage'>
        <div className='flex flex-col justify-center items-center mb-16'>
            <p className='text-lg text-center text-[#30C5D2] mb-4'>Coming Soon</p>
            <h3 className='fs-64 text-center leading-tight mb-6'>Secure Your Data <span className='block'>with Automated Redaction</span></h3>
           <p className='text-[#FFFFFF] text-center mb-8'>Automatically redact sensitive information in real-time, ensuring your data remains secure and private.</p>
           <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
               <Button size='lg' className="btn rounded-full !min-w-auto !flex-none">Get Started with Redaction <span className='rotate-180'><RightArrow /></span></Button>
            </Link>
        </div>
    

          <div className='relative py-20 rounded-3xl bg-whiteSmoke dark:bg-[#FFFFFF14] overflow-hidden flex justify-center items-center'>
          <RedactionBannerAnimation/>
             <Image src={"/assets/images/redaction/bottom-wire.svg"} className='absolute top-0 left-0 w-1/4' width={462} height={231} alt='wire1'/>
            <Image src={"/assets/images/redaction/top-wire.svg"} className='absolute bottom-0 right-0 w-1/4' width={462} height={231} alt='wire2'/>
            <Image src={"/assets/images/redaction/redaction-banner.webp"} className='w-full flex lg:hidden z-10' width={1220} height={506} alt='wire1'/> 
          </div>
    </div>
  )
}

export default Banner