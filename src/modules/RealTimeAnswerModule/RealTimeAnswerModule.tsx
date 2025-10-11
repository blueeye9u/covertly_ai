import React from 'react'
import Banner from './components/Banner'
import ChatBots from './components/ChatBots'
import KeyFeatures from './components/KeyFeatures'
import Faq from '../../components/Faq/Faq'
import { RealTimeFaqData } from '../../constants/real-time-faq-data'
import ExperienceRealTime from './components/ExperienceRealTime'

const RealTimeAnswerModule = () => {
  return (
    <section className='dark:bg-[url(/assets/images/real-time-background.svg)] bg-no-repeat bg-cover bg-center pt-[72px]'>
        <Banner/>
        <ChatBots/>  
        <KeyFeatures/>
        <Faq faqData={RealTimeFaqData}/>
        <ExperienceRealTime/>
    </section>
  )
}

export default RealTimeAnswerModule