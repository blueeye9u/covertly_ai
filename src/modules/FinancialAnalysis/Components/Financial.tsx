import React from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from "uuid";
import { useTheme } from '../../../context/themeContext';
import { useScrollMenu } from '../../../hooks/useScrollMenu';
import Sidebar from '../../../components/shared/Sidebar';
import MobileMenu from '../../../components/shared/MobileMenu';
import TitleGrid from '../../../components/shared/TitleGrid';

const data=[
    {
        title:"Enter or upload financial data",
        desc:"Key balance sheet figures, income trends, and expense breakdowns",
        no:"01"
    },
    {
        title:"Automatic redaction",
        desc:"Sensitive PII like names and emails are instantly concealed before processing.",
        no:"02"
    },
    {
        title:"AI-driven analysis",
        desc:"Leverage Elijah 1.0 AI, which synthesizes responses from five leading AI models (GPT-4.0, Gemini, LLAMA, Dolphin and Claude) to provide the most comprehensive financial insights.",
        no:"03"
    },
    {
        title:"Auto-summarization of sensitive data",
        desc:"Instantly receive concise, high-level summaries of key financial findings, saving time while maintaining security.",
        no:"04"
    },
    {
        title:"Multi-LLM query capability",
        desc:"Ask the same question across multiple AI models and compare responses side by side to ensure accuracy.",
        no:"05"
    },
    {
        title:"Real-time verification via Google Application Programming Interface Search",
        desc:"Validate financial insights with up-to-date industry trends, regulatory changes, and economic data.",
        no:"06"
    },
    {
        title:"Auto-deletion upon session close",
        desc:"Once you're done, all financial data is erased, ensuring total confidentiality.",
        no:"07"
    },
]

const title=[
    {
        title:"Complete Anonymity",
        desc:"No tracking, storage, or moderation; interact with AI fully privately.",
        img:'/assets/images/use-cases/6.svg',
        img1:'/assets/images/use-cases/6a.svg'
    },
    {
        title:"Multi-LLM Insights ",
        desc:"Gain varied AI Perspectives for smarter financial decisions.",
        img:'/assets/images/use-cases/7.svg',
        img1:'/assets/images/use-cases/7a.svg'
    },
    {
        title:"Access Anywhere",
        desc:"Use securely across all environments, even where LLMs are blocked.",
        img:'/assets/images/use-cases/8.svg',
        img1:'/assets/images/use-cases/8a.svg'
    },
    {
        title:"Auto-Redaction",
        desc:"Instantly hides sensitive financial data-nomanual work needed.",
        img:'/assets/images/use-cases/1.svg',
        img1:'/assets/images/use-cases/1a.svg'
    },
    {
        title:"Google API Integration",
        desc:"Access real-time financial trends and updates.",
        img:'/assets/images/use-cases/9.svg',
        img1:'/assets/images/use-cases/9a.svg'
    },
    {
        title:"All-in-One AI Access",
        desc:"Four top AI models in one platform-no extra subscriptions.",
        img:'/assets/images/use-cases/5.svg',
        img1:'/assets/images/use-cases/5a.svg'
    },
    {
        title:"Compliance Focused",
        desc:"Erases data to comply with SOX, GDPR, and CCPA.",
        img:'/assets/images/use-cases/10.svg',
        img1:'/assets/images/use-cases/10a.svg'
    },
    {
        title:"Image Generation",
        desc:"Create custom visuals for reports and decks- securely and privately.",
        img:'/assets/images/use-cases/11.svg',
        img1:'/assets/images/use-cases/11a.svg'
    },
    {
        title:"Security by Design",
        desc:"Built by cybersecurity pros with enterprise-grade encryption.",
        img:'/assets/images/use-cases/12.svg',
        img1:'/assets/images/use-cases/12a.svg'
    },
]

const Financial = () => {
    const { isDarkMode} = useTheme();
    const { isMenuExpanded, isAtBottom, bottomSentinelRef, toggleMenu } = useScrollMenu();

    return (
        <div className='pb-10 lg:pb-20 xl:pb-[120px] container-landingpage md:pb-10 pb-20'>
            <div className='grid sm:custom-grid gap-20'>
                <div className='bg-light dark:bg-blackRussian rounded-2xl flex flex-col'>

                    <div className='dark:bg-gradient-to-b from-blackRussian3 to-blackRussian p-5 lg:p-10 mb-24 rounded-2xl'>
                        <h6 className='fs-32 mb-4 dark:text-white'>Overview</h6>
                        <div className='grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-12'>
                            <div className='text-sm dark:text-[#D2D3D4] mb-2'>Financial executives handle vast amounts of sensitive financial data daily, including balance sheets, income statements, and cash flow statements. Ensuring the security and confidentiality of this data is paramount, especially when analyzing financial health, making strategic decisions, or preparing reports for stakeholders such as executive leadership, the board of directors, and external regulatory bodies. Traditional AI tools often store user data or lack built-in privacy protections, exposing financial professionals to potential risks of data leaks, compliance violations, or unauthorized access.</div>
                            <div className='text-sm dark:text-[#D2D3D4]'>Covertly AI provides an anonymous AI-powered financial analysis tool designed specifically for professionals who require discretion, security, and efficiency when handling financial data. With auto-redaction of sensitive information and auto-deletion of processed data, Covertly ensures that financial executives can work with AI without compromising confidentiality.</div>
                        </div>
                    </div>

                    <div className='mb-24'>
                        <Image src={'/assets/images/use-cases/01.png'} width={1296} height={790} alt="how-it-works-banner-image" className='object-center'/>
                    </div>

                    <div className='mb-24'>
                        <h2 className='fs-32 dark:text-white leading-tight mb-8'>Challenges Faced by Financial Executives</h2>
                        
                        <div className='fs-24 font-bold dark:text-white mb-3'>Data Security Risks</div>
                        <ul className='list-disc ml-6 mb-5'>
                            <li className="text-black dark:text-white mb-2">{"Sensitive financial data, such as profit margins, liabilities, earnings, and cash flow projections, must remain private and secure."}</li>
                            <li className="text-black dark:text-white">{"Many AI tools store user queries, creating compliance risks for regulated industries."}</li>
                        </ul>

                        <div className='fs-24 font-bold dark:text-white mb-3'>Regulatory Compliance</div>
                        <ul className='list-disc ml-6 mb-5'>
                            <li className="text-black dark:text-white mb-2">{"Financial executives must adhere to strict data privacy laws, such as the Sarbanes-Oxley Act (SOX), GDPR, and CCPA."}</li>
                            <li className="text-black dark:text-white">{"AI solutions must ensure that confidential financial data is not stored or accessible beyond its intended use."}</li>
                        </ul>

                        <div className='fs-24 font-bold dark:text-white mb-3'>Time-Consuming Data Redaction and Manual Processing</div>
                        <ul className='list-disc ml-6 mb-5'>
                            <li className="text-black dark:text-white mb-2">{"Financial teams often spend hours redacting sensitive information before using AI tools."}</li>
                            <li className="text-black dark:text-white">{"Manual analysis is prone to errors and inefficiencies."}</li>
                        </ul>

                        <div className='fs-24 font-bold dark:text-white mb-3'>Need for Efficient and Secure AI Assistance</div>
                        <ul className='list-disc ml-6 mb-5'>
                            <li className="text-black dark:text-white mb-2">{"AI-driven analysis improves financial insights, but it must be completely secure to be viable for enterprise use."}</li>
                        </ul>
                    </div>

                    <div className='pb-10 sm:pb-20'>
                        <div>
                            <h4 className='fs-32 mb-5'>How Covertly AI Solves These Challenges</h4>
                            <div className='p-5 lg:p-8 lg:px-6 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col shadow-sm mb-5' key={uuidv4()}>
                                <Image src={isDarkMode ? "/assets/images/use-cases/1.svg" : "/assets/images/use-cases/1a.svg"} width={96} height={96} alt="how-covertly-solves-image" className='mb-3 text-black dark:text-white'/>
                                <h5 className='fs-24 mb-3'>Auto-Redaction of Sensitive Information</h5>
                                <div className='grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-24'>
                                    <div className='text-sm dark:text-white'>Automatically detects and redacts sensitive personally identifiable information (PII) such as:
                                        <ul className="list-disc ml-5 mb-2 mt-2">
                                            <li className="text-black dark:text-white text-sm">
                                                Company Name & Address
                                            </li>
                                            <li className="text-black dark:text-white text-sm">
                                                Email Address
                                            </li>
                                            <li className="text-black dark:text-white text-sm">
                                                Names of Employees
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='text-sm dark:text-white'> Eliminates the need for manual data masking, saving time and reducing human error. Auto-redaction leaves numbers alone so the data can be analyzed and manipulated for financial analysis.</div>
                                </div>
                            </div>
                            <div className='grid sm:grid-cols-2 gap-6'> 
                                <div className='p-5 lg:p-8 lg:px-6 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col shadow-sm' key={uuidv4()}>
                                    <Image src={isDarkMode ? "/assets/images/use-cases/2.svg" : "/assets/images/use-cases/2a.svg"} width={96} height={96} alt="how-covertly-solves-image" className='mb-3 text-black dark:text-white'/>
                                    <h5 className='fs-24 mb-3'>Privacy-First AI for Financial Analysis</h5>
                                    <p className="text-black dark:text-white text-sm">Unlike traditional AI tools, Covertly AI is stateless and does not store user data. This ensures that financial executives can confidently analyze their balance sheets, income statements, and cash flow statements without concerns about data presistence.</p>
                                </div>
                                <div className='p-5 lg:p-8 lg:px-6 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col shadow-sm' key={uuidv4()}>
                                    <Image src={isDarkMode ? "/assets/images/use-cases/3.svg" : "/assets/images/use-cases/3a.svg"} width={96} height={96} alt="how-covertly-solves-image" className='mb-3 text-black dark:text-white'/>
                                    <h5 className='fs-24 mb-3'>Auto-Deletion for Maximum Security</h5>
                                    <ul className="list-disc ml-5">
                                        <li className="text-black dark:text-white text-sm mb-2">Once the analysis session ends, all input data is automatically deleted, ensuring compliance with financial regulations.</li>
                                        <li className="text-black dark:text-white text-sm">No residual data is stored, eliminating risks of unauthorized access or breaches.</li>
                                    </ul>
                                </div>
                                <div className='p-5 lg:p-8 lg:px-6 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col shadow-sm' key={uuidv4()}>
                                    <Image src={isDarkMode ? "/assets/images/use-cases/4.svg" : "/assets/images/use-cases/4a.svg"} width={96} height={96} alt="how-covertly-solves-image" className='mb-3 text-black dark:text-white'/>
                                    <h5 className='fs-24 mb-3'>AI-Powered Financial Insights with Google Search Integration</h5>
                                    <ul className="list-disc ml-5">
                                        <li className="text-black dark:text-white text-sm mb-2">Unlike traditional AI models that rely on limited datasets, Coverly AI integrates with Google Search to provide real-time, reliable financial information.</li>
                                        <li className="text-black dark:text-white text-sm">Allows financial executives to cross-verify reports and industry trends with up-to-date market data.</li>
                                    </ul>
                                </div>
                                <div className='p-5 lg:p-8 lg:px-6 rounded-xl bg-white dark:bg-[#FFFFFF08] flex flex-col shadow-sm' key={uuidv4()}>
                                    <Image src={isDarkMode ? "/assets/images/use-cases/5.svg" : "/assets/images/use-cases/5a.svg"} width={96} height={96} alt="how-covertly-solves-image" className='mb-3 text-black dark:text-white'/>
                                    <h5 className='fs-24 mb-3'>Secure Multi-LLM Comparison for Better Decision-Making</h5>
                                    <ul className="list-disc ml-5">
                                        <li className="text-black dark:text-white text-sm">Coverly AI enables executives to ask multiple AI models the same question, comparing insights from various AI models to make informed financial decisions.</li>
                                        <li className="text-black dark:text-white text-sm">Helps detect inconsistencies and refine forecasting strategies based on diverse AI-generated perspectives.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className='fs-32 mb-5'>How Covertly AI Could Be Implemented for Financial Executives:</h3>
                    <div className='grid sm:custom-grid1 gap-6 mb-24'>
                        <div>
                            {
                                data.map((item,i)=>(
                                    <div key={uuidv4()} className='flex lg:flex-row flex-col gap-4 md:gap-4 lg:gap-8 rounded-[16px] mb-5'>
                                        <div className='fs-64 text-[#30C5D2] self-start' style={{ height: 'auto', lineHeight: '1' }}>{item.no}</div>
                                        <div>
                                            <p className='dark:text-white fs-24 font-semibold mb-2'>{item.title}</p>
                                            <span className='dark:text-lavender text-sm'>{item.desc}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <div className='auto-redact-video bg-white dark:bg-[#FFFFFF08]'>
                                <p className='text-black dark:text-white'>Introducing Anonymous</p>
                                <p className='fs-32 text-black dark:text-white'>Auto Redact</p>
                            </div>
                        </div>
                    </div>

                    <h3 className='fs-32 mb-5'>Key Features & Benefits</h3>
                    <TitleGrid title={title} isDarkMode={isDarkMode} />

                    <h6 className='fs-32 dark:text-white'>Why Covertly AI Is the Best Choice for Financial Executives</h6>
                    <div className='dark:bg-gradient-to-b from-blackRussian to-blackRussian3 rounded-2xl p-5 lg:p-10'>
                        <div style={{position: "relative"}}>
                            <Image src={"/assets/images/use-cases/25.png"} alt="wolf" width={84} height={192} style={{position: "absolute", top: "-20px"}} />
                            <div className='grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-24 mb-5 pt-24'>
                                <div className='text-sm dark:text-[#D2D3D4]'>
                                    <p className='mb-2'>Covertly Al is not just an Al tool-it is the most secure way for financial executives to analyze and interpret their financial statements without the risk of exposing sensitive data. This means you get the power of Al-driven financial insights without a trace.</p>
                                    <p className='mb-2'>{`In today's financial landscape, data security is non-negotiable. Al-driven insights should empower, not expose.`}</p>
                                </div>
                                <div className='text-sm dark:text-[#D2D3D4]'>Covertly Al gives financial executives the ability to analyze, forecast, and strategize-all while ensuring complete privacy and compliance. Your financial data is valuable. Covertly Al ensures it stays secure.</div>
                            </div>
                            <Image src={"/assets/images/use-cases/26.png"} alt="wolf" width={44} height={43} style={{position: "absolute", right: "0", bottom: "-100px"}} />
                        </div>
                        <p className='flex justify-end fs-16 mb-2 dark:text-white'>— [Redacted], MBA</p>
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

export default Financial