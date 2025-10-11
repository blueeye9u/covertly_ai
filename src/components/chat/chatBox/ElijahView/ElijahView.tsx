
import React from 'react'
import ImageComponent from '../../../global/imageComponent/ImageComponent'
import { Chat_Models_Display_data } from '../../../../constants/chat-models-data';
import ElijahAnswer from './elijahAnswer';
import { CovertlyIcon, CovertlyLightIcon } from "../../../../svgs/svg";
import { getModelImage } from '../../../../utils/chatUtils';
import { useTheme } from '../../../../context/themeContext';

const ElijahView = ({ conversationMessages, index, fetchingData, generateSuperResponse, lastIndex }: { conversationMessages: any, index: any, fetchingData: any, generateSuperResponse: any, lastIndex: number }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className='mb-6'>
            <div className="mb-6 flex items-center">
                {isDarkMode ? <CovertlyIcon /> : <CovertlyLightIcon />}
                <p className="text-gradient !mb-0 text-sm font-semibold">Covertly AI</p>
            </div>
            <div className={`${conversationMessages.length===2 || conversationMessages.length===4 ? "md:grid-cols-2" :" xl:grid-cols-3 md:grid-cols-2"} grid gap-2 mb-6`}>
                {
                    conversationMessages.map((message: any) => {
                        const modelDisplayData = Chat_Models_Display_data.find((model: any) => model.key === message?.model);

                        return <div key={modelDisplayData?.key}
                            className='p-5 themeScrollbar bg-whiteSmoke dark:bg-blackRussian2 rounded-lg max-h-[456px] overflow-y-auto'
                        >
                            <div className='flex gap-2.5 items-center mb-6'>
                                <ImageComponent src={getModelImage(modelDisplayData, isDarkMode)} height={20} width={20} figClassName="shrink-0" className="rounded-md" alt="chat" />
                                <p className='text-sm font-medium'>{modelDisplayData?.name}</p>
                            </div>

                            <ElijahAnswer message={message} index={index} fetchingData={fetchingData} lastIndex={lastIndex} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ElijahView
