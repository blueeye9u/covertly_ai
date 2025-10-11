import { useEffect } from "react";
import { Listbox } from "@headlessui/react";
import ImageComponent from "../../global/imageComponent/ImageComponent";
import { CrossIcon, PlusIcon } from "../../../svgs/svg";
import { Elijah_Model_Selection_Data } from "../../../constants/chat-models-data";
import { useConversation } from "../../../context/conversation.context";
import CommonTooltip from "../../ComonTooltip";
import { getModelImage } from "../../../utils/chatUtils";
import { useTheme } from "../../../context/themeContext";

interface IProps {
  optionsClass?: string;
}

export default function ChatMultiSelect({
  optionsClass,
}: Readonly<IProps>) {
  const {
    elijahModels,
    setElijahModels,
    routerId,
  }: {
    elijahModels: any[];
    setElijahModels: React.Dispatch<React.SetStateAction<any[]>>;
    routerId: string;
  } = useConversation();

  const { isDarkMode } = useTheme();

  const toggleOption = (option: any) => {
    setElijahModels((prev: any) =>
      prev.some((selected: any) => selected.key === option.key)
        ? prev.filter((selected: any) => selected.key !== option.key)
        : [...prev, option],
    );
  };

  useEffect(() => {
    if (elijahModels.length === 0) {
      setElijahModels([
        { ...Elijah_Model_Selection_Data[0] },
        { ...Elijah_Model_Selection_Data[1] },
      ]);
    }
  }, [elijahModels, setElijahModels]);

  const handleModelSelect = (opt: any) => {
    setElijahModels((prev) =>
      prev.filter((item: any) => item?.key !== opt?.key),
    );
  };

  return (
    <div className="relative inline-block w-full max-w-full p-2 sm:p-3 md:p-4">
      <Listbox>
        {!routerId && (
          <Listbox.Button
            className={`flex items-center gap-2 px-2 py-1.5 
              w-full max-w-full
              rounded-lg border border-linkWater 
              dark:border-blackRussian3 dark:text-white ${
                elijahModels.length === Elijah_Model_Selection_Data.length 
                  ? 'cursor-default' 
                  : 'cursor-pointer'
              }`}
            onClick={(e) => {
              if (elijahModels.length === Elijah_Model_Selection_Data.length) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {/* Add button */}
            <span className={`w-6 h-6 flex justify-center items-center rounded-full border border-linkWater dark:border-white shrink-0 ${
              elijahModels.length === Elijah_Model_Selection_Data.length 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer'
            }`}>
              <PlusIcon />
            </span>

            {/* Selected models */}
            <div
              className={`flex gap-2 w-full max-w-[calc(100%-60px)] 
                overflow-x-auto flex-nowrap items-center
                scrollbar-hide   /* hide scrollbars */
                ${optionsClass}`}
            >
              {elijahModels.map((opt: any) => (
                <span
                  key={opt.key}
                  className="flex items-center gap-2 shrink-0 rounded-md bg-linkWater50 dark:bg-blackRussian2 
                  text-[11px] sm:text-xs md:text-sm 
                  px-2 py-1 sm:px-3 sm:py-2"
                >
                  {/* Model image */}
                  <ImageComponent
                    src={getModelImage(opt, isDarkMode)}
                    height={18}
                    width={18}
                    figClassName="shrink-0"
                    className="rounded-md"
                    alt="chat"
                  />

                  {/* Show name only on sm+ screens */}
                  <span className="hidden sm:inline truncate max-w-[100px] md:max-w-[140px]">
                    {opt.name}
                  </span>

                  {/* Remove button */}
                  {elijahModels.length >= 2 &&
                    (elijahModels.length === 2 ? (
                      <CommonTooltip
                        position="bottom"
                        name="Elijah requires minimum of two LLMs to work."
                      >
                        <button disabled className="opacity-40 cursor-not-allowed">
                          <CrossIcon className="w-4 h-4 text-[#62646A]" />
                        </button>
                      </CommonTooltip>
                    ) : (
                      <button
                        onClick={() => handleModelSelect(opt)}
                        className="cursor-pointer"
                      >
                        <CrossIcon className="w-4 h-4 text-[#62646A]" />
                      </button>
                    ))}
                </span>
              ))}
            </div>
          </Listbox.Button>
        )}

        {/* Dropdown options */}
        {elijahModels.length !== Elijah_Model_Selection_Data.length && (
          <Listbox.Options className="absolute left-0 z-20 mt-2 w-[148px] rounded-lg border border-linkWater dark:border-[#FFFFFF08] bg-linkWater50 dark:bg-blackRussian2 shadow-lg py-2.5">
            {Elijah_Model_Selection_Data.filter(
              (model: any) =>
                !elijahModels.some(
                  (selectedModel: any) => selectedModel.key === model.key,
                ),
            ).map((option) => (
              <button
                key={option.key}
                className="flex w-full items-center gap-4 px-3 py-2.5 cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <ImageComponent
                  src={getModelImage(option, isDarkMode)}
                  height={22}
                  width={22}
                  figClassName="shrink-0"
                  className="rounded-md"
                  alt="chat"
                />
                <span className="text-sm dark:text-white">{option.name}</span>
              </button>
            ))}
          </Listbox.Options>
        )}
      </Listbox>
    </div>
  );
}
