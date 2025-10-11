import React from 'react'
import CoreFeaturesTable from './CoreFeaturesTable'

const CoreFeatures = () => {
    return (
        <section className='mb-20 py-20 rt-core-features bg-whiteSmoke'>
            <div className='container-landingpagetwo relative z-[1]'>
                <div className='flex gap-5 lg:gap-20 lg:flex-row flex-col justify-between mb-10'>
                    <h4 className='fs-40 shrink-0'>Core features</h4>
                    <div className='grid sm:grid-cols-4 gap-6'>
                        <div className='custom-border custom-border-inner py-4 px-6 overflow-hidden rounded-lg p-4 bg-white text-white shadow-lg w-full'>
                            <h6 className='fs-20 font-normal'>Free</h6>
                            <h5 className="fs-40 text-left font-bold grow">
                                {"$0"}
                                <span className="fs-18 !font-light text-greyChateau">
                                    / per month
                                </span>
                            </h5>
                        </div>

                        <div className='custom-border custom-border-inner py-4 px-6 overflow-hidden rounded-lg p-4 bg-white text-white shadow-lg w-full'>
                            <h6 className='fs-20 font-normal'>Starter</h6>
                            <h5 className="fs-40 text-left font-bold grow">
                                {"$20"}
                                <span className="fs-18 !font-light text-greyChateau">
                                    / per month
                                </span>
                            </h5>
                        </div>

                        <div className='custom-border custom-border-inner py-4 px-6 overflow-hidden rounded-lg p-4 bg-white text-white shadow-lg w-full'>
                            <h6 className='fs-20 font-normal truncate w-full'>Pro</h6>
                            <h5 className="fs-40 text-left font-bold grow">
                                {"$44"}
                                <span className="fs-18 !font-light text-greyChateau">
                                    / per month
                                </span>
                            </h5>
                        </div>

                        <div className='custom-border custom-border-inner py-4 px-6 overflow-hidden rounded-lg p-4 bg-white text-white shadow-lg w-full'>
                            <h6 className='fs-20 font-normal truncate w-full'>Unlimited</h6>
                            <h5 className="fs-40 text-left font-bold grow">
                                {"$99"}
                                <span className="fs-18 !font-light text-greyChateau">
                                    / per month
                                </span>
                            </h5>
                        </div>
                          
                    </div>

                </div>
                <CoreFeaturesTable/>
            </div>
        </section>
    )
}

export default CoreFeatures