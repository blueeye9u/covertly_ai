import React from 'react'
import { DiscoverCovertlyData } from '../../../constants/discover-covertly-data'
import DiscoverArticles from '../../../components/DicsoverArticles/DiscoverArticles'

const DiscoverCovertly = () => {
  return (
    <section className='discover__covertly py-20'>
      <div className='container-landingpage z-[1] relative'>
        <div className='discover__covertly__head flex justify-between items-center gap-5 flex-wrap mb-8'>
          <h3 className='fs-40'>Explore & Discover</h3>
          {/* <Button className='btn flex-none' size='lg'>View All Blogs</Button> */}
        </div>
        <DiscoverArticles data={DiscoverCovertlyData} isResourcesPage={false} />
      </div>
    </section>
  )
}

export default DiscoverCovertly