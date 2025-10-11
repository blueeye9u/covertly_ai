import React, { useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ShimmerImage from "../ShimmerImage/ShimmerImage";
import { useRouter } from "next/router";
import NiceModal from "@ebay/nice-modal-react";
import { v4 as uuidv4 } from "uuid";
import { images } from "../../../assets/images";
import { getCookie } from "../../../utils/getCookie";
import { RightCircleArrow, Setting } from "../../../svgs/svg";
import { useConversation } from "../../../context/conversation.context";
import { useTheme } from "../../../context/themeContext";
import { useImageGeneration } from "../../../context/imageGeneration.context";
import useLoggedInUser from "../../../hooks/useLoggedInUser";

interface IProps {
  imgUrl: string;
  className?: string;
  fullNameClass?: string;
  btnClass?:string
  imgClass?:string
}

const UserDropDown = ({ imgUrl, className, fullNameClass,btnClass, imgClass }: IProps) => {
  const {
    changeChatLoading,
    startChatLoading,
    deleteChatLoading,
    fetchingData,
    selectedModelLoading,
    generatingMessage,
    generatingPDFChats
  } = useConversation();
  const isAnyLoading = deleteChatLoading || fetchingData || selectedModelLoading || generatingMessage || changeChatLoading || startChatLoading || generatingPDFChats;
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { imageGeneration } = useImageGeneration();
  const [,, selectedImage] = useLoggedInUser();

  const Nav = [
    {
      title: "General Settings",
      icon: <Setting />,
      onClick: () => router.push("/settings"),
    },
    {
      title: "Log Out",
      icon: <RightCircleArrow />,
      onClick: () => NiceModal.show("logoutModal"),
    },
  ];

  const FULL_NAME = getCookie("fullName")?.split("_").join(" ") ?? "";

  useEffect(() => {
  }, [isAnyLoading]);

  return (
    <Menu as="div" className={`relative inline-block ${className}`}>
      <Menu.Button
        className={`flex items-center gap-2 md:h-7 md:w-7 w-10 h-10 ${imageGeneration?.isImageGenerating ? "cursor-not-allowed" : ""} ${btnClass}`}
        onClick={(e) => {
          if (isAnyLoading) {
            e.preventDefault(); // Prevent dropdown toggle
            NiceModal.show("ResponseInProgressModal");
          }

          if (imageGeneration.isImageGenerating) {
            e.preventDefault(); // Prevent dropdown toggle
          }
        }}
      >
        <figure className={`md:h-7 md:w-7 w-10 h-10 overflow-hidden rounded-full relative ${imgClass}`}>
          <ShimmerImage
            priority
            width={64}
            height={64}
            alt="User Image"
            src={selectedImage || (isDarkMode ? images.avatar : images.lightAvatar)}
            className="h-full w-full object-cover"
          />
        </figure>
        {router.pathname === "/chat" && (
          <p className={`block text-sm dark:text-white md:hidden ${fullNameClass}`}>{FULL_NAME}</p>
        )}
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
          className={`${router.pathname === "/chat"
            ? "-right-[9rem] md:right-0 -top-[100px] md:top-full"
            : "top-full right-0"
            } shadow-3xl absolute z-40 mt-2 w-44 rounded-lg bg-whiteSmoke dark:bg-blackRussian2 p-4 ${className}`}
        >
          <Menu as={"ul"} className="space-y-4">
            {Nav.map((item) => (
              <Menu.Item key={uuidv4()} as={"ul"} onClick={item.onClick}>
                <li className="flex cursor-pointer items-center gap-3 text-sm dark:text-white duration-300">
                  {item.icon && <i>{item.icon}</i>}
                  <span className="flex-shrink-0">{item.title}</span>
                </li>
              </Menu.Item>
            ))}
          </Menu>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropDown;
