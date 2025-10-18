import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { v4 as uuidv4 } from "uuid";
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useTheme } from '../../../context/themeContext';
import { useScrollMenu } from '../../../hooks/useScrollMenu';
import Sidebar from '../../../components/shared/Sidebar';
import MobileMenu from '../../../components/shared/MobileMenu';
import TitleGrid from '../../../components/shared/TitleGrid';

const data=[
    {
        title:"Title?",
        desc:"Type or paste your sensitive question into the chat — from health symptoms to legal questions to private fears.",
        no:"01"
    },
    {
        title:"Title?",
        desc:"If needed, include your address or location to get accurate nearby resources.",
        no:"02"
    },
    {
        title:"Title?",
        desc:"Auto-redaction scans for personal details, masking them before the AI processes your request.",
        no:"03"
    },
    {
        title:"Title?",
        desc:"Instantly receive concise, high-level summaries of key financial findings, saving time while maintaining security.",
        no:"04"
    },
    {
        title:"Title?",
        desc:"Ask the same question across multiple AI models and compare responses side by side to ensure accuracy.",
        no:"05"
    },
    {
        title:"Title?",
        desc:"Validate financial insights with up-to-date industry trends, regulatory changes, and economic data.",
        no:"06"
    },
]

const title=[
    {
        title:"True Anonymity.",
        desc:"No logins. No tracking. No data retention. Use Covertly AI completely off the record.",
        img:'/assets/images/use-cases/6.svg',
        img1:'/assets/images/use-cases/6a.svg'
    },
    {
        title:"Auto-Redaction. ",
        desc:"Personal information is instantly masked—even if you type it in—protecting your identity by default.",
        img:'/assets/images/use-cases/1.svg',
        img1:'/assets/images/use-cases/1a.svg'
    },
    {
        title:"Auto-Deletion.",
        desc:"Every session is wiped clean after use. Your questions stay yours—never stored, never shared.",
        img:'/assets/images/use-cases/3.svg',
        img1:'/assets/images/use-cases/3a.svg'
    },
    {
        title:"Multi-LLM Support.",
        desc:"Get answers from multiple leading AI models in one chat, helping you make better, unbiased decisions.",
        img:'/assets/images/use-cases/5.svg',
        img1:'/assets/images/use-cases/5a.svg'
    },
    {
        title:"Google API Integration.",
        desc:"Access real-time, location-specific results without revealing who (or where) you are.",
        img:'/assets/images/use-cases/22.svg',
        img1:'/assets/images/use-cases/22a.svg'
    },
    {
        title:"Unmoderated Use.",
        desc:"No human reviewers. No filters. Just honest, uninterrupted conversation.",
        img:'/assets/images/use-cases/23.svg',
        img1:'/assets/images/use-cases/23a.svg'
    },
    {
        title:"No Censorship.",
        desc:"Ask about mental health, personal issues, or taboo topics without judgment, limits, or oversight.",
        img:'/assets/images/use-cases/21.svg',
        img1:'/assets/images/use-cases/21a.svg'
    }
]

const PrivateConversations = () => {
    const { isDarkMode} = useTheme();
    const { isMenuExpanded, isAtBottom, bottomSentinelRef, toggleMenu } = useScrollMenu();
    return (
        <div className='container-landingpage'>
            <div className='grid sm:custom-grid gap-10'>
                <div className='bg-light dark:bg-blackRussian rounded-2xl flex flex-col'>

                    <div className='dark:bg-gradient-to-b from-blackRussian3 to-blackRussian p-5 lg:p-10 mb-24 rounded-2xl'>
                        <h6 className='fs-32 mb-4 dark:text-white'>Overview</h6>
                        <div className='grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-12'>
                            <div className='text-sm dark:text-[#D2D3D4] mb-2'>{`Whether you're asking about sensitive health conditions, seeking legal advice, or sharing personal information to get location-based insights, privacy is essential. Traditional AI platforms often store user prompts, log identifying details, or require account creation, leaving personal details exposed to potential data breaches, tracking, or unwanted profiling.`}</div>
                            <div className='text-sm dark:text-[#D2D3D4]'>Covertly AI provides a completely anonymous and unmoderated AI chat platform, empowering users to ask deeply personal, location-specific, or health-related questions without fear of surveillance or data retention. Designed with end-to-end anonymity, auto-redaction, and stateless architecture, Covertly AI offers a safe space to engage with AI for your most sensitive queries.</div>
                        </div>
                    </div>

                    <div className='mb-24'>
                        <Image src={'/assets/images/use-cases/15.png'} width={1296} height={790} alt="how-it-works-banner-image" className='object-center'/>
                    </div>

                    <div className='mb-24'>
                        <div>
                            <h4 className='fs-32 mb-5'>Why Covertly AI is the Best Choice for Anonymous and Private Conversations</h4>
                            <div className='grid sm:grid-cols-3 gap-6'> 
                                <div className='p-5 lg:p-8 lg:px-6 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col' key={uuidv4()}>
                                    <Image src={isDarkMode ? "/assets/images/use-cases/18.svg" : "/assets/images/use-cases/18a.svg"} width={96} height={96} alt="how-covertly-solves-image" className='mb-3 text-black dark:text-white'/>
                                    <h5 className='fs-24 mb-2'>No Anonymity on Other Platforms</h5>
                                    <ul className='list-disc ml-5'>
                                        <li className="text-black dark:text-white text-sm mb-2">Most AI platforms require login credentials or tie chats to user accounts.</li>
                                        <li className="text-black dark:text-white text-sm">Conversations are often logged and may be reviewed or stored indefinitely.</li>
                                    </ul>
                                </div>
                                <div className='p-5 lg:p-8 lg:px-6 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col' key={uuidv4()}>
                                    <Image src={isDarkMode ? "/assets/images/use-cases/19.svg" : "/assets/images/use-cases/19a.svg"} width={96} height={96} alt="how-covertly-solves-image" className='mb-3 text-black dark:text-white'/>
                                    <h5 className='fs-24 mb-2'>Risk of Data Exposure</h5>
                                    <ul className='list-disc ml-5'>
                                        <li className="text-black dark:text-white text-sm mb-2">Inputting personal info like names or locations leaves digital footprints.</li>
                                        <li className="text-black dark:text-white text-sm">Sensitive chats about symptoms, mental health, or personal situations can be exposed.</li>
                                    </ul>
                                </div>
                                <div className='p-5 lg:p-8 lg:px-6 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col' key={uuidv4()}>
                                    <Image src={isDarkMode ? "/assets/images/use-cases/20.svg" : "/assets/images/use-cases/20a.svg"} width={96} height={96} alt="how-covertly-solves-image" className='mb-3 text-black dark:text-white'/>
                                    <h5 className='fs-24 mb-2'>Limited Trust in AI Privacy Policies</h5>
                                    <ul className='list-disc ml-5'>
                                        <li className="text-black dark:text-white text-sm mb-2">Users don’t always know what happens to their data after the chat ends.</li>
                                        <li className="text-black dark:text-white text-sm">There is growing concern over how AI tools share or retain personal information.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid sm:grid-cols-2 gap-10 mb-24'>
                        <div>
                            <h3 className='fs-32 mb-5'>How Covertly AI Solves These Challenges</h3>
                            <div  className='mb-3'>     
                                <h4 className='dark:text-white fs-24 font-semibold mb-2'>True Anonymous Use No Login Required</h4>
                                <p className='dark:text-lavender text-sm mb-2'>Covertly AI assings users an anonymous identify automatically - no email, no username, no tracking.</p>
                                <p className='dark:text-lavender text-sm'>Conversations happen in a private, encrypted enviroment without any link to your identity.</p>
                            </div>
                            <div>     
                                <h4 className='dark:text-white fs-24 font-semibold mb-2'>Auto-Redaction of Personal Information</h4>
                                <p className='dark:text-lavender text-sm mb-2'>Built-in redaction detects and conceals personally identificable information (PII), such as:</p>
                                <ul className='list-disc ml-5 mb-3'>
                                    <li className='dark:text-lavender text-sm'>Name</li>
                                    <li className='dark:text-lavender text-sm'>Email addresses</li>
                                    <li className='dark:text-lavender text-sm'>Home or work addresses</li>
                                    <li className='dark:text-lavender text-sm'>Health-related identiflers</li>
                                </ul>
                                <p className='dark:text-lavender text-sm'>{`This ensures that even if you enter sensitive data (e.g., "I live at 123 Main St" or "I have chest pain when running"), it is automatically secured before processing.`}</p>
                            </div>
                        </div>
                        <div>
                            <Image src={'/assets/images/use-cases/16.png'} width={400} height={615} alt="how-it-works-banner-image" className='object-center'/>
                        </div>
                    </div>

                    <div className='mb-24 p-5 lg:p-12'>
                        <div>
                            <h4 className='fs-32 mb-5'>More Reasons Users Trust Covertly AI</h4>
                            <div className='grid sm:grid-cols-3 gap-6'> 
                                <div className='flex flex-col' key={uuidv4()}>
                                    <h5 className='fs-24 mb-3'>{`Talk Freely — Your Conversations Won't Stick Around`}</h5>
                                    <p className="text-black dark:text-white text-sm">No memory. No history. Once your session ends, all data is permanently erased, delivering a truly private, ephemeral chat experience.</p>
                                </div>
                                <div className='flex flex-col' key={uuidv4()}>
                                    <h5 className='fs-24 mb-3'>Get Up-to-Date Answers Powered by Google Search</h5>
                                    <p className="text-black dark:text-white text-sm">Get current info on local clinics, pharmacies, or services—without sacrificing privacy. Even redacted locations return accurate, anonymous results.</p>
                                </div>
                                <div className='flex flex-col' key={uuidv4()}>
                                    <h5 className='fs-24 mb-3'>Next-Level Help: 6 AIs are Better Than 1</h5>
                                    <p className="text-black dark:text-white text-sm">Ask sensitive questions and receive diverse answers from multiple leading AI models, including GPT-4, Claude, Gemini, and LLAMA. Compare responses to find what resonates with no single-source bias.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h3 className='fs-32 mb-5'>How Covertly AI Protects Your Anonymity?</h3>
                    <div className='grid sm:grid-cols-1 anonymity_slider mb-24' style={{borderRight: "2px solid #30C5D2", borderLeft: "2px solid #30C5D2", userSelect: 'none'}}>
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={20}
                            slidesPerView={"auto"}
                            grabCursor
                            freeMode
                            pagination={{ clickable: true }}
                            className='pb-6'
                            breakpoints={{
                                640: { slidesPerView: "auto", spaceBetween: 20 },
                                1024: { slidesPerView: "auto", spaceBetween: 20 },
                                1280: { slidesPerView: "auto", spaceBetween: 20 }
                            }}
                        >
                            {data.map((item) => (
                                <SwiperSlide key={uuidv4()}>
                                    <div className='lg:items-center rounded-[16px] p-4 h-full'>
                                        <span className='fs-64 text-[#30C5D2]'>{item.no}</span>
                                        <div className='relative h-[150px]'>
                                            <p className='dark:text-white fs-24 font-semibold mb-2'>{item.title}</p>
                                            <span className='dark:text-lavender text-sm'>{item.desc}</span>
                                            <Image src={'/assets/images/use-cases/arrow-right.png'} alt="Arrow Right" width={18} height={18} className='absolute right-0 bottom-0' draggable={false} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <h3 className='fs-32 mb-5'>Why Covertly AI is the Best Choice for Anonymous and Private Conversations</h3>
                    <p className='dark:text-white fs-16 mb-4'>Designed for Privacy. Built for Freedom:</p>
                    <TitleGrid title={title} isDarkMode={isDarkMode} />
                    <div>
                        <h3 className='fs-32 mb-5'>Covertly AI is more than a chatbot, it’s a secure environment for handling sensitive questions and private data. </h3>
                        <p className='fs-16 mb-2'>Whether addressing health concerns, legal matters, or personal challenges, users can engage with confidence, knowing their identity is protected and their session leaves no trace. In a landscape where privacy is often compromised, Covertly AI ensures it remains non-negotiable.</p>
                        <p className='fs-16 mb-5'>Try Covertly AI today for secure, untraceable AI conversations you can trust.</p>
                        <Image src={'/assets/images/use-cases/17.png'} alt="how-covertly-solves-image" width={880} height={360} className='mb-2' />
                    </div>
                </div>

                <Sidebar />

                <MobileMenu 
                    isMenuExpanded={isMenuExpanded}
                    isAtBottom={isAtBottom}
                    toggleMenu={toggleMenu}
                />
                <div ref={bottomSentinelRef} style={{ height: 1 }} />
            </div>
        </div>
    )
}

export default PrivateConversations