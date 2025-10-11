import React from 'react'
import CovertlyBetter from './Components/CovertlyBetter'
import Banner from './Components/Banner'
import Faq from '../../components/Faq/Faq'
import { FaqData } from '../../constants/faq-data'

import HowItWorks from './Components/HowitWorks'
import OurCommitment from './Components/OurCommitment'

const HowItWorkModule = () => {
  return (
    <section className='dark:bg-[url(/assets/images/how-it-works-background.svg)] bg-no-repeat bg-cover bg-center pt-[72px] pb-10 lg:pb-20 xl:pb-[120px]'>
      <Banner />
      <OurCommitment />
      <HowItWorks/>
      <CovertlyBetter />
      <Faq faqData={FaqData} />
    </section>
  )
}

export default HowItWorkModule