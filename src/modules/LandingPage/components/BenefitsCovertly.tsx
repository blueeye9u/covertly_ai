import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from "uuid";
import { BenefitsCovertlyData } from '../../../constants/benefits-covertly-data';
import 'swiper/swiper-bundle.css';

const BenefitsCovertly = () => {
  return (
    <section className="benefits__covertly pt-[50px] sm:pb-20">
      <div className="container-landingpage">
        <h4 className="fs-40 mb-2 text-center">Why Covertly?</h4>
        <p className="max-w-[624px] mx-auto mb-10">
          Our platform integrates multiple large language models (LLMs) into a single, intuitive interface, enhancing the overall user experience while keeping your identity anonymous and secure. 
        </p>
        <div className="sm:hidden flex">
          <Swiper
            spaceBetween={10}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
                delay: 500,
                disableOnInteraction: false,
            }}
          >
            {BenefitsCovertlyData.map((item) => (
              <SwiperSlide key={uuidv4()} className='flex'>
                <div className="p-4 rounded-xl bg-white dark:bg-atlantis1 flex flex-col h-full shadow-sm">
                  <span className="mb-4 text-black dark:text-white">{item.icon}</span>
                  <h5 className="mb-4">{item.title}</h5>
                  <p className="text-black dark:text-spindle">{item.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {BenefitsCovertlyData.map((item) => (
            <div key={uuidv4()} className="p-6 rounded-xl bg-white dark:bg-atlantis1 flex flex-col shadow-sm">
              <span className="mb-4 text-black dark:text-white">{item.icon}</span>
              <h5 className="mb-4">{item.title}</h5>
              <p className="text-black dark:text-spindle">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsCovertly;
