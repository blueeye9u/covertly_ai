import React from 'react'
import LandingLayout from '../components/global/layout/landingLayout'
import Banner from '../modules/LandingPage/components/Banner'
import BenefitsCovertly from '../modules/LandingPage/components/BenefitsCovertly'
import DiscoverCovertly from '../modules/LandingPage/components/DiscoverCovertly'
import PricingHomePlan from '../modules/LandingPage/components/PricingHomePlan'
import HowWorks from '../modules/LandingPage/components/HowWorks'

const HomePage = () => {
  return (
      <LandingLayout parentClass='rt-bg-wrapper rt-bg-light-wrapper overflow-hidden'>
          <Banner />
          <BenefitsCovertly/>
          <HowWorks/>
          <section className='rt-pricing_plan py-20'>
              <PricingHomePlan/>
          </section>
          <DiscoverCovertly/>
      </LandingLayout>
  )
}

export default HomePage