import React from 'react'
import Image from "next/image";

const AIModelInfo = [
    {
        source: "/assets/images/svgs/ChatGPT.svg",
        title: "ChatGPT",
        subTitle: "The Genial Generalist",
        description: "Friendly go-to standard for creativity, quick help, or casual chats."
    },
    {
        source: "/assets/images/svgs/Gemini.svg",
        title: "Gemini",
        subTitle: "The Analytical Architect",
        description: "Structured, data-driven precision for research or complex questions."
    },
    {
        source: "/assets/images/svgs/Claude.svg",
        title: "Claude",
        subTitle: "The Ethical Empath",
        description: "Broaches thoughtful discussion of nuanced, sensitive topics with care."
    },
    {
        source: "/assets/images/svgs/Llama.svg",
        title: "Llama",
        subTitle: "The Straight Shooter",
        description: "Direct, accurate answers for practical solutions with concise clarity."
    },
    {
        source: "/assets/images/svgs/DeepSeek.svg",
        title: "DeepSeek",
        subTitle: "The Techy Tactician",
        description: "Sharp coder and math wiz tackling technical tasks with logic."
    },
    {
        source: "/assets/images/svgs/Grok.svg",
        title: "Grok",
        subTitle: "The Crazy Crank",
        description: "Witty, real-time insights with a strong emphasis on truth-finding."
    },
]

const AIModelList = () => {
    return (
        <section className="container-landingpage model-list-gradient">
            <div className="absolute left-[-50px] transform -translate-x-1/2 top-1/2 bg-blackRussian bg-opacity-[0.01]">
            </div>
            <div className="absolute right-[-50px] transform translate-x-1/2 bottom-[150px] bg-blackRussian bg-opacity-[0.01]">
            </div>
            <div className="mt-10 md:mt-[64px] lg:mt-[100px] text-center">
                <div className="sm:text-[64px] text-[48px] landing_home-title leading-normal mb-1 text-blackRussian dark:text-athensgray">Meet the <span className="text-mediumTurquoise whitespace-nowrap">{`"A-Team"`}</span> of AI.</div>
                <div className="home-subtitle sm:text-[24px] text-[20px] leading-normal text-center
                text-blackRussian dark:text-frenchgray font-light max-w-[900px] mx-auto px-4">{`More LLMs are better than one. Tap into each model's unique strengths for the most accurate, creative, and rational answers on the Internet.`}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[64px] mt-[96px] z-[-1]">
                {AIModelInfo.map((item) => (
                    <div key={item.title} className="rounded-[16px] relative px-[36px] pt-[84px] pb-[32px] text-center border-gradient-light border-gradient-dark">
                        <div className="absolute top-[-35px] left-0 right-0 flex justify-center">
                            <div className="size-[96px] rounded-full dark:bg-black bg-white p-[10px] shadow-[#413D83]/40 shadow-[0_-10px_30px_-8px_#413D83]">
                                <Image
                                    src={item.source}
                                    alt="chatgpt model icon"
                                    className="size-full"
                                    height={76}
                                    width={76}
                                />
                            </div>
                        </div>
                        <div className='text-[20px] sm:text-[24px] font-semibold dark:text-white text-blackRussian'>{item.title}</div>
                        <div className='text-[16px] text-mediumTurquoise font-normal'>{`"${item.subTitle}"`}</div>
                        <div className='text-[16px] font-light text-shark dark:text-ghost2 leading-[22px] pt-[4px]'>{item.description}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AIModelList