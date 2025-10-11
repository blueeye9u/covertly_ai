import React from 'react'
import Banner from './components/Banner'
import FeaturesAnonymity from './components/FeaturesAnonymity'
import SecretKey from './components/SecretKey'
import ProtectingPrivacy from './components/ProtectingPrivacy'
import Faq from '../../components/Faq/Faq'
import { AnonymityFaqData } from '../../constants/anonymity-faq-data'


const AnonymityModule = () => {
  return (
    <section className='dark:bg-[url(/assets/images/anonymity/anonymity.svg)] bg-no-repeat bg-cover bg-center'>
        <Banner/>
        <FeaturesAnonymity/>
        <SecretKey/>
        <Faq faqData={AnonymityFaqData} />
        <ProtectingPrivacy/>
    </section>
  )
}

export default AnonymityModule