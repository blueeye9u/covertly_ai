import React from "react";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Image from "next/image";
import { images } from "../../../assets/images";
import { useTheme } from "../../../context/themeContext";


const CovertlyAiModal = NiceModal.create((): JSX.Element => {
    const modal = useModal();
    const { isDarkMode } = useTheme();

    return (
        <BasicModal show={modal.visible} hide={modal.hide} crosstyle="top-8 right-8">
            <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian2 p-[18px] sm:w-[643px]">
                <div className="w-full border border-dashed border-[#34A1BD] rounded-[10px] py-6 px-9 flex flex-col justify-center items-center">
                    <figure className="mb-8 mx-auto">
                       <Image src={isDarkMode ? images.lightLogo : images.logo} alt="logo" width={139} height={28}/>
                    </figure>
                      <div className="flex items-center gap-2.5 mb-4">
                        <h6 className="fs-48 xs:text-xl">Covertly.AI is in</h6>
                        <Button size="sm" className="sm:!fs-48 text-xl btn !font-bold !py-2 sm:!py-4 !px-2 !rounded-md !cursor-default">Beta!</Button>
                      </div>
                      <p className="dark:text-[#D5D5D5] text-sm mb-6">We&apos;re actively developing new features and refining the platform to ensure the best experience. During this phase, some functionalities may not work as expected.</p>

                      <div className="grid sm:grid-cols-12 grid-cols-2 xs:grid-cols-1 gap-5 w-full mb-8">
                          <div className="sm:col-span-4 p-3 border border-[#30C3D1] rounded-lg">
                            <p className="text-sm dark:text-white">Anticipated Launch</p>
                            <span className="text-[#30C4D1] fs-20">April 2025</span>
                          </div>
                          <div className="sm:col-span-8 p-3 border border-[#30C3D1] rounded-lg">
                          <p className="text-sm dark:text-white">Early Users</p>
                          <span className="text-[#30C4D1] fs-20">Free Beta Access for Testers!</span>
                          </div>
                      </div>

                      <p className="dark:text-[#D5D5D5] mb-3 text-sm text-center max-w-[440px] mx-auto">We&apos;re inviting beta testers to get free access to Covertly.AI and be part of shaping its future! Your feedback is invaluable in helping us refine and deliver the best version at launch.</p>
                      <p className="dark:text-[#D5D5D5] text-sm text-center mb-10 max-w-[440px] mx-auto">Thank you for your patience and support—we&apos;re building something amazing together!</p> 

                      <h4 className="fs-22 mb-1">Want to join the BETA Tester team?</h4>
                      <span className="text-base">DM us on Instagram @covertly.ai </span>
                </div>
             
            </div>
        </BasicModal>
    );
});

export default CovertlyAiModal;
