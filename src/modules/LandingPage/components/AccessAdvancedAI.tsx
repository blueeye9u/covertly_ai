import React from 'react'
import Image from "next/image";

const AccessAdvancedAI = () => {
    return (
        <section className="container-landingpage gradient-background">
            <div className="home-subtitle text-[24px] sm:text-[48px] pt-16 sm:pt-[144px] text-center text-shark dark:text-frenchgray font-light leading-normal">
                Access the most advanced AIs together in one simple, secure, and anonymous experience.
            </div>
            <div className="flex py-9 md:py-[48px] lg:py-[85px]">
                <div className="flex-1 flex flex-col-reverse lg:flex-row">
                    <div className="flex-auto flex flex-col items-end box-border pr-[14px] md:pr-8 lg:pr-0 lg:items-center justify-start lg:justify-center relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blackRussian bg-opacity-[0.01] z-[-2]">
                        </div>
                        <div className="absolute mr-[40px] inset-0 items-center justify-center z-[-1] hidden lg:flex">
                            <span className="lg:text-[600px] md:text-[470px] text-[300px] text-athensgray dark:text-blackRussian font-extrabold">1</span>
                        </div>
                        <div className="max-w-[420px] mt-[100px]">
                            <div className="text-right lg:text-center text-mediumTurquoise font-semibold sm:text-[32px] text-[24px] leading-tight md:leading-normal">Protect your identity.</div>
                            <div className="text-right lg:text-center text-blackRussian dark:text-athensgray font-light sm:text-[24px] text-[20px] leading-tight md:leading-normal pt-1">Chat and research freely and safely with full anonymity, encryption, and data deletion.</div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-[74px] h-[195px] md:w-[103px] md:h-[272px] lg:w-[119px] lg:h-[312px] relative">
                            <div className="absolute top-0 bottom-0 right-[80%] items-center justify-center z-[-1] flex lg:hidden">
                                <span className="lg:text-[600px] md:text-[470px] text-[280px] text-athensgray dark:text-blackRussian font-extrabold">1</span>
                            </div>
                            <Image
                                src={"/assets/images/half-anonymous.png"}
                                alt="half anonymous"
                                className="size-full mt-[65px] w-[74px] h-[195px] md:w-[103px] md:h-[272px] lg:w-[119px] lg:h-[312px]"
                                height={312}
                                width={119}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[2px] bg-mediumTurquoise h-[650px] md:h-[670px] lg:h-[570px]"/>
                <div className="flex-1 flex flex-col lg:flex-row">
                    <div className="flex justify-start">
                        <div className="w-[103px] h-[195px] md:w-[136px] md:h-[272px] lg:w-[157px] lg:h-[312px] mt-[99px] relative">
                            <div className="absolute top-0 bottom-0 left-[50%] items-center justify-center z-[-1] flex lg:hidden">
                                <span className="lg:text-[600px] md:text-[470px] text-[280px] text-blackRussian font-extrabold">2</span>
                            </div>
                            <Image
                                src={"/assets/images/half-streamlined.png"}
                                alt="half streamlined"
                                className="mt-[65px] w-[97px] h-[195px] md:w-[136px] md:h-[272px] lg:w-[157px] lg:h-[312px]"
                                height={312}
                                width={157}
                            />
                        </div>
                    </div>
                    <div className="flex-auto flex flex-col items-start box-border pl-[14px] md:pl-8 lg:pl-0 lg:items-center justify-start lg:justify-center relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blackRussian bg-opacity-[0.01] z-[-2]">
                        </div>
                        <div className="absolute inset-0 items-center justify-center z-[-1] hidden lg:flex">
                            <span className="lg:text-[600px] md:text-[470px] text-[280px] text-athensgray dark:text-blackRussian font-extrabold">2</span>
                        </div>
                        <div className="max-w-[420px] mt-[100px]">
                            <div className="text-left lg:text-center text-mediumTurquoise font-semibold sm:text-[32px] text-[24px] leading-tight md:leading-normal">Simplify your workflow.</div>
                            <div className="text-left lg:text-center text-blackRussian dark:text-athensgray font-light sm:text-[24px] text-[20px] leading-tight md:leading-normal pt-1">Access the latest and greatest Large Language Models (LLMs) all from one place.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccessAdvancedAI