import React from 'react'
import { Button } from '../../../components/global/button/Button'
import { RightArrow } from '../../../svgs/svg'
import ImageComponent from '../../../components/global/imageComponent/ImageComponent'
import useLoggedInStatus from '../../../hooks/useLoggedInStatus'
import Link from 'next/link'
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../../constants/routes'

const AdvanceProTools = () => {
    const [isLoggedIn] = useLoggedInStatus();
    return (
        <div className='container-landingpage lg:py-28 py-16'>
            <div className='md:px-12'>
            <h2 className='fs-56 lg:mb-16 sm:mb-8 mb-5 text-center'>Advanced Pro Tools</h2>
            <div className='grid md:grid-cols-2 items-center gap-10 lg:gap-20'>
                <div className=''>
                    <h3 className='fs-32 sm:mb-5 mb-3'>Chat with Your PDFs</h3>
                    <p className='mb-8'>{"Interact with your documents like never before! Whether it's legal agreements, financial reports, or research papers, our AI-powered chatbot helps you quickly extract insights, generate summaries, and find key information. Just upload your PDF and start asking questions."}</p>
                    <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                      <Button size='lg' className='!rounded-full'>Start Chatting<span className='rotate-180'><RightArrow /></span> </Button>
                    </Link>
                </div>
                <ImageComponent src={"/assets/images/chat-pdf.webp"} width={494} height={398} figClassName='w-full' className='w-full h-full' alt="chat-pdf-image"/>
                <ImageComponent src={"/assets/images/generate-image-pdf.svg"} width={494} height={398} figClassName='w-full md:order-3 order-4' className='w-full h-full' alt="generate-image"/>
                <div className='md:order-4 order-3'>
                    <h3 className='fs-32 sm:mb-5 mb-3'>Start Creating</h3>
                    <p className='mb-8'>{"Turn your ideas into images in seconds! Simply describe what you envision, and our AI-powered image generator will transform your words into stunning visuals. Whether it's artwork, designs, or creative concepts, bring your imagination to life effortlessly! "}</p>
                    <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.IMAGE_GENERATION : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                        <Button size='lg' className='!rounded-full'>Let’s Try <span className='rotate-180'><RightArrow /></span> </Button>
                    </Link>
                </div>



                 <div className='order-5'>
                    <h3 className='fs-32 sm:mb-5 mb-3'>Instant Smart Redaction</h3>
                    <p className='mb-8'>{"Protect your data with real-time redaction. Covertly AI instantly removes sensitive information, ensuring privacy. From personal details to financial records, our AI keeps your data secure effortlessly. Stay protected without any manual effort."}</p>
                    <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                      <Button size='lg' className='!rounded-full'>Let’s Try<span className='rotate-180'><RightArrow /></span> </Button>
                    </Link>
                </div>
                <ImageComponent src={"/assets/images/redaction-pdf.svg"} width={494} height={398} figClassName='w-full order-6' className='w-full h-full' alt="reaction-pdf-image"/>
            </div>
            </div>

        </div>
    )
}

export default AdvanceProTools