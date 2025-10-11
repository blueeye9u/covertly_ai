import React from 'react'
import Banner from './components/Banner'
import AutoRedaction from './components/AutoRedaction'
import RedactionJourney from './components/RedactionJourney'
import FeaturesRedaction from './components/FeaturesRedaction'
import Faq from '../../components/Faq/Faq'
import { RedactionFaqData } from '../../constants/redaction-faq-data'

const RedactionModule = () => {
  return (
    <section className='dark:bg-[url(/assets/images/real-time-background.svg)] bg-no-repeat bg-cover bg-center'>
        <Banner/>
        <FeaturesRedaction/>
        <AutoRedaction/>
        <Faq faqData={RedactionFaqData} />
        <RedactionJourney/>
    </section>
  )
}

export default RedactionModule