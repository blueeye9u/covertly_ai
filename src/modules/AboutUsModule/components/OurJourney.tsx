import React from 'react'
import useLoggedInStatus from '../../../hooks/useLoggedInStatus';
import Link from 'next/link';
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../../constants/routes';
import { Button } from '../../../components/global/button/Button';
import { RightIcon, ShapeIcon } from '../../../svgs/svg';

const OurJourney = () => {
    const [isLoggedIn] = useLoggedInStatus();
    return (
        <section className='md:py-[120px] sm:py-16 py-10 container-landingpage'>
            <div className='sm:py-20 py-10 p-8 rounded-3xl flex flex-col justify-center items-center bg-gradient-to-r from-[#22466482] to-[#75899A00] border border-linkWater50 dark:border-[#314151]'>
                <h2 className='fs-52 mb-5 text-white text-center'>Join Us on Our Journey</h2>
                <p className='text-white text-center mb-8 max-w-[519px] mx-auto'>Ready to experience secure, anonymous communication? Start your journey with Covertly today.</p>

                <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                <Button size='lg' color='secondary' className="btn !rounded-md !min-w-auto !flex-none relative !py-4 !text-blackRussian2">Get Started with Covertly
                    <RightIcon/>
                    <span className='absolute -top-5 -right-7'><ShapeIcon/></span>
                </Button>
                </Link>
               
            </div>
        </section>
  )
}

export default OurJourney