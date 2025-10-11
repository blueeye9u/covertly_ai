import React from 'react'
import { v4 as uuidv4 } from "uuid";

const data=[
    {
        title:"Global Leadership in Privacy",
        desc:"Our goal is to become the foremost authority in privacy-focused AI, setting a global benchmark for secure digital communication.",
        no:"01"
    },
    {
        title:"Innovative AI Solutions",
        desc:"We strive to develop cutting-edge AI technologies that not only meet but exceed the highest standards of data privacy and security.",
        no:"02"
    },
    {
        title:"User Privacy as a Priority",
        desc:"Protecting user privacy is at the heart of everything we do, ensuring every interaction is safeguarded and anonymous.",
        no:"03"
    },
    {
        title:"Commitment to Trust & Security",
        desc:"We are dedicated to fostering trust through transparent practices and secure solutions, empowering users to communicate with confidence.",
        no:"04"
    },

]

const OurVision = () => {
  return (
    <div className='pb-10 md:pb-20 lg:pb-[110px] container-landingpage'>
        <h3 className='text-center mb-6 fs-64'>Our Vision & Mission</h3>
        <p className='max-w-[692px] mx-auto text-center mb-10'>Leading in privacy-focused AI, we deliver innovative solutions that secure user privacy and ensure safe, anonymous communication.</p>
        <div className='grid sm:grid-cols-2 gap-6'>

            {
                data.map((item)=>(
                    <div key={uuidv4()} className='p-8 flex lg:flex-row flex-col gap-2 md:gap-4 lg:gap-8 lg:items-center border border-[#FFFFFF05] rounded-[16px] bg-whiteSmoke dark:bg-[#FFFFFF08]'>
                        <span className='w-16 h-16 md:w-24 md:h-24 flex justify-center items-center bg-[#269DDF] rounded-lg text-white shrink-0 font-semibold fs-48'>{item.no}</span>
                        <div>
                            <p className='dark:text-white fs-24 font-semibold mb-2'>{item.title}</p>
                            <span className='dark:text-lavender text-sm'>{item.desc}</span>
                        </div>
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default OurVision