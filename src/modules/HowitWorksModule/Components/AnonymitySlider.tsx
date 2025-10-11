import 'swiper/css';
import React from 'react';
import { v4 as uuidv4 } from "uuid";
import 'swiper/css/pagination';
import AnonymityCard from './AnonymityCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, } from 'swiper/modules';
import { AnonymityCovertlyData } from '../../../constants/anonymity-covertly-data';

const AnonymitySlider = () => {
  return (
    <div className='container-landingpage'>
        <Swiper
            slidesPerView={3}
            spaceBetween={24}
            // centeredSlides={true}
            modules={[Autoplay, Pagination,]}
            // autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false,
            // }}
            pagination={{
            clickable: true,
            }}
            breakpoints={{
                375: { slidesPerView: 1, },
                567: { slidesPerView: 2, },
                767: { slidesPerView: 3, },
            }}

            className="w-full anonymity_slider"
        >
       {AnonymityCovertlyData.map((anonymityItem, index) => (
            <SwiperSlide key={uuidv4()}>
                <AnonymityCard anonymityItem={anonymityItem} />
            </SwiperSlide>
        ))}

      </Swiper>
    </div>
  )
}

export default AnonymitySlider