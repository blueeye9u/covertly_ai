import React from 'react'
import AnonymitySlider from './AnonymitySlider'

const CovertlyAnonymity = () => {
  return (
    <div className='py-10 sm:py-20'>
        <div className='container-landingpage'>
            <div className='flex flex-col justify-center items-center text-center mb-10'>
                <h4 className='fs-40 mb-2 text-center'>Covertly Anonymity Your Privacy, Our Priority</h4>
                <p className=''>{"At Covertly, we are committed to safeguarding your anonymity throughout your journey."} <span className='block'>{"Here's how we ensure your privacy at every step"}</span></p>
            </div>
        </div>
        <AnonymitySlider />
    </div>
  )
}

export default CovertlyAnonymity