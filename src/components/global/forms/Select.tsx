import { Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Listbox, Transition } from "@headlessui/react";
import ImageComponent from "../imageComponent/ImageComponent";
import GptTooltip from "../../GptTooltip";
import { getModelImage } from "../../../utils/chatUtils";
import { useTheme } from "../../../context/themeContext";
interface Iprops {
  selected: any;
  setSelected: any;
  Data?: any;
  iconClass?: string;
  placeholder?: any;
  className?: any
  disabled?: boolean;
  hideIcon?: any;
  selectedClass?:any
}

const SelectComponent = ({
  Data,
  iconClass,
  placeholder,
  selected,
  setSelected,
  className,
  disabled,
  hideIcon,
  selectedClass
}: Iprops) => {
  const { isDarkMode } = useTheme();
  
  return (
    <Listbox disabled={disabled} as="div" className={"w-full relative"} value={selected} onChange={setSelected}>
      {
        Data.map((item: any) => (
          (selected?.version ? selected?.version == item?.version : item.key == selected?.key) && (
            <GptTooltip position="bottom" name={`${selected?.name}` + (selected?.version ? `-${selected?.version}` : "")} des={item?.des} img={item?.img} key={item.key}>
              <Listbox.Button className={`${className} relative flex items-center justify-between rounded-md bg-whiteSmoke dark:bg-blackRussian3 md:dark:bg-blackRussian py-2 w-full md:w-32 px-3 pr-10 sm:pr-0 text-left text-sm focus:outline-none font-medium`}>
                <div
                  className={`block truncate  dark:text-white`}
                >
                  {
                    selected?.name ?
                      <div className="flex gap-3 items-center">
                        <ImageComponent src={getModelImage(selected, isDarkMode)} width={22} height={22} className="rounded-sm" />
                        <span className={`truncate dark:text-white sm:block hidden ${selectedClass}`}>{selected?.name} {selected?.version && `-${selected?.version}`}</span>
                      </div> : placeholder
                  }
                </div>
                {!hideIcon && <span className="absolute flex items-center pointer-events-none inset-y-1/2 right-2">
                  <i
                    className={`${iconClass ?? ""} text-xl dark:text-white`}
                    aria-hidden="true"
                  >
                    <IoIosArrowDown />
                  </i>
                </span>}
              </Listbox.Button>
            </GptTooltip>
          ))
        )
      }

      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          className={`absolute z-10 -top-[13.5rem] md:top-full mt-2 max-h-[20.5rem] w-full overflow-auto rounded-md bg-whiteSmoke dark:bg-blackRussian2 text-base focus:outline-none`}>
          {Data.map((item: any) => {
            return (
              <div key={item.key}>
                <Listbox.Option
                  className={({ active }: any) =>
                    `relative cursor-pointer select-none py-2 px-3.5 ${active ? "bg-white dark:bg-blackRussian" : ""
                    }`
                  }
                  value={item}
                >
                  <div className="flex gap-3 items-center">
                    <ImageComponent src={getModelImage(item, isDarkMode)} width={22} height={22} className="rounded-sm" />
                    <span className="truncate dark:text-white">{item.name}</span>
                  </div>
                </Listbox.Option>
              </div>
            );
          })}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}

export default SelectComponent;