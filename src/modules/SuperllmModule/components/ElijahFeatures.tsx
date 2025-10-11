import React from 'react'
import { FaCheck } from "react-icons/fa6";

import Image from 'next/image'

const ElijahFeatures = () => {
  return (
    <div className='container-landingpage md:mt-20 mt-5'>
      <h2 className='fs-48 font-semibold mb-4 text-center'>Key Features of Elijah 1.0 </h2>
      <p className='max-w-[521px] mx-auto text-sm text-center md:mb-16 mb-8'>Harness the power of multiple LLMs in one anonymous chat— delivering smarter, optimized responses instantly.</p>

      <div className='grid md:grid-cols-2 md:gap-y-20 gap-y-10 lg:gap-x-20 gap-x-10 mb-20 items-center'>
        <div className='lg:pr-24'>
          <h4 className='fs-28 font-semibold mb-4'>Smarter AI Conversations</h4>
          <p className='text-sm mb-8'>Elijah 1.0 lets you query up to five LLMs at once, delivering a comprehensive, optimized response—all while ensuring complete anonymity.</p>
          <ul className='space-y-4 dark:text-white'>
            <li className='flex gap-3 items-start text-sm leading-tight'>
              <div className='w-[18px] h-[18px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
              Real-Time Adaptation: Seamlessly integrates multiple AI models to generate highly accurate, tailored responses.
            </li>
            <li className='flex gap-3 items-start text-sm leading-tight'>
              <div className='w-[18px] h-[18px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
              Super Response: Combines insights from five LLMs into one optimized, comprehensive answer for deeper understanding.
            </li>
            <li className='flex gap-3 items-start text-sm leading-tight'>
              <div className='w-[18px] h-[18px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
              Intelligent Model Switching: Automatically selects and shifts between LLMs to ensure optimal performance and accuracy.
            </li>
          </ul>
        </div>

        <figure>
          <Image src={"/assets/images/super-llm-feature-01.svg"} width={494} height={398} alt='elijah' className='w-full' />
        </figure>


        <div className='w-full h-[398px] bg-blackRussian2 rounded-[30px] flex justify-center items-center md:order-1 order-2'>
          <figure className="multiple_LLMs_Features_img  grow relative flex justify-center items-center">
            <div className="rotating-background">
              <div className="multiple_LLMs_Features_img-background"></div>
            </div>
            <Image
              src={"/assets/images/covertly-features/multiple-llms/multiple-llm-logo.webp"}
              className="object-contain"
              alt="featureImage"
              width={104}
              height={104}
            />
          </figure>
        </div>

        <div className='lg:pr-24 md:order-2 order-1'>
          <h4 className='fs-28 font-semibold mb-4'>Faster Insights, Smarter Decisions</h4>
          <p className='text-sm mb-8'>Elijah 1.0 simplifies your workflow, instantly comparing up to five AI models for precise, well-rounded insights—no extra effort needed. Get faster, smarter, and more accurate answers.</p>

          <ul className='space-y-4 dark:text-white'>
            <li className='flex gap-3 items-start text-sm leading-tight'>
              <div className='w-[18px] h-[18px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
              Multi-LLM Comparison: Get diverse perspectives by querying up to five AI models at once, ensuring well-rounded, high-quality responses.

            </li>
            <li className='flex gap-3 items-start text-sm leading-tight'>
              <div className='w-[18px] h-[18px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
              Faster Decision-Making: No need to manually compare outputs from different models—Elijah 1.0 delivers the best response instantly.
            </li>
            <li className='flex gap-3 items-start text-sm leading-tight'>
              <div className='w-[18px] h-[18px] flex justify-center items-center rounded-full border border-[#30C5D2] text-[#30C5D2] shrink-0 text-xs'> <FaCheck /> </div>
              AI-Powered Precision: Dynamically selects the most relevant insights, reducing guesswork and refining accuracy.

            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default ElijahFeatures