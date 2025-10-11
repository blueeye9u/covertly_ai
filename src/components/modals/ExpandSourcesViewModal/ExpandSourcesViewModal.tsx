import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BasicModal from "../../global/basicmodal/BasicModal";

const ExpandSourcesViewModal = NiceModal.create(({ imageUrls, currentIndex }: { imageUrls: string[]; currentIndex: number }): JSX.Element => {
    const modal = useModal();

    return (
        <BasicModal show={modal.visible} hide={modal.hide} close={modal.hide}>
            <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian2 !p-0 xs2:w-[300px] xs:w-[400px] w-[500px] sm:w-[640px] lg:w-[697px] relative">
                {/* Image Slider */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
                    initialSlide={currentIndex}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    modules={[Navigation]}
                >
                    {imageUrls.map((img: any, index: number) => (
                        <SwiperSlide key={uuidv4()}>
                            <figure className="w-full rounded-lg lg:h-[697px]">
                                <Image
                                    src={img.url}
                                    alt={`Expanded Image ${index}`}
                                    className="w-full h-full rounded-lg"
                                    height={390}
                                    width={540}
                                />
                            </figure>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Close Button */}
                <button
                    className="crossIconStyle absolute right-2 top-2 w-8 h-8 text-white flex justify-center items-center rounded-full cursor-pointer z-20"
                    onClick={modal.hide}
                >
                    <RxCross2 />
                </button>

                {/* Navigation Buttons */}
                <div className="swiper-button-prev crossIconStyle !w-10 !h-10 flex justify-center items-center rounded-full !-left-4 lg:!-left-[75px] absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer !text-sm text-black dark:text-white after:!text-[15px]">
                    {/* <BsArrowLeft /> */}
                </div>
                <div className="swiper-button-next crossIconStyle !w-10 !h-10  flex justify-center items-center rounded-full !-right-4 lg:!-right-[75px] absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer !text-sm text-black dark:text-white after:!text-[15px]">
                    {/* <BsArrowRight /> */}
                </div>
            </div>
        </BasicModal>
    );
});

export default ExpandSourcesViewModal;
