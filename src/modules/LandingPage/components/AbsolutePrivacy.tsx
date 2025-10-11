'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay} from 'swiper/modules';
import { Button } from '../../../components/global/button/Button';
import { RightArrow } from '../../../svgs/svg';

const AbsolutePrivacy = () => {
    return (
      <div className="mt-10 flex flex-col sm:mt-0">
        <div className="sm:hidden flex h-fit flex-col gap-6">
          {privacySliderData.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <Image
                src={item.icon}
                className="h-[72px] w-[72px]"
                alt={item.title}
                width={72}
                height={72}
              />
              <div className="flex flex-col">
                <span
                  className="mb-[6px] text-[24px] font-bold"
                  style={{ color: item.color }}
                >
                  {item.title}
                </span>
                <span className="mr-2 block text-[16px] font-light leading-tight text-white">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mb-[144px] mt-10 h-fit sm:mt-[228px] sm:h-screen">
          <div className="!absolute bottom-0 left-[-1000px] right-[-1000px] top-0 flex justify-center">
            <video
              controls={false}
              autoPlay
              loop
              muted
              playsInline
              className="h-[190px] bg-transparent sm:h-full"
            >
              <source src="/assets/videos/hall-small.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute inset-0">
            <section className="container-landingpage h-fit sm:h-full">
              <div className="flex h-[190px] items-center justify-end sm:h-full lg:justify-between">
                <div className="hidden h-[384px] w-[430px] rounded-[14px] lg:block mr-4">
                  <CustomSlider />
                </div>
                <div className="w-full md:w-[350px] lg:w-[540px]">
                  <div className="hidden font-bold leading-normal text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.35)] md:block md:text-[32px] lg:text-[48px]">
                    {`And it's all underscored by our core belief in`}
                    <span className="block leading-normal">
                      <span className="text-mediumTurquoise">
                        absolute privacy
                      </span>
                      <span className="text-white">.</span>
                    </span>

                    <div className="hidden h-[288px] w-[322px] md:mt-4 md:block lg:hidden">
                      <CustomSlider />
                    </div>
                    <div className="flex justify-center md:mt-4 md:justify-start lg:mt-[72px]">
                      <div className="inline">
                        <Link href="#">
                            <Button size='lg' className="btn rounded-full !min-w-auto !flex-none text-black" color='secondary'>
                                See How It Works{` `}
                                <span className='rotate-180 pb-1'><RightArrow/></span>
                            </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
}

const privacySliderData = [
    {
        id: 1,
        title: 'Full Anonymity',
        icon: '/assets/images/svgs/key.svg',
        description: 'Login via email for convenience or secret key for privacy and security.',
        color: '#33DC79'
    },
    {
        id: 2,
        title: 'Data Protection',
        icon: '/assets/images/svgs/icon-data-protection.svg',
        description: 'Secure all your information with advanced end-to-end encryption.',
        color: '#E1F038'
    },
    {
        id: 3,
        title: 'Data Deletion',
        icon: '/assets/images/svgs/icon-data-deletion.svg',
        description: 'Set expirations for chats, images, and files and they\'re gone forever.',
        color: '#DD305B'
    }
];

const CustomSlider = () => {
    return <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        loop={true}
        className='size-full bg-[#101217E6]'
        spaceBetween={30}
        slidesPerView={1}
        freeMode={true}
    >
        {privacySliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
                <div className='h-full flex flex-col'>
                    <div className='size-[60px] lg:size-[104px] rounded-full bg-black ml-[24px] lg:ml-[48px] mt-[24px] lg:mt-[48px]'/>
                    <div className='flex-1 ml-[24px] lg:ml-[48px]'>
                        <div 
                            className='text-[24px] lg:text-[32px] font-bold mb-[6px] lg:mb-[10px]'
                            style={{ color: slide.color }}
                        >
                            {slide.title}
                        </div>
                        <span className='block mr-2 leading-tight lg:leading-none text-white text-[20px] lg:text-[24px] font-light'>
                            {slide.description}
                        </span>
                    </div>
                    <div 
                        className='h-[4px] lg:h-[8px] mb-10 lg:mb-[70px]'
                        style={{ backgroundColor: slide.color }}
                    />
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
}

export default AbsolutePrivacy