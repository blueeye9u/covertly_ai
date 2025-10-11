import React from 'react'
import { Button } from '../../../components/global/button/Button'
import { RightIcon, ShapeIcon } from '../../../svgs/svg'
import useLoggedInStatus from '../../../hooks/useLoggedInStatus';
import Link from 'next/link';
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../../constants/routes';

const TransformConversation = () => {
    const [isLoggedIn] = useLoggedInStatus();
    return (
        <section className='md:py-[120px] py-16 container-landingpage'>
            <div className='sm:py-20 py-10 p-8 rounded-3xl flex flex-col justify-center items-center anonymous-gradient'>
                <h2 className='fs-52 mb-1 text-white text-center'>Unleash 5x More Power</h2>
                <p className='text-white text-center mb-10 sm:mb-16 max-w-[709px] mx-auto'>Get started with Elijah 1.0, the power of five LLMs combined into one. Seamlessly integrate and leverage multiple AI models for superior responses. Optimize performance with unified intelligence.</p>

                <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                <Button size='lg' color='secondary' className="btn rounded-full !min-w-auto !flex-none relative">Get Started Now 
                    <RightIcon/>
                    <span className='absolute -top-5 -right-7'><ShapeIcon/></span>
                </Button>
                </Link>
               
            </div>
        </section>
    )
}

export default TransformConversation