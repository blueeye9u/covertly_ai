import React from 'react'
import Link from "next/link";
import {Button} from "../../../components/global/button/Button";
import {RightArrow} from "../../../svgs/svg";
import FeatureIcon from '../../../components/FeatureIcon';
import { useTheme } from '../../../context/themeContext';

const proToolsList = [
    {
        id: 'elijah',
        iconSource: '/assets/images/json/elijah.json',
        iconSource1: '/assets/images/json/elijah1.json',
        title: ['Place your trust in', 'Elijah'],
        description: 'Harness multiple AIs at once with Covertly\'s LLM controller, Elijah. Generate a unified SuperResponse for balanced, corroborated insights or let it pass the chat to the best AI for the job as you prompt, seamlessly maintaining context while gathering highly attuned responses.',
        btnTitle: 'Learn About Elijah',
        btnLink: '/#'
    },
    {
        id: 'agent',
        iconSource: '/assets/images/json/agents.json',
        iconSource1: '/assets/images/json/agents1.json',
        title: ['Put', 'AI Agents', 'to work'],
        description: 'Get task-focused support with AI agents optimized for quality research, effective study, and knowledge testing. Whether you\'re writing reports, learning something new, or preparing for a big exam, these agents make complex, tedious tasks simple and engaging.',
        btnTitle: 'Learn About AI Agents',
        btnLink: '/#'
    },
    {
        id: 'redact',
        iconSource: '/assets/images/json/redact.json',
        iconSource1: '/assets/images/json/redact1.json',
        title: ['Redact', 'sensitive info.'],
        description: 'Anonymize your documents with automatic redaction. Covertly instantly removes identifying data to protect your privacy. From personal details to financial records, Covertly keeps your data secure so you can safely analyze, store, and share your documents.',
        btnTitle: 'Learn About Redaction',
        btnLink: '/#'
    }
]

const LevelupCovertlyProTools = () => {
    const {isDarkMode} = useTheme();
    return (
        <section className="container-landingpage mt-10 sm:mt-[144px] relative levelup-gradient">
            <div className="levelup-gradient-bg"></div>
            <div className="flex flex-col md:flex-row items-start">
                <div className="sticky sm:absolute top-[200px] transform -translate-x-1/2 -translate-y-1/2 bg-dark-5 bg-opacity-[0.01] z-[-2]">
                </div>
                <div className= "md:flex-[0_0_42%] flex-1 md:sticky top-[118px] z-[-1]">
                    <div className="hidden sm:block absolute md:left-[50%] lg:left-[100%] top-[200px] transform -translate-x-1/2 -translate-y-1/2 bg-dark-5 bg-opacity-[0.01]">
                    </div>
                    <div
                        className="md:pt-[104px] transition-all duration-300 ease-out mb-[-24px] text-[48px] md:text-[56px] mr-5 font-semibold leading-normal"
                    >
                        <div className="text-blackRussian dark:text-athensgray">Level up with</div>
                        <div className="text-blackRussian dark:text-athensgray">{`Covertly's`}</div>
                        <div className="text-athensgray">
                            <span className="text-mediumTurquoise">pro tools</span>.
                        </div>
                    </div>
                </div>
                <div className="md:flex-[0_0_58%] flex-1 md:mt-0 mt-8">
                    {proToolsList.map((item, index) => (
                        <div key={item.id} className={`relative pt-[128px] ${item.id === "redact" ? "" : "pb-[128px]"} flex flex-col lg:flex-row gap-[24px] items-start`}>
                            {<div
                                className="absolute top-[-50px] z-[-1] left-[40px] text-[450px] leading-none text-[rgb(255,255,255,0.9)] dark:text-blackRussian font-extrabold">{index + 1}
                            </div>}
                            <FeatureIcon
                                src={isDarkMode ? item.iconSource ?? "" : item.iconSource1 ?? ""}
                                alt="feature icon"
                                height={96}
                                width={96}
                            />
                            <div className="flex flex-auto flex-col gap-[16px]">
                                {item.id == "redact"? (
                                    <div className="text-mediumTurquoise text-[32px] font-bold">{item.title[0]}
                                        <span className="text-blackRussian dark:text-athensgray"> {item.title[1]}</span>
                                        {item.title[2] && <span className="text-blackRussian dark:text-athensgray"> {item.title[2]}</span>}
                                    </div>
                                ):(
                                    <div className="text-blackRussian dark:text-athensgray text-[32px] font-bold">{item.title[0]}
                                        <span className="text-mediumTurquoise"> {item.title[1]}</span>
                                        {item.title[2] && <span className="text-blackRussian dark:text-athensgray"> {item.title[2]}</span>}.
                                    </div>
                                )}
                                
                                <div className="text-[16px] leading-normal mb-[20px] font-normal text-blackRussian dark:text-athensgray">{item.description}
                                </div>
                                <Link href={item.btnLink}>
                                    <Button size='lg' className="btn rounded-full !min-w-auto !flex-none">
                                        {item.btnTitle}
                                        <span className='rotate-180 pb-1'><RightArrow/></span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LevelupCovertlyProTools