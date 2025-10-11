import React, {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import toast from "react-hot-toast";
import {NewDownloadIcon, ThreeDotsIcon, CopyImageIcon, DelIcon} from "../../svgs/svg";
import { downloadImage, copyImageLinkToClipboard } from "../../utils/imageUtils";
import NiceModal from "@ebay/nice-modal-react";
import {imageGenerationService} from "../../services/image-generate";

interface IProps {
    className?: string;
    imageUrl: string;
    recordId: string;
    setRemoveGeneratedImg: any;
}

const Dropdown = ({className, recordId, imageUrl, setRemoveGeneratedImg}: IProps) => {
    const handleGeneratedImage = async () => {
        NiceModal.show("imageDeleteModal", {
            onConfirm: async () => {
                try {
                    await imageGenerationService.deleteSelectedImageUrls({ items: [{recordId, imageUrl}]});
                    toast.success("Selected image deleted successfully");
                    setRemoveGeneratedImg(true);
                } catch (error) {
                    console.error("Failed to delete selected image:", error);
                    toast.error("Failed to delete selected image");
                }
            },
            selectedCount: 1
        });
    }
    const Nav = [
        {
            title: "Download",
            icon: <NewDownloadIcon/>,
            onClick: () => imageUrl && downloadImage(imageUrl),
        },
        {
            title: "Copy Link",
            icon: <CopyImageIcon/>,
            onClick: () => imageUrl && copyImageLinkToClipboard(imageUrl),
        },
        {
            title: "Remove",
            icon: <DelIcon/>,
            onClick: () => handleGeneratedImage()
        }
    ];

    return (
        <Menu as="div" className={`relative inline-block ${className}`}>
            <Menu.Button className="flex items-center gap-2 dark:text-white rotate-90">
                <ThreeDotsIcon/>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={`shadow-3xl absolute top-full right-0 z-40 mt-2 w-44 rounded-lg bg-light dark:bg-vulcan p-4 ${className}`}
                >
                    <ul className="space-y-4">
                        {Nav.map((item, i) => (
                            <Menu.Item key={item.title}>
                                {({ active }) => (
                                    <button
                                        tabIndex={i}
                                        className={`flex cursor-pointer items-center gap-3 text-sm dark:text-white duration-300 ${
                                            active ? "text-blue-500" : ""
                                        }`}
                                        onClick={item.onClick}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                item.onClick();
                                            }
                                        }}
                                    >
                                        {item.icon && <i className="dark:text-manatee">{item.icon}</i>}
                                        <span className="flex-shrink-0">{item.title}</span>
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </ul>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Dropdown;