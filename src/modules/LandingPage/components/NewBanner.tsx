import React from 'react';
import Link from 'next/link';
import {Button} from '../../../components/global/button/Button';
import useLoggedInStatus from '../../../hooks/useLoggedInStatus';
import {AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES} from '../../../constants/routes';
import { RightArrow } from '../../../svgs/svg';

const NewHomeBanner = () => {
    const [isLoggedIn] = useLoggedInStatus();
    return (
        <section className='relative flex flex-col items-center h-full w-full px-4 pt-28'>
            <div className="heroArea">
                <div className="fg title">
                    <div className="titleLines">
                        <div className="coloredText">ANONYMOUS</div>
                        <div className="coloredText">UNMODERATED</div>
                        <div className="coloredText">SECURE</div>
                        COVERTLY <span className="delayWord">AI</span>
                        <div className="coloredText">ANONYMOUS</div>
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                        <Button size='lg' className='btn rounded-full !min-w-auto text-athensgray font-semibold text-[24px] animatedBtn heroBtn flex align-center'>
                            Start for Free{` `}
                            <span className='rotate-180 pb-1'><RightArrow/></span>
                        </Button>
                    </Link>
                </div>
                
            </div>
        </section>
    )
}

export default NewHomeBanner