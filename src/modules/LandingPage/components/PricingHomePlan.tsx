import React from 'react'
import PricePlanSwitcher from '../../../components/PriceplanSwitcher'
import SubscriptionCard from '../../../components/modals/SubscriptionModal/SubscriptionCard';
import useSubscriptionTab from '../../../hooks/useSubscriptionTab';
import Link from 'next/link';
import { Button } from '../../../components/global/button/Button';
import { RightArrow } from '../../../svgs/svg';

const PricingHomePlan = () => {
  const { selectedTabIdx, setSelectedTabIdx } = useSubscriptionTab();
  return (
    <div className='relative pt-[51px] pricing-gradient'>
      <div className='absolute left-0 right-0 bottom-0 flex justify-center items-center overflow-hidden'>
        <video 
          controls={false} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-[962px] object-cover"
        >
          <source src="/assets/videos/code-small.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blackRussian from-0% to-transparent to-[85%]"
        ></div>
      </div>
      
      {/* Background effect in center */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-5 bg-opacity-[0.01] rounded-full">        
      </div>
      
      <div className="w-full flex justify-center px-4 mx-auto relative z-[1]">
        <div className="flex flex-col gap-2 items-center justify-center mb-12">
          <div className='mb-1 text-blackRussian dark:text-athensgray text-[48px] sm:text-[56px] landing_home-title text-center'>Go from careless to{' '}
            <span className='text-mediumTurquoise'>carefree</span>
            <span className='text-blackRussian dark:text-athensgray'>.</span>
          </div>
          <div className='mb-9 sm:mb-[72px] home-subtitle sm:text-[24px] text-[20px] leading-normal text-center
                text-blackRussian dark:text-frenchgray font-light max-w-[900px] mx-auto px-4'>
            <div>Start a fun chat, solve a challenge, or plan your business empire. It&apos;s free to try.</div>
            <div><span className='text-shamrock'>Save 20%</span> with an annual subscription.</div>
          </div>
          <PricePlanSwitcher selectedTabIdx={selectedTabIdx} setSelectedTabIdx={setSelectedTabIdx} />
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[72px] relative z-[1]">
        <SubscriptionCard selectedTabIdx={selectedTabIdx} />
        <div className='mt-[30px] text-white text-[16px] font-light leading-normal text-center'>
          See <span className='font-bold'>Pricing</span> for full subscription details.
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-x-20 flex-1 flex-wrap pb-[144px] pt-[72px] px-4 lg:px-0">
          {/* Left Column */}
          <div className='w-full lg:w-1/2 text-white font-outfit text-[48px] md:text-[60px] lg:text-[76px] font-bold leading-tight text-left mt-0 lg:mt-[-28px]'>
            {`We know you'll love it.`}
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-start items-start gap-[56px] flex-1 w-full lg:w-1/2 mt-10 lg:mt-0">
            <div className="max-w-[600px] self-stretch text-white font-outfit text-[18px] md:text-[20px] lg:text-[24px] font-normal leading-normal">
              Got questions? The <span className='font-bold'>FAQ</span> is a great resource in addition to our human <span className='font-bold'>Support</span>{` team. If you still can't decide, the free `}<span className="font-bold">Starter Plan</span> is a no-brainer.
            </div>
            <Link href="#">
                <Button size='lg' className="btn rounded-full !min-w-auto !flex-none text-black font-bold" color='secondary'>
                    Get Started Now{` `}
                    <span className='rotate-180 pb-1'><RightArrow/></span>
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingHomePlan