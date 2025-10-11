import React from 'react'
import { v4 as uuidv4 } from "uuid";

const data=[
    {
        title:"Offline & Secure",
        desc:"Auto redaction identifies and removes sensitive data instantly with precision, reducing manual effort and errors.",
        no:"01"
    },
    {
        title:"HIPAA Compliant",
        desc:"Meets stringent compliance standards, making our auto redaction ideal for legal, healthcare, and corporate use.",
        no:"02"
    },
    {
        title:"Instant & Automated Accuracy",
        desc:"Auto redaction identifies and removes sensitive data instantly with precision, reducing manual effort and errors.",
        no:"03"
    },
    {
        title:"Full User Control & Transparency",
        desc:"Users can review, customize, and approve redactions before finalizing, ensuring complete control over sensitive information.",
        no:"04"
    },

]

const AutoRedaction = () => {
  return (
    <div className='pb-10 md:pb-20 lg:pb-[110px] container-landingpage'>
        <h3 className='text-center mb-10 fs-48'>Auto Redaction</h3>
        <div className='grid sm:grid-cols-2 gap-6'>

            {
                data.map((item,i)=>(
                    <div key={uuidv4()} className='p-8 flex lg:flex-row flex-col gap-2 md:gap-4 lg:gap-8 lg:items-center border border-[#FFFFFF05] rounded-[16px] bg-whiteSmoke dark:bg-[#FFFFFF08]'>
                        <span className='w-16 h-16 md:w-24 md:h-24 flex justify-center items-center bg-gradient-to-r from-[#30C5D2] to-[#471069] rounded-lg text-white shrink-0 font-semibold fs-48'>{item.no}</span>
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

export default AutoRedaction