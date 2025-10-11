import React from 'react'
import { Chat_Model_data } from '../../constants/chat-models-data'
import ImageComponent from '../global/imageComponent/ImageComponent'
import { getModelImage } from '../../utils/chatUtils'
import { useTheme } from '../../context/themeContext'

const ChatModel = ({ selected }: any) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div>
      {selected &&
        Chat_Model_data.map((item, i) => (
          item.key == selected?.key && (
            <div key={item.key} className='p-5 flex gap-3 bg-whiteSmoke dark:bg-blackRussian3 rounded-md max-w-[600px] m-auto'>
              <ImageComponent src={getModelImage(item, isDarkMode)} height={30} width={30} figClassName="shrink-0" className="rounded-md" alt={`chat-image-${item.key}`} />
              <div className='flex flex-col items-start'>
                <h6 className="fs-18">{item.name}</h6>
                <p>{item.des}</p>
              </div>
            </div>
          )
        ))
      }
    </div>
  )
}

export default ChatModel