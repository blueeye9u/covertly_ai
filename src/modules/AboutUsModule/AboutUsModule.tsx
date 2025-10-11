import React from 'react'
import Banner from './components/Banner'
import OurVision from './components/OurVision'
import MeetExpert from './components/MeetExpert'
import Faq from '../../components/Faq/Faq'
import { AboutUsFaqData } from '../../constants/about-us-faq-data'
import OurJourney from './components/OurJourney'

const AboutUsModule = () => {
  return (
    <section className='dark:bg-[url(/assets/images/about-us/bg-gradient.svg)] bg-no-repeat bg-cover bg-center'>
        <Banner/>
        <OurVision/>
        <MeetExpert/>
        <Faq faqData={AboutUsFaqData}/>
        <OurJourney/>
    </section>
  )
}

export default AboutUsModule