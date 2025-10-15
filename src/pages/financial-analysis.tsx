import React from 'react'
import MetaTags from '../components/config/MetaTags'
import LandingLayout from '../components/global/layout/landingLayout'
import FinancialAnalysisModule from '../modules/FinancialAnalysis'

const FinancialAnalysis = () => {
    return (
        <>
            <MetaTags title="Financial Analysis" />
            <LandingLayout>
                <FinancialAnalysisModule />
            </LandingLayout>
        </>
    )
}

export default FinancialAnalysis