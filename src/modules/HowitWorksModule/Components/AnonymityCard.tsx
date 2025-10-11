import React from 'react'
import ImageComponent from '../../../components/global/imageComponent/ImageComponent'

const AnonymityCard = ({anonymityItem}:any) => {
  return (
    <div className='flex flex-col gap-6'>
        <ImageComponent src={anonymityItem.img} width={373} height={217}  figClassName='w-full h-full rounded-2xl' className='w-full h-full rounded-2xl'/>
        <div className='flex flex-col gap-2'>
            <h3 className='fs-20 font-semibold'>{anonymityItem.title}</h3>
            <p className='text-sm text-stormGrey'>{anonymityItem.desc}</p>
        </div>
    </div>
  )
}

export default AnonymityCard