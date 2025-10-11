import Link from 'next/link';
import React from 'react';
import useLoggedInStatus from '../../../hooks/useLoggedInStatus';
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../../constants/routes';
import { Button } from '../../../components/global/button/Button';
import { RightArrow } from '../../../svgs/svg';

const Banner = () => {
  const [isLoggedIn] = useLoggedInStatus();
  return (
    <div className='w-full sm:pt-0 pt-28 sm:pb-0 pb-5 sm:bg-[url(/assets/images/super-llm/super-llm-light.svg)] sm:dark:bg-[url(/assets/images/super-llm/super-llm.svg)] bg-no-repeat sm:h-[400px] dark:sm:h-[500px] dark:md:h-[780px] dark:lg:h-[900px] dark:2xl:h-[1050px] bg-size-100 bg-center relative after:content-[""] after:absolute after:hidden dark:after:block dark:after:bg-[url(/assets/images/super-llm/gradient.svg)] after:h-[300px] after:w-[300px] after:right-0 after:bottom-0 after:z-20'>
      <div className='container-landingpage relative sm:mb-0'>
        <div className='sm:absolute top-16 xl:top-28 w-full flex flex-col justify-center items-center sm:pr-10'>
          <h4 className='fs-64 text-center sm:w-[350px] md:w-[748px] mx-auto mb-6 leading-tight'>Unlock the Power of AI with our Super LLM</h4>
          <span className='text-center block mb-8'>Transform your text generation and conversations with Elijah 1.0.</span>
          <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
            <Button size='lg' className="btn rounded-full !min-w-auto !flex-none">Get Started with Elijah 1.0 <span className='rotate-180'><RightArrow /></span></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
