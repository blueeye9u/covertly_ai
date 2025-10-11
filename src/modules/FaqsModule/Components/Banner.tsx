import React from 'react'

const Banner = () => {
    return (
        <div className='py-10 flex flex-col justify-center items-center container-landingpage'>
            <div className='flex flex-col justify-center items-center text-center mb-10'>
                <h2 className="text-center font-bold mb-2">
                    Let{"'"}s answer some of your most frequently asked<br/>
                    <span>questions.</span>
                </h2>
                <h6 className='text-[16px] font-light text-[#24272E] dark:text-[#D0D2DA]'>{"Get answers to the most commonly asked questions below. Search for a specific keyword or use the feature categories to find"}
                    <span className='block'>{"what you're looking for."}</span>
                </h6>
            </div>
        </div>
    )
}

export default Banner