import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
import toast from "react-hot-toast";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import { CopyIcon } from "../../../svgs/svg";
import CommonTooltip from "../../ComonTooltip";
import Dropdown from "../../dropdown/dropdown";
import { ImageGeneration, useImageGeneration } from "../../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../../constants/image-generation-models-data";

const GeneratedImageModal = NiceModal.create(({ record, selectedIndex, setRemoveGeneratedImg }: { record: ImageGeneration, selectedIndex: number, setRemoveGeneratedImg: any }): JSX.Element => {
    const modal = useModal();

    const { setImageGeneration } = useImageGeneration()
    const handleCopyToClipboard = () => {
        if (!record?.prompt) {
            toast.error("No prompt available to copy.");
            return;
        }

        navigator.clipboard.writeText(record?.prompt)
            .then(() => {
                toast.success("Prompt copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy the prompt.");
            });
    };

    const router = useRouter()
    const selectedModelName = Image_Generation_Model_Data.find((model) => model.key === record.model)?.name ?? "";

    const handleGotoPrompt = () => {
        router.push("/image-generate");
        modal.hide();
        setImageGeneration(record);
    }

    return (
        <BasicModal show={modal.visible} hide={modal.hide} crosstyle="sm:!top-2 sm:!right-3 !text-white" closeTooltipText="Close" closeTooltipPosition="left">
            <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian2 !p-0 xl:w-[1000px] 2xl:w-[1210px]">
                <div className="grid sm:grid-cols-12">
                    <div className="xl:col-span-9 sm:col-span-7 sm:px-5 flex justify-center sm:border-r dark:border-blackRussian3 border-linkWater">
                        <figure className="max-w-[500px] max-h-[80vh] h-full">
                            <Image src={record.imageUrls?.[selectedIndex] ?? ""} alt="" width={590} height={740} className="w-full h-full object-contain" />
                        </figure>
                    </div>

                    <div className="xl:col-span-3 sm:col-span-5 p-4 flex flex-col mt-5">
                        <div className="flex justify-between gap-3 pb-4 mb-4 border-b dark:border-blackRussian3 border-linkWater">
                            <p className="dark:text-white text-xl">Generated Image</p>
                            {record._id ? <Dropdown recordId={record._id} imageUrl={record.imageUrls?.[selectedIndex] ?? ""} setRemoveGeneratedImg={setRemoveGeneratedImg}/> : <></>}
                        </div>

                        <div className="flex justify-between gap-3 mb-2.5">
                            <p className="dark:text-white text-xl">Prompt</p>
                            <CommonTooltip name="Copy" position="left" parentClassName="!group">
                                <button
                                    onClick={handleCopyToClipboard}
                                    className="dark:text-white rotate-90 cursor-pointer"
                                >
                                    <CopyIcon />
                                </button>
                            </CommonTooltip>
                        </div>

                        <div className="p-4 mb-4 rounded-md dark:bg-black bg-linkWater">
                            <p className="dark:text-manatee text-xs text-start">{record.prompt}</p>
                        </div>

                        <div className="grow">
                            <div className="grid grid-cols-2 gap-4 text-start mb-5">
                                <div>
                                    <span className="dark:text-stormGrey text-xs">Created</span>
                                    <p className="text-sm dark:text-white">
                                        {moment(record.createdAt).format('MM/DD/YYYY')}
                                    </p>

                                </div>

                                <div>
                                    <span className="dark:text-stormGrey text-xs">Model</span>
                                    <p className="text-sm dark:text-white">{selectedModelName}</p>
                                </div>

                                <div>
                                    <span className="dark:text-stormGrey text-xs">Resolution</span>
                                    <p className="text-sm dark:text-white">{record.size}</p>
                                </div>

                            </div>
                        </div>

                        <div className="">
                            <Button size="lg" onClick={handleGotoPrompt} className="!flex-none !w-full">Go to Prompt</Button>
                        </div>
                    </div>

                </div>

            </div>
        </BasicModal>
    );
});

export default GeneratedImageModal;
