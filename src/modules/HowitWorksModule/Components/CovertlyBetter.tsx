import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { CovertlyBetterData } from '../../../constants/covertly-better-data'

const CovertlyBetter = () => {
    return (
        <div className='pb-10 sm:pb-20'>
            <div className='container-landingpage'>
                <div className='flex flex-col justify-center items-center mb-10'>
                    <h4 className='fs-40 mb-2 text-center'>Why Covertly is Smarter, Safer, and More Powerful than ChatGPT?</h4>
                    <p className=''>{"Unlock Privacy, Power and Precision: Discover Why Covertly Outshines ChatGPT"}</p>
                </div>
                <div className='grid sm:grid-cols-2 gap-6'>
                    {CovertlyBetterData.map((item, i)=> (
                        <div className='p-5 lg:p-8 lg:px-9 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col shadow-sm border border-[#1D2227]' key={uuidv4()}>
                            <span className='mb-4 text-black dark:text-white'>{item.icon}</span>
                            <h5 className='mb-3'>{item.title}</h5>
                             <p className="text-black dark:text-white text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CovertlyBetter