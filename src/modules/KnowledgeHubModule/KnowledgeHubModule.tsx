import React from 'react'
import { ExploreKnowledgeData } from '../../constants/explore-knowledge-data'
import KnowledgeHubCard from './components/KnowledgeHubCard'
import Faq from '../../components/Faq/Faq'
import { FaqData } from '../../constants/faq-data'

const KnowledgeHubModule = () => {
  return (
    <section className='container-landingpage py-10 pb-20 md:py-20 lg:py-[110px]'>
        <p className='text-[#30C5D2] text-lg text-center mb-4'>Knowledge Hub</p>
        <h4 className='fs-64 text-center dark:text-white mb-6 leading-tight'>Explore Our Knowledge Hub</h4>
        <span className='max-w-[750px] block mx-auto text-center dark:text-[#FFFFFF] mb-20'>Welcome to our Knowledge Hub: Providing invaluable materials crafted to enhance your expertise and experience. Here, you&apos;ll find a treasure trove of user-friendly resources designed to support your needs and empower your AI journey.</span>
        <KnowledgeHubCard BlogsData={ExploreKnowledgeData}/>
        <Faq faqData={FaqData} />
    </section>
  )
}

export default KnowledgeHubModule