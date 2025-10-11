import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { CustomizableIcon, Setting, SmartDetectionIcon } from '../../../svgs/svg'


const data=[
    {
        title:"Smart Detection",
        desc:"Leverages advanced AI to automatically identify and redact sensitive information, ensuring privacy without manual effort.",
        icon: <SmartDetectionIcon/>,
    },
    {
        title:"Customizable Rules",
        desc:"Allows users to create tailored redaction rules to meet specific compliance and security requirements, offering flexibility and control.",
        icon:<CustomizableIcon/>
    },
    {
        title:"Batch Processing",
        desc:"Streamlines the redaction process by handling multiple documents at once, saving time and enhancing operational efficiency.",
        icon:<Setting/>
    }
]
const FeaturesRedaction = () => {
  return (
    <div className='pb-10 md:pb-20 lg:pb-[110px] container-landingpage'>
        <h3 className='fs-48 text-center mb-4'>Key Features of Redaction</h3>
        <p className='max-w-[650px] mx-auto mb-12 text-center'>Explore Covertly&apos;s redaction capabilities, offering smart detection, customizable rules, and efficient batch processing to safeguard your sensitive data effortlessly.</p>

        <div className='grid sm:grid-cols-3 gap-6'>
            {
                data.map((item,i)=>(
                    <div key={uuidv4()} className='lg:p-10 p-5 rounded-[16px] border border-[#FFFFFF05] bg-whiteSmoke dark:bg-[#FFFFFF08]'>
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

export default FeaturesRedaction