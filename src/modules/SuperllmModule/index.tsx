import React from 'react'
import Banner from './components/Banner'
import ElijahFeatures from './components/ElijahFeatures'
import Faq from '../../components/Faq/Faq'
import { ElijahFaqData } from '../../constants/elijah-faq-data'
import TransformConversation from './components/TransformConversation'

const SuperllmModule = () => {
  return (
    <section className='dark:bg-[url(/assets/images/super-llm-background.svg)] bg-no-repeat bg-cover bg-center'>
        <Banner/>
        <ElijahFeatures/>
        <Faq faqData={ElijahFaqData}/>
        <TransformConversation/>
    </section>
  )
}

export default SuperllmModule