import React from 'react'

const HowItWorks = () => {

  return (
    <div className='pb-10 sm:pb-20'>
      <div className='container-landingpage !max-w-[930px] !w-full'>
        <div className="flex flex-col justify-center items-center text-center mb-10">
          <h3 className='fs-40 mb-3'>How it Works?</h3>
          <p className=''>{"Curious about how Covertly works? Watch this quick video to see how we provide instant, real-time answers with total anonymity. Learn about our Advanced Redaction, Super LLM capabilities, and Anonymity features."}</p>
        </div>
        {/* <ImageComponent src={"/assets/images/how-works/01.png"} width={420}Curious about how Covertly works? Watch this quick video to see how we provide instant, real-time answers with total anonymity. Learn about our Advanced Redaction, Super LLM capabilities, and Anonymity features.
 height={420}  figClassName='w-full h-full' className='w-full h-full'/> */}
        {/* <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
          <iframe
            loading="lazy" title="Gumlet video player"
            src="https://play.gumlet.io/embed/67d0468a3ae6ee3ff9d480d3?preload=true&autoplay=true&loop=true&background=false&disable_player_controls=true"
            style={{
              border: "none",
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              borderRadius: "10px"
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;">
          </iframe>
        </div> */}
        <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
          <iframe
            loading="lazy" title="Gumlet video player"
            src="https://play.gumlet.io/embed/67ee39057ee0a66d6b2dfe6c?preload=false&autoplay=false&loop=false&background=false&disable_player_controls=false"
            style={{
              border: "none",
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              borderRadius: "10px"
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;">
          </iframe>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks