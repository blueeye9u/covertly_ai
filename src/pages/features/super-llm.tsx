import React from 'react'
import MetaTags from '../../components/config/MetaTags'
import LandingLayout from '../../components/global/layout/landingLayout'
import SuperllmModule from '../../modules/SuperllmModule'




const Superllm = () => {
    return (
        <>
            <MetaTags title="Super Llm" />
            <LandingLayout>
                <SuperllmModule />      
            </LandingLayout>
        </>
    )
}

export default Superllm