import React, { useState } from "react";
import Image from "next/image";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import "swiper/css";
import "swiper/css/navigation";
import BasicModal from "../../global/basicmodal/BasicModal";
import { CopyIcon, DownloadIcon } from "../../../svgs/svg";
import { downloadImage, copyImageLinkToClipboard } from "../../../utils/imageUtils";

const ExpandImageViewModal = NiceModal.create(({ imageUrls, currentIndex }: { imageUrls: string[]; currentIndex: number }): JSX.Element => {
    const modal = useModal();

    // State to track the current slide index
    const [activeIndex, setActiveIndex] = useState(currentIndex);

    return (
        <BasicModal show={modal.visible} hide={modal.hide} close={modal.hide} closeBtn overlayClass="!bg-opacity-50 !backdrop-blur-sm">

            <div className="rounded-2xl bg-gray dark:bg-blackRussian2 !p-0 xs2:w-[300px] xs:w-[400px] w-[500px] sm:w-[640px] lg:w-[697px] relative">
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
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Track active slide
                >
                    {imageUrls.map((img: string) => (
                        <SwiperSlide key={uuidv4()}>
                            <figure className="w-full rounded-t-lg lg:h-[697px] relative group">
                                <Image
                                    src={img}
                                    alt={`Expanded Image ${uuidv4()}`}
                                    className="w-full h-full rounded-t-lg object-contain"
                                    height={590}
                                    width={740}
                                    placeholder="blur"
                                    blurDataURL={img || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/AvWm5wAAAABJRU5ErkJggg=="}
                                />

                                <div className="p-4 gap-4 items-end absolute top-0 h-full rounded-xl image_opacity hidden group-hover:flex justify-end w-full">
                                    <button
                                        className="crossIconStyle w-10 h-10 text-white flex justify-center items-center rounded-full cursor-pointer bg-primary hover:bg-primary-dark"
                                        onClick={() => downloadImage(imageUrls[activeIndex])} // Download current slide's image
                                    >
                                        <DownloadIcon />
                                    </button>
                                    <button
                                        className="crossIconStyle w-10 h-10 text-white flex justify-center items-center rounded-full cursor-pointer bg-primary hover:bg-primary-dark"
                                        onClick={() => copyImageLinkToClipboard(imageUrls[activeIndex])} // Copy current slide's image link
                                    >
                                        <CopyIcon />
                                    </button>
                                </div>
                            </figure>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {imageUrls.length > 1 &&
                    (
                        <>
                            <div className="swiper-button-prev crossIconStyle !w-10 !h-10 flex justify-center items-center rounded-full !-left-4 lg:!-left-[75px] absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer !text-sm text-black dark:text-white after:!text-[15px]">
                            </div>
                            <div className="swiper-button-next crossIconStyle !w-10 !h-10 flex justify-center items-center rounded-full !-right-4 lg:!-right-[75px] absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer !text-sm text-black dark:text-white after:!text-[15px]">
                            </div>
                        </>)
                }
            </div>
        </BasicModal>
    );
});

export default ExpandImageViewModal;