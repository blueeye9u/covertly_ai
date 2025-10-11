import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { AnonymousIcon, EncryptionIcon, MultifactorAuthenticationIcon } from '../../../svgs/svg'


const data=[
    {
        title:"Anonymous Interaction",
        desc:"Covertly AI lets you interact freely without revealing personal details. Your identity stays fully protected, ensuring complete privacy in every conversation.",
        icon: <AnonymousIcon/>,
    },
    {
        title:"Data Purging",
        desc:"Ensure your privacy with data purging. This feature allows you to permanently delete your data, ensuring no traces remain on our servers. Take control of your information and maintain complete confidentiality.",
        icon:<MultifactorAuthenticationIcon/>
    },
    {
        title:"End-to-End Encryption",
        desc:"Your conversations stay private from start to finish. With Covertly AI’s end-to-end encryption, only you can access your messages—no third parties, no data storage, no exceptions.",
        icon:<EncryptionIcon/>
    }
]
const FeaturesAnonymity = () => {
  return (
    <div className='pb-10 md:pb-20 lg:pb-[110px] container-landingpage'>
        <h3 className='fs-48 text-center mb-4'>Key Features of Anonymity</h3>
        <p className='max-w-[483px] mx-auto mb-12 text-center'>Covertly ensures your conversations stay private with top-tier encryption and full anonymity. Your data is always in your control.</p>

        <div className='grid sm:grid-cols-3 gap-6'>
            {
                data.map((item)=>(
                    <div key={uuidv4()} className='lg:p-8 p-5 rounded-[16px] border border-[#FFFFFF05] bg-whiteSmoke dark:bg-[#FFFFFF08]'>
                        <div className='flex md:flex-row flex-col gap-4 md:items-center md:mb-6 mb-3'>
                            <span className='w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-r from-[#30C5D2] to-[#471069] text-white'>{item.icon}</span>
                            <p className='dark:text-white text-xl'>{item.title}</p>
                        </div>
                        <p className='dark:text-lavender'>{item.desc}</p>
                    </div>

                ))
            }
        </div>

    </div>
  )
}

export default FeaturesAnonymity