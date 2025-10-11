import React from 'react'
import Faq from '../../components/Faq/Faq'
import BannerResources from './Components/BannerResources'
import ResourcesCard from '../../components/ResourcesCard/ResourcesCard'
import { AllDiscoverCovertlyData } from '../../constants/discover-covertly-data'
import { FaqData } from '../../constants/faq-data'

const ResourcesModule = () => {
  return (
    <>
      <BannerResources/>
      <section className='md:py-20 py-10 container-landingpage z-[1] relative'>
        <ResourcesCard data={AllDiscoverCovertlyData} isResourcesPage={false} />
      </section>
      <Faq faqData={FaqData}/>
    </>
  )
}

export default ResourcesModule