import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { SuperLLmIcon, LimitedIcon, StaticResponseIcon, RealTimeIcon, DocumentIcon } from '../../../svgs/svg'
import Image from 'next/image'

const data = [
    {
        title: "Traditional Chatbot",
        img: "/assets/images/chatbot/chatbot-01.svg",
        innerData: [
            {
                icon: <SuperLLmIcon />,
                descTitle: "Single LLM Usage:",
                desc: "Restricted to a single language model, limiting the diversity and accuracy of responses."
            },
            {
                icon: <LimitedIcon />,
                descTitle: "Limited Suggestions:",
                desc: "Offer basic, pre-programmed suggestions that may not fully address user needs."
            },
            {
                icon: <StaticResponseIcon />,
                descTitle: "Static Responses:",
                desc: "Responses lack dynamic links or references, leaving users to search for additional information manually."
            },
            {
                icon: <RealTimeIcon />,
                descTitle: "Not Real-Time:",
                desc: "Respond using LLM training data or Bing API integration for updates."
            },
            {
                icon: <DocumentIcon />,
                descTitle: "Incapable of Handling Files:",
                desc: "Unable to process or interact with PDFs, restricting their usability for document-based queries."
            },

        ]
    },
    {
        title: "Covertly AI Chatbot",
        img: "/assets/images/chatbot/chatbot-02.svg",
        innerData: [
            {
                icon: <SuperLLmIcon />,
                descTitle: "Diverse LLM Integration:",
                desc: "Utilizes multiple language models for more diverse and accurate responses, catering to a broader range of queries and languages."
            },
            {
                icon: <LimitedIcon />,
                descTitle: "Intelligent Suggestions:",
                desc: "Provides smart, context-aware suggestions that enhance user interactions and streamline decision-making."
            },
            {
                icon: <StaticResponseIcon />,
                descTitle: "Source-Linked Responses:",
                desc: "Offers responses with direct links to sources, enabling users to verify and explore further information effortlessly."
            },
            {
                icon: <RealTimeIcon />,
                descTitle: "Google Search API:",
                desc: "Enables real-time Google data retrieval through any LLM API."
            },
            {
                icon: <DocumentIcon />,
                descTitle: "PDF Chat & Download:",
                desc: "Supports engaging with PDFs, enabling users to chat with and download document contents seamlessly."
            },

        ]
    }
]

const ChatBots = () => {
    return (
        <div className='grid items-start lg:grid-cols-2 gap-6 w-full md:pb-[120px] sm:pb-16 pb-10 container-landingpage'>

            {
                data.map((item, index) => (
                    <div key={uuidv4()} className='w-full p-4 lg:py-8  border border-linkWater50 dark:border-[#272D33] rounded-xl flex flex-col h-full dark:bg-[#272D33] dark:bg-opacity-[0%]'>
                        <h3 className='font-semibold fs-30 dark:text-white mb-8 lg:px-14'>{item.title}</h3>
                        <figure className="lg:h-[556px] flex items-center justify-center">
                            <Image
                                src={item.img}
                                width={486}
                                height={556}
                                className="w-full h-full"
                                alt="img"
                            />
                        </figure>


                        <ul className='space-y-6 mt-10 lg:px-14 flex flex-col grow'>
                            {
                                item.innerData.map((data, i) => (
                                    <li key={uuidv4()} className='flex gap-4 grow shrink-0 h-20'>
                                        <span className={`sm:w-12 sm:h-12 w-10 h-10 flex justify-center items-center rounded-full shrink-0  ${index == 1 ? "bg-[#30C5D2] text-white" : "bg-whiteSmoke dark:bg-white"}`}>{data.icon}</span>
                                        <p className={`text-left font-light dark:text-white xs:text-sm`}><span className={`shrink-0 text-left font-semibold ${index == 1 ? "text-[#30C5D2]" : "dark:text-white"}`}>{data.descTitle}</span>{" "} {data.desc}</p>
                                    </li>

                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}

export default ChatBots