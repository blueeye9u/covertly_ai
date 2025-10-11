import Link from 'next/link'
import React from 'react'
import ImageComponent from '../../../components/global/imageComponent/ImageComponent'
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useTheme } from '../../../context/themeContext';
import useLoggedInStatus from '../../../hooks/useLoggedInStatus';
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../../constants/routes';


const HomeBanner = () => {
  const { isDarkMode } = useTheme();
  const [isLoggedIn] = useLoggedInStatus();
  return (
    <div className='container-landingpage'>
      <div className='pt-[50px] lg:pt-[100px] pb-[50px] flex flex-col'>
        <div className='mb-[72px] flex flex-col items-center justify-center'>
          <span className='text-xl text-black dark:text-[#E9E9EA] mb-3 text-center'>Effortlessly Streamline Your AI Workflow and Maximize productivity With Our Powerful LLMs.</span>
          <h1 className='fs-80 text-center dark:text-white'>Covertly AI is Completely</h1>
          <div className="banner_animation leading-none">
              <div className="animation_text text-gradient leading-none">Anonymous</div>
              <div className="animation_text text-gradient leading-none">Secure</div>
              <div className="animation_text text-gradient leading-none">Unmoderated</div>
          </div>
          {/* <div className='w-full'>
            <h2 className='leading-none opacity-0 w-full fs-80 font-bold'>Covertly.ai</h2>
          </div> */}
          <div className='w-full flex items-center justify-center mt-10'>
            <Link
              href={isLoggedIn? AUTHENTICATED_ROUTES.CHAT:UN_AUTHENTICATED_ROUTES.SIGNUP as string}
              className="btn btn-primary btn-lg py-3 text-center gap-2.5 max-w-44"
            >
              Get Started
              <IoArrowForwardCircleOutline className='text-2xl' />
            </Link>
          </div>
        </div>
        <ImageComponent
          priority
          className="w-full h-full object-cover"
          src={isDarkMode ?"/assets/images/banner-img.png":"/assets/images/banner-light-img.webp"}
          width={1200}
          height={750}
          alt="banner-image"
        />
      </div>
    </div>
  )
}

export default HomeBanner