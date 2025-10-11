import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const ChatSkelton = () => {
  return (
   <SkeletonTheme baseColor="#202020" highlightColor="#444">
   <div className='w-full'>
     <Skeleton count={2} className='w-full mb-3' height={30}/>
   </div>
   <div className='w-2/4'>
   <Skeleton count={1} className='w-1/2 mb-3' height={30}/>
   </div>
 </SkeletonTheme>
  )
}

export default ChatSkelton