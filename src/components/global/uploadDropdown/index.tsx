import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UploadFilesIcon, UploadImageIcon, UploadAudioIcon, PlusIcon } from "../../../svgs/svg";

interface IProps {
    className?: any;
}

const UploadDropDown = ({ className }: IProps) => {

    const Nav = [
        {
            title: "Upload PDF Files",
            icon: <UploadFilesIcon />,
            
           
        },
        {
            title: "Upload Image",
            icon: <UploadImageIcon />,
            
          
        },
        {
            title: "Upload Audio",
            icon: <UploadAudioIcon />,
            
           
        },

    ];

    const handleFileUpload = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const input = document.getElementById(`file-input-${index}`) as HTMLInputElement;
        if (input) {
            input.click();
        }
    };

    return (
        <Menu as="div" className={`relative inline-block ${className}`}>
            <Menu.Button className="flex items-center justify-center shrink-0 gap-2 w-8 h-8 rounded-full bg-whiteSmoke dark:bg-blackRussian2 dark:text-white">
                <PlusIcon />
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
                    className={`shadow-3xl absolute right-0 z-40 bottom-11 -left-2 w-44 rounded-lg bg-whiteSmoke dark:bg-vulcan p-4`}
                >
                    <Menu as={"ul"} className="space-y-4">
                        {Nav.map((item, i) => (
                            <Menu.Item key={item.title} as={"ul"}>
                                <button
                                    className="flex relative cursor-pointer items-center gap-3 text-sm dark:text-white duration-300"
                                    onClick={(event) => handleFileUpload(event, i)}
                                >
                                    {item.icon && <i>{item.icon}</i>}
                                    <span className="flex-shrink-0">{item.title}</span>
                                    <input type="file" id={`file-input-${i}`} className="invisible absolute h-full w-full" />
                                </button>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default UploadDropDown;
