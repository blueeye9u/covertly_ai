import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { AnonymitySvg, RealTimeIcon, RedactionSvg, SuperLLmIcon } from "../../svgs/svg";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

interface IProps {
    className?: string;
}

const FeaturesDropdown = ({ className }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    const Nav = [
        {
            title: "Anonymity",
            desc: "All users are private and secure.",
            icon: <AnonymitySvg />,
            href: "/features/anonymity",
        },
        {
            title: "Real-Time Answers",
            desc: "Instant Google API powered responses.",
            icon: <RealTimeIcon />,
            href: "/features/real-time-answers",
        },
        {
            title: "Elijah 1.0",
            desc: "Covertly AI's in-house Super LLM. ",
            icon: <SuperLLmIcon />,
            href: "/features/super-llm",
        },
        {
            title: "Auto Redaction",
            desc: "Efficient and automatic PII removal.",
            icon: <RedactionSvg />,
            href: "/features/redaction",
        },


    ];

    return (
        <Menu as="div" className={`relative inline-block px-5 lg:px-0 ${className}`}>
            <Menu.Button
                className="flex items-center gap-2 dark:text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                Features
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
                <Menu.Items className="shadow-3xl relative lg:absolute z-20 top-full lg:-left-24 xl:left-0 mt-4 lg:mt-2 w-full lg:w-[692px] rounded-lg bg-whiteSmoke dark:bg-blackRussian2 sm:p-8 grid sm:grid-cols-2 gap-8">
                    <ul className="space-y-8 w-full">
                        {Nav.map((item) => (
                            <Menu.Item key={uuidv4()}>
                                {({ active }) => (
                                    <button
                                        className={`flex w-full cursor-pointer items-start gap-3 text-sm dark:text-white duration-300 ${active ? "text-blue-500" : ""
                                            }`}

                                        onClick={() => { router.push(item.href) }}
                                    >
                                        <span className="w-11 h-11 p-[2px] flex justify-center items-center bg-gradient-to-r from-[#30C5D2] to-[#471069] rounded-xl shrink-0">
                                            <i className="w-full h-full bg-whiteSmoke dark:bg-blackRussian2 rounded-xl flex justify-center items-center">
                                                {item.icon}
                                            </i>
                                        </span>
                                        <div className="flex flex-col gap-1 items-start justify-start w-full">
                                            <p className="flex-shrink-0 font-medium">{item.title}</p>
                                            <span className="dark:text-manatee !text-left">{item.desc}</span>
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </ul>
                    <figure className="p-6 bg-light dark:bg-vulcan rounded-xl sm:flex hidden  flex-col">
                        <p className="dark:text-white mb-1">Feature Overview Video</p>
                        <span className="dark:text-[#A5A6A9] text-xs mb-4">
                            Watch a video highlighting Covertly&apos;s Real-Time Answers, Redaction, Super LLM, and Anonymity features.
                        </span>

                        <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
                            <iframe
                                loading="lazy" title="Gumlet video player"
                                src="https://play.gumlet.io/embed/67d0468a3ae6ee3ff9d480d3?preload=true&autoplay=true&loop=true&background=false&disable_player_controls=true"
                                style={{
                                    border: "none",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: "10px"
                                }}
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;">
                            </iframe>
                        </div>
                        {/* <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
                            <iframe
                                loading="lazy"
                                title="Gumlet video player"
                                src="https://play.gumlet.io/embed/67d0468a3ae6ee3ff9d480d3?preload=true&autoplay=true&loop=true&background=false&disable_player_controls=true"
                                style={{
                                    border: "none",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: "10px"
                                }}
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                            ></iframe>
                        </div> */}
                    </figure>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default FeaturesDropdown;
