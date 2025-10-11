import React from 'react'
import LandingLayout from '../components/global/layout/landingLayout'
import PricingHomePlan from '../modules/LandingPage/components/PricingHomePlan'
import NewHomeBanner from '../modules/LandingPage/components/NewBanner'
import AccessAdvancedAI from "../modules/LandingPage/components/AccessAdvancedAI";
import AIModelList from "../modules/LandingPage/components/AIModelList";
import LevelupCovertlyProTools from "../modules/LandingPage/components/LevelupCovertlyProTools";
import CheckFullyLoadedFeatures from "../modules/LandingPage/components/CheckFullyLoadedFeatures";
import ExploreModelAnimation from "../components/ExploreModels";
import AbsolutePrivacy from "../modules/LandingPage/components/AbsolutePrivacy";
import HeroBackgroundVideo from '../modules/LandingPage/components/HeroBackgroundVideo'

const HomePage = () => {
    return (
        <LandingLayout parentClass='pt-[72px] lg:pt-0 overflow-clip'>
            <div className='landing_home-banner relative main-h-screen'>
                <HeroBackgroundVideo />
                <NewHomeBanner/>
            </div>
            <AccessAdvancedAI />
            <AIModelList />
            <ExploreModelAnimation />
            <CheckFullyLoadedFeatures />
            <LevelupCovertlyProTools />
            <AbsolutePrivacy />
            <PricingHomePlan/>
        </LandingLayout>
    )
}

export default HomePage