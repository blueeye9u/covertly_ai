import React from 'react'
import { FaCheck } from "react-icons/fa6";
import Image from 'next/image'

const SecretKey = () => {
    return (
        <div className='container-landingpage  md:mt-20 mt-5'>

            <div className='grid md:grid-cols-2 md:gap-y-20 gap-y-10 lg:gap-x-20 gap-x-10 mb-20 items-center !max-w-[1012px] mx-auto'>
                <div className='lg:pr-24'>
                    <h4 className='fs-28 font-semibold mb-4'>Secret Key Login</h4>
                    <p className='text-sm mb-8'>Login with your own secret key for ultimate privacy and security.</p>

                    <ul className='space-y-4 dark:text-white'>
                        <li className='flex gap-3 items-start text-sm leading-tight'>
                            {/* change div into div */}
                            <div className='w-[20px] h-[20px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
                            Full Anonymity – No usernames, no emails—just your private access key.
                        </li>
                        <li className='flex gap-3 items-start text-sm leading-tight'>
                            <div className='w-[20px] h-[20px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
                            Zero Tracking – No tracking, no storage, no logging. You own your data.
                        </li>
                        <li className='flex gap-3 items-start text-sm leading-tight'>
                            <div className='w-[20px] h-[20px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
                            Encrypted Access – Your login is fully encrypted, ensuring maximum security.
                        </li>
                    </ul>
                </div>

                <figure className='w-full'>
                    <Image src={"/assets/images/anonymity/secret.webp"} width={494} height={398} alt='elijah' className='w-full' />
                </figure>


                {/* <div className='w-full h-[398px] bg-blackRussian2 rounded-[30px] flex justify-center items-center md:order-1 order-2'> */}
                <figure className='w-full'>
                    <Image src={"/assets/images/anonymity/lock-anonymity.webp"} width={494} height={398} alt='elijah' className='w-full' />
                </figure>
                {/* </div> */}
                <div className='lg:pr-24 md:order-2 order-1'>
                    <h4 className='fs-28 font-semibold mb-4'>Why Anonymity Matters with Covertly AI</h4>
                    <p className='text-sm mb-8'>{"Built by Cybersecurity experts, Covertly AI offers advanced privacy features ensuring every interaction remains secure and untraceable."}</p>

                    <ul className='space-y-4 dark:text-white'>
                        <li className='flex gap-3 items-start text-sm leading-tight'>
                            <div className='w-[20px] h-[20px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
                            Private Conversations – Your conversations are locked with end-to-end encryption, ensuring total privacy.
                        </li>
                        <li className='flex gap-3 items-start text-sm leading-tight'>
                            <div className='w-[20px] h-[20px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
                            Unmonitored Messaging – Engage in private, unmoderated discussions without fear of exposure.
                        </li>
                        <li className='flex gap-3 items-start text-sm leading-tight'>
                            <div className='w-[20px] h-[20px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
                            No Stored Records – Chats vanish after 24 hours, leaving no logs, no tracking, and no digital footprint.
                        </li>
                    </ul>
                </div>



            </div>
        </div>
    )
}

export default SecretKey