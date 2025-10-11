import React from 'react'
import MetaTags from '../components/config/MetaTags'
import LandingLayout from '../components/global/layout/landingLayout'
import PrivacyPolicyModule from '../modules/PrivacyPolicyModule/PrivacyPolicyModule'

const HomePage = () => {
    return (
        <>
            <MetaTags title="Resources" />
            <LandingLayout parentClass='rt-bg-legal-wrapper'>
                <PrivacyPolicyModule/>
            </LandingLayout>
        </>
    )
}

export default HomePage