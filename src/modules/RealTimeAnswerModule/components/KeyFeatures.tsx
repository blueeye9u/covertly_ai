import React from 'react'
import { GoogleIntegrationAnimation } from '../../../components/CovertlyFeatures/GoogleIntegrationAnimation'
import Image from 'next/image'
import DataPrivacyAnimation from '../../../components/CovertlyFeatures/DataPrivacyAnimation'
import PdfReadingAnimation from '../../../components/CovertlyFeatures/PdfReadingAnimation'

const KeyFeatures = () => {
  return (
    <div className='w-full pb-10 sm:pb-16 md:pb-[120px] container-landingpage'>
      <h4 className='fs-48 dark:text-white text-center'>Key Features at a Glance</h4>
      <p className='dark:text-linkWater50 text-sm max-w-[555px] mx-auto text-center mb-10'>Explore Covertly AI&apos;s core features, offering instant AI responses, seamless integration, and robust data privacy in a single solution.</p>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>

        <div className="border border-[#2C2E34] rounded-3xl p-8 bg-darkShadow dark:bg-darkBackground flex flex-col w-full" >
          <div className="grow">
            <GoogleIntegrationAnimation />
          </div>
          <h6 className="mb-2 fs-24 font-semibold mt-6">{"Google Search Integration"}</h6>
          <p className="line-clamp-2 text-sm">{"Covertly AI blends AI insights with real-time web data."}</p>
        </div>

        <div className="border border-[#2C2E34] rounded-3xl p-8 bg-darkShadow dark:bg-darkBackground flex flex-col w-full">
          <div className="grow flex items-center">
            <DataPrivacyAnimation /></div>
          <h6 className="mb-2 fs-24 font-semibold">Data Privacy Protection</h6>
          <p className="line-clamp-2 text-sm">{"Advanced privacy erases data post-processing securely."}</p>
        </div>

        <div className="border border-[#2C2E34] rounded-3xl p-8 bg-darkShadow dark:bg-darkBackground flex flex-col w-full">
          {/* <Image
                src={"/assets/images/covertly-features/08.svg"}
                className="w-full grow"
                alt="featureImage"
                width={134}
                height={127}
              /> */}

          <div className="grow"><PdfReadingAnimation /></div>
          <h6 className="mb-2 fs-24 font-semibold mt-2">{"PDF Reading Capability"}</h6>
          <p className="line-clamp-2 text-sm">{"Upload PDFs; Covertly AI extracts, redacts, and generates insights."}</p>
        </div>

        <div className="border border-[#2C2E34] rounded-3xl p-8 bg-darkShadow dark:bg-darkBackground flex flex-col w-full">

          <figure className="ocr-support relative">
            <Image
              src={"/assets/images/covertly-features/ocr-support/bubble1.svg"}
              className="bubble-green-01"
              alt="featureImage"
              width={13.93}
              height={13.93}
            />
            <Image
              src={"/assets/images/covertly-features/ocr-support/bubble2.svg"}
              className="bubble-green-02"
              alt="featureImage"
              width={8}
              height={8}
            />

            <Image
              src={"/assets/images/covertly-features/ocr-support/bubble1.svg"}
              className="bubble-green-001"
              alt="featureImage"
              width={13.93}
              height={13.93}
            />
            <Image
              src={"/assets/images/covertly-features/ocr-support/bubble2.svg"}
              className="bubble-green-002"
              alt="featureImage"
              width={8}
              height={8}
            />

            <Image
              src={"/assets/images/covertly-features/ocr-support/bubble-blue1.svg"}
              className="bubble-blue1"
              alt="featureImage"
              width={13.93}
              height={13.93}
            />
            <Image
              src={"/assets/images/covertly-features/ocr-support/bubble-blue1.svg"}
              className="bubble-blue2"
              alt="featureImage"
              width={8}
              height={8}
            />
            <Image
              src={"/assets/images/covertly-features/ocr-support/scanner.svg"}
              className="ocr_support_scanner"
              alt="featureImage"
              width={77}
              height={24}
            />

          </figure>

          <h6 className="mb-2 fs-24 font-semibold">{"OCR Support"}</h6>
          <p className="line-clamp-2 text-sm">{"Upload documents or images, and Covertly AI extracts."}</p>
        </div>

      </div>

    </div>
  )
}

export default KeyFeatures