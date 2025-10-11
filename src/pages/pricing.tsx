import React from 'react'
import LandingLayout from '../components/global/layout/landingLayout'
import PricingModule from '../modules/PricingModule/PricingModule'


const PricingPage = () => {
    return (
        <LandingLayout parentClass='rt-bg-pricing-wrapper'>
            <PricingModule />
        </LandingLayout>
    )
}

export default PricingPage