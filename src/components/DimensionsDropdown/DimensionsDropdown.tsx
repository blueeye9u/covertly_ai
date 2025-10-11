import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { DALLE_DIMENSIONS } from "../../constants/image-size-map";

interface IProps {
  className?: string;
}

interface NavItem {
  title: string;
  onClick: () => void;
}

const DaleDimensionsDropdown = ({ className }: IProps) => {
  const { imageGeneration, setImageGeneration } = useImageGeneration()

  const handleSizeChange = (size: string): void => {
    setImageGeneration({ ...imageGeneration, size });
  }


  const Nav: NavItem[] = DALLE_DIMENSIONS.map(dimension => ({
    title: dimension,
    onClick: () => handleSizeChange(dimension),
  }));

  return (
    <Menu as="div" className={`relative inline-block w-full ${className}`}>
      <Menu.Button className="w-full flex justify-between items-center py-3.5 px-4 bg-linkWater dark:bg-blackRussian2 gap-2 dark:text-white rounded-md">
        {imageGeneration.size ?? "Dimension"}
        <span><IoIosArrowDown/></span>
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
          className={`shadow-3xl absolute top-full right-0 z-40 mt-2 w-full rounded-lg bg-linkWater dark:bg-blackRussian2 p-4 ${className}`}
        >
          <ul className="space-y-4">
            {Nav.map((item, i) => (
              <Menu.Item key={item.title}>
                {({ active }) => (
                  <button
                    className={`flex cursor-pointer items-center gap-3 text-sm dark:text-white duration-300 ${
                      active ? "text-blue-500" : ""
                    }`}
                    onClick={() => {
                      item.onClick();
                      // setSelected(item.title); // Set selected item on click
                    }}
                  >
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

export default DaleDimensionsDropdown;
