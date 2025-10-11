import React from 'react'
import MetaTags from '../components/config/MetaTags'
import LandingLayout from '../components/global/layout/landingLayout'
import TermsAndConditionModule from '../modules/TermsAndConditionModule/TermsAndConditionModule'



const HomePage = () => {
    return (
        <>
            <MetaTags title="Resources" />
            <LandingLayout parentClass='rt-bg-legal-wrapper'>
                <TermsAndConditionModule/>   
            </LandingLayout>
        </>
    )
}

export default HomePage