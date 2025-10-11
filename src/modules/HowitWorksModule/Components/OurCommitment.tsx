import Image from 'next/image'
import { v4 as uuidv4 } from "uuid";
import React from 'react'

const data = [
    {
        img: "/assets/images/how-it-works/our-commitment/01.svg",
        title: "User Registration",
        desc: "Sign up using an email or secret key—no personal data is collected. Each user is assigned a randomly generated ID for full anonymity.",
    },
    {
        img: "/assets/images/how-it-works/our-commitment/02.svg",
        title: "Subscription Management",
        desc: "Payments are securely processed through Stripe. Covertly only retains the email associated with the credited tokens for essential updates.",
    },
    {
        img: "/assets/images/how-it-works/our-commitment/04.svg",
        title: "Chat Input & Anonymity",
        desc: "When you submit a question, it is processed through a randomly generated ID, never linked to your email or personal data. Your query is securely sent to the selected LLM, and responses are returned while maintaining complete anonymity.",
    },
    {
        img: "/assets/images/how-it-works/our-commitment/03.svg",
        title: "User Data & Privacy",
        desc: "Chats are encrypted and automatically deleted within 24 hours. Neither Covertly nor the LLMs can access or identify your data, ensuring absolute privacy.",
    },
   
    {
        img: "/assets/images/how-it-works/our-commitment/05.svg",
        title: "Chat Response & Personalization",
        desc: "Responses are tailored based on your query, not your identity. Context is maintained through a random ID, preserving your anonymity.",
    },
    {
        img: "/assets/images/how-it-works/our-commitment/06.svg",
        title: "Full Anonymity Assurance",
        desc: "Covertly ensures complete anonymity at every stage of your experience. Conversations are processed through a random ID, auto-deleted within 24 hours, and never stored or accessed—guaranteeing full privacy and security.",
    },
]

const OurCommitment = () => {
    return (
        <div className='pb-10 lg:pb-20 xl:pb-[120px] container-landingpage'>
            <h2 className='fs-48 mb-4 text-center'>Our Commitment to Your Anonymity</h2>
            <p className='max-w-[508px] mx-auto text-center text-sm mb-12'>{"At Covertly, protecting your anonymity is our top priority. Here’s how we ensure your privacy at every step of your experience."}</p>

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    data.map((item, i) => (
                        <div key={uuidv4()} className='p-5 lg:p-10 bg-whiteSmoke dark:bg-[#FFFFFF05] border border-linkWater dark:border-[#2E3A45] rounded-3xl flex flex-col'>
                            <Image src={item.img} alt={item.img} width={311} height={186} className='w-full mb-6' />
                            <h6 className='fs-20 mb-2 dark:text-white'>{item.title}</h6>
                            <span className='text-sm dark:text-[#D2D3D4]'>{item.desc}</span>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default OurCommitment