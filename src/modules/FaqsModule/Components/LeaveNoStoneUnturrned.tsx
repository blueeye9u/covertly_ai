import React from 'react'
import useLoggedInStatus from '../../../hooks/useLoggedInStatus';
import Link from 'next/link';
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../../constants/routes';
import { Button } from '../../../components/global/button/Button';
import { RightIcon, ShapeIcon } from '../../../svgs/svg';

const LeaveNoStoneUnturned = () => {
    const [isLoggedIn] = useLoggedInStatus();
    return (
        <section className='md:pt-[110px] md:pb-1 sm:pt-8 pt-5 pb-0 mb-0 container-landingpage'>
            <div
                className='sm:py-10 py-5 p-8 rounded-3xl flex flex-col justify-center items-center anonymous-gradient'>
                <h2 className='fs-48 mb-1 text-[#E9EBF1] text-center'>Leave no stone unturned.</h2>
                <p className='text-[#E9EBF1] text-center mb-10 sm:mb-16 mx-auto fs-24'>Your peace of mind is very
                    important to us. If you still can{`'`}t find the answer you{`'`}re
                    <div className='block'>looking for, just get in touch!</div>
                </p>

                <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                    <Button size='lg' color='secondary' className="fs-16 btn rounded-full !min-w-auto !flex-none relative text-black" >
                        Contact Us
                        <RightIcon/>
                        <span className='absolute -top-5 -right-7'><ShapeIcon/></span>
                    </Button>
                </Link>

            </div>
        </section>
    )
}

export default LeaveNoStoneUnturned