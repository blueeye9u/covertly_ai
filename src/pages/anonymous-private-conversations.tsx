import React from 'react'
import MetaTags from '../components/config/MetaTags'
import LandingLayout from '../components/global/layout/landingLayout'
import AnonymousPrivateConversations from '../modules/AnonymousPrivateConversations'

const PrivateConversations = () => {
    return (
        <>
            <MetaTags title="Anonymous And Private Conversations" />
            <LandingLayout>
                <AnonymousPrivateConversations />
            </LandingLayout>
        </>
    )
}

export default PrivateConversations