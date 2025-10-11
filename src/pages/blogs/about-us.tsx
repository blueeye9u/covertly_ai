import React from 'react'
import MetaTags from '../../components/config/MetaTags'
import LandingLayout from '../../components/global/layout/landingLayout'
import AboutUsModule from '../../modules/AboutUsModule/AboutUsModule'

const AboutUs = () => {
    return (
        <>
            <MetaTags title="About Us" />
            <LandingLayout>
                <AboutUsModule />      
            </LandingLayout>
        </>
    )
}

export default AboutUs