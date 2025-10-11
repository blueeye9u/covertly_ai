import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import {  KnowledgeHubIcon } from "../../svgs/svg";

interface IProps {
    className?: string;
}

const ResourcesDropdown = ({ className }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const router= useRouter()

    const Nav = [
        {
            title: "Knowledge Hub",
            desc: "Covertly's AI and privacy innovations.",
            icon: <KnowledgeHubIcon />,
            href:"/knowledge-hub",
        },
        {
            title: "FAQs & Support",
            desc: "Faqs",
            icon: <KnowledgeHubIcon />,
            href:"/faqs",
        }
    ];

    return (
        <Menu as="div" className={`relative inline-block px-5 lg:px-0 ${className}`}>
            <Menu.Button
                className="flex items-center gap-2 dark:text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                Resources
                <IoIosArrowDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                afterLeave={() => setIsOpen(false)} // Reset state after closing
            >
                <Menu.Items className="shadow-3xl relative lg:absolute z-10 top-full left-0 mt-4 w-full lg:w-[170px] rounded-lg bg-whiteSmoke dark:bg-blackRussian2 sm:p-8">
                    <ul className="space-y-8 w-full">
                        {Nav.map((item) => (
                            <Menu.Item key={uuidv4()}>
                                {({ active }) => (
                                    <button
                                        className={`flex w-full cursor-pointer items-center gap-3 text-sm dark:text-white duration-300 ${
                                            active ? "text-blue-500" : ""
                                        }`}

                                        onClick={()=>{router.push(item.href)}}
                                    >
                                        <div className="flex flex-col gap-1 items-start justify-start w-full">
                                            <p className="flex-shrink-0 font-medium">{item.title}</p>
                                        </div>
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

export default ResourcesDropdown;
