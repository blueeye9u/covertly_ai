import React from 'react'
import PricingHomePlan from '../LandingPage/components/PricingHomePlan'
import CoreFeatures from './CoreFeatures'

const PricingModule = () => {
    return (
        <>
            <section className='py-20'><PricingHomePlan /></section>
            <CoreFeatures />
        </>
    )
}

export default PricingModule