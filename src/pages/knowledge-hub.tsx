import React from 'react'
import MetaTags from '../components/config/MetaTags'
import LandingLayout from '../components/global/layout/landingLayout'
import KnowledgeHubModule from '../modules/KnowledgeHubModule/KnowledgeHubModule'

const KnowledgeHub = () => {
    return (
        <>
            <MetaTags title="Knowledge Hub" />
            <LandingLayout>
                <KnowledgeHubModule />      
            </LandingLayout>
        </>
    )
}

export default KnowledgeHub