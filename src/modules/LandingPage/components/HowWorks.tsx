import React from 'react'
import HowWorksTabs from '../../../components/HowWorksTabs/HowWorksTabs'
import ImageComponent from '../../../components/global/imageComponent/ImageComponent';

const tabData = [
  {
    label: "Instant Anonymity",
    des: "Get started with ease as we assign you a masked identity, ensuring secure and anonymous AI interaction from the moment you log in.",
    content: <ImageComponent src={"/img-01.svg"} width={672} height={390}
                             figClassName='w-full h-full rounded-[20px] overflow-hidden'
                             className='w-full h-full rounded-[20px] object-contain'/>
  },
  {
    label: "Secure Interaction",
    des: "Communicate effortlessly through our service account, which interfaces with top LLMs while keeping your identity private and secure",
    content: <ImageComponent src={"/img-02.svg"} width={672} height={390}
                             figClassName='w-full h-full rounded-[20px] overflow-hidden'
                             className='w-full h-full rounded-[20px] object-contain'/>
  },
  {
    label: "Data Deletion",
    des: "Your data is erased after 24 hours or instantly if selected, ensuring your privacy and reinforcing our commitment to secure and trustworthy interactions.",
    content: <ImageComponent src={"/img-03.svg"} width={672} height={390}
                             figClassName='w-full h-full rounded-[20px] overflow-hidden'
                             className='w-full h-full rounded-[20px] object-contain'/>
  },
];

const HowWorks = () => {
  return (
    <section id='howItWorks' className='py-20 bg-white dark:bg-transparent'>
      <div className='container-landingpage'>
        <div className="flex flex-col mb-10">
          <h3 className='fs-40 mb-3'>How it Works?</h3>
          <p className='max-w-[912px]'>Our AI chatbot uses natural language processing to understand queries, retrieve
            information, and provide <span className='block'>accurate responses. It continuously learns to improve efficiency and personalization.</span>
          </p>
        </div>
        <HowWorksTabs tabs={tabData}/>
      </div>
    </section>
  )
}

export default HowWorks