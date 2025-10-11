import React from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from "uuid";
import ImageComponent from '../../../components/global/imageComponent/ImageComponent'
import useLoggedInStatus from '../../../hooks/useLoggedInStatus'
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../../constants/routes'
import ExploreModelAnimation from '../../../components/ExploreModels'

const models_data = [
    {
        title: "ChatGPT",
        img: "/assets/images/chat/chatgpt.webp",
        des: "Powered by the GPT-4.0 API, ChatGPT is your go-to AI for fast, precise answers, creative problem-solving, and seamless execution. Whether you need clarity, efficiency, or innovative ideas, it delivers reliable responses tailored to your needs."
    },
    {
        title: "Google Gemini",
        img: "/assets/images/chat/gemini.webp",
        des: "Designed for deep insights and complex problem-solving, Gemini 2.0 excels in multitasking, research, and analytical thinking. With its precision and efficiency, it’s an ideal choice for creativity, exploration, and high-level reasoning."
    },
    {
        title: "Claude",
        img: "/assets/images/chat/claude.webp",
        des: "Built for thoughtful, context-aware interactions, Claude 3.5 Sonnet delivers precise, in-depth responses. Whether engaging in nuanced discussions or conducting detailed analysis, it offers clarity, depth, and a refined conversational experience."
    },
    {
        title: "Llama",
        img: "/assets/images/chat/Llama.webp",
        des: "A fast and intelligent AI optimized for insightful conversations. LLAMA 3.2 ensures accuracy and efficiency, making it a powerful tool for brainstorming, problem-solving, and rich contextual interactions."
    },
    {
        title: "Dolphin Mixtral",
        img: "/assets/images/chat/dolphin.webp",
        des: "An uncensored AI designed for free-flowing, insightful conversations. Dolphin 2.5 Mixtral 8x7B specializes in intelligent decision-making, problem-solving, and generating unique, unrestricted responses."
    },
    {
        title: "Elijah 1.0",
        img: "/assets/images/chat/elijah.webp",
        des: "Covertly AI’s custom-built model, Elijah 1.0, dynamically adapts to user queries in real time. It intelligently switches between all five LLMs, combining insights to generate highly accurate responses—delivering unparalleled precision and adaptability."
    },
]

const ExploreMutipleModels = () => {
    const [isLoggedIn] = useLoggedInStatus();
    return (
        <section className="pt-[50px] sm:pb-16 pb-8">
            <div className="container-landingpage">
                <h4 className="fs-64 mb-10  text-center font-semibold">Multiple AI-Models</h4>
                <div className='sm:hidden flex justify-center'>
                    <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                        <button className='explore_btn'>Explore</button>
                    </Link>
                </div>
                <ExploreModelAnimation />
                <div className='grid xl:grid-cols-3 grid-cols-2 sm:gap-4 gap-2'>
                    {
                        models_data.map((item, i) => (
                            <div key={uuidv4()} className='sm:p-10 p-4 border border-linkWater dark:border-blackRussian3 rounded-2xl flex flex-col gap-6'>
                                <div className='flex sm:flex-row flex-col gap-4 items-center'>
                                    <ImageComponent src={item.img} alt={item.img} height={40} width={40} className='rounded-md' />
                                    <h6 className='sm:text-xl text-sm font-normal'>{item.title}</h6>
                                </div>
                                <p className='sm:block hidden'>{item.des}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default ExploreMutipleModels