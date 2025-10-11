import React from "react";
import BasicModal from "../../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Chat_Models_Display_data, Chat_Types } from "../../../../constants/chat-models-data";
import { v4 as uuidv4 } from "uuid";
import ImageComponent from "../../../global/imageComponent/ImageComponent";
import { useConversation } from "../../../../context/conversation.context";
import { HttpService } from "../../../../services/base.service";
import { EGptModels } from "../../../../enums/gpt-models.enum";
import { ArrowIcon } from '../../../../svgs/svg';
import { getModelImage } from '../../../../utils/chatUtils';
import { useTheme } from '../../../../context/themeContext';

const LlmSelectModal = NiceModal.create((props: { preSelectedType?: string } = {}) => {
    const modal = useModal();
    const { setSelected, setSelectedTabIdx, setSmartModel, setSelectedModel } = useConversation();
    const { isDarkMode } = useTheme();

    const handleSelectChat = (val: any) => {
        setSmartModel("");
        setSelected(val);
        setSelectedModel(val);
        setSelectedTabIdx(0);
        HttpService.setCookie("model", EGptModels.GPT_4);
        modal.hide();
    };

    // Automatically select Deep Research Agent if preSelectedType is provided
    React.useEffect(() => {
        if (props.preSelectedType) {
            const preSelectedItem = Chat_Types.find(item => item.key === props.preSelectedType);
            if (preSelectedItem) {
                handleSelectChat(preSelectedItem);
            }
        }
    }, [props.preSelectedType]);

    return (
        <BasicModal show={modal.visible} hide={modal.hide}>
            <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian2 p-6 md:p-10 lg:p-12 w-full max-w-[48rem] mx-auto relative">
                <div className='absolute flex gap-2 right-0 2xl:-right-32 -top-10'>
                    <span>
                        <ArrowIcon />
                    </span>
                    <p className='text-lavender -rotate-12'>Choose the chat model</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">AI Models</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {Chat_Models_Display_data.map((item: { img: string; name: string; key: string }) => (
                            <button
                                key={uuidv4()}
                                className="flex items-center gap-3 p-3 rounded-lg hover:opacity-90 transition-all duration-200 border border-linkWater dark:border-blackRussian3 shadow-sm bg-white dark:bg-blackRussian cursor-pointer"
                                onClick={() => handleSelectChat(item)}
                            >
                                <ImageComponent
                                    src={getModelImage(item, isDarkMode)}
                                    height={25}
                                    width={25}
                                    figClassName="shrink-0"
                                    className="rounded-md"
                                    alt={item.name}
                                />
                                <p className="fs-14 truncate">{item.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </BasicModal>
    );
});

export default LlmSelectModal;
