import React from 'react'
import MetaTags from '../components/config/MetaTags'
import ResourcesModule from '../modules/ResourcesModule/ResourcesModule'
import LandingLayout from '../components/global/layout/landingLayout'


const HomePage = () => {
    return (
        <>
            <MetaTags title="Resources" />
            <LandingLayout>
                <ResourcesModule />      
            </LandingLayout>
        </>
    )
}

export default HomePage