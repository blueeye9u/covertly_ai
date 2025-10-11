import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const experts = [
  {
    img: "/assets/images/about-us/expert/01.png",
    name: "Rex Pacocha",
    post: "Head of Product Design",
  },
  {
    img: "/assets/images/about-us/expert/02.png",
    name: "Timothy Jack",
    post: "Lead Data Scientist",
  },
  {
    img: "/assets/images/about-us/expert/03.png",
    name: "Dwayne Walter",
    post: "Security Analyst",
  },
  {
    img: "/assets/images/about-us/expert/04.png",
    name: "Randall Erdman",
    post: "Marketing Manager",
  },
  {
    img: "/assets/images/about-us/expert/05.png",
    name: "Della Schumm",
    post: "Chief Technology Officer (CTO)",
  },
];

interface ArrowProps {
  onClick?: () => void;
}

const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute right-10 -top-10 lg:-top-20 transform bg-gray-800 dark:text-white p-2 shadow-lg hover:bg-gray-600 flex justify-center items-center rounded-full z-10"
      onClick={onClick}
    >
      <FaArrowLeft size={16} />
    </button>
  );
};

const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute right-0 -top-10 lg:-top-20 bg-gray-800 dark:text-white p-2 shadow-lg hover:bg-gray-600 flex justify-center items-center rounded-full z-10"
      onClick={onClick}
    >
      <FaArrowRight size={16} />
    </button>
  );
};

const MeetExpert = () => {
  const settings = {
    className: "center",
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: true,
    infinite: true,
    arrows: true,
    rtl: true,
    dots: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false },
      },
    ],
  };

  return (
    <div className="pb-10 md:pb-20 lg:pb-[110px] container-landingpage">
      <div className="p-4 sm:p-8 border border-[#FFFFFF05] rounded-[40px] bg-[#FFFFFF08]">
        <h4 className="fs-64 leading-tight">
          Meet the Experts <span className="sm:block">Behind Our Success</span>
        </h4>
        <p className="max-w-[653px] mb-12">
          Our team of experts is dedicated to pushing the boundaries of AI technology and privacy. With diverse backgrounds in AI, cybersecurity, and user experience, we are committed to delivering excellence.
        </p>
        <div className="w-full">
          <Slider {...settings} className="overflow-x-visible">
            {experts.map((item, index) => (
              <div key={uuidv4()} className="px-2 w-full">
                <figure className="w-full relative">
                  <Image 
                    src={item.img} 
                    width={256} 
                    height={342} 
                    alt={`Expert ${item.name}`} 
                    className="w-full rounded-2xl" 
                  />
                  <div className="absolute bottom-0 w-full p-6 expert-slider-gradient">
                    <p className="fs-22 font-medium text-white">{item.name}</p>
                    <span className="text-sm text-white">{item.post}</span>
                  </div>
                </figure>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MeetExpert;