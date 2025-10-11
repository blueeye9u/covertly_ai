import React from 'react'
import MetaTags from '../../components/config/MetaTags'
import LandingLayout from '../../components/global/layout/landingLayout'
import RealTimeAnswerModule from '../../modules/RealTimeAnswerModule/RealTimeAnswerModule'



const RealTimeAnswer = () => {
    return (
        <>
            <MetaTags title="Real Time Answer" />
            <LandingLayout>
                <RealTimeAnswerModule />      
            </LandingLayout>
        </>
    )
}

export default RealTimeAnswer