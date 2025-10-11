import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '../../context/themeContext'
import { images } from '../../assets/images'

const AccountVerifiedModule = () => {
    const { isDarkMode } = useTheme();
    return (
        <main id="main" className="main authlayout">
            <div className="grow">
                <div className="mx-auto flex h-full w-full max-w-[950px] flex-col px-5 py-8 pb-16 lg:p-8">
                    <div className="flex items-center justify-between gap-5">
                        <strong className="flex-shrink-0">
                            <Link href={"/"} className="inline-block">
                                <Image src={isDarkMode ? images.lightLogo : images.logo} alt="logo" width={139} height={44} />
                            </Link>
                        </strong>
                    </div>
                     <div className='grow flex py-40'>
                        <div className='max-w-[556px] w-full mx-auto bg-whiteSmoke dark:bg-blackRussian2 p-6 rounded-xl flex flex-col grow'>
                            <strong className="flex-shrink-0 mb-8 mx-auto">
                                <Image src={isDarkMode ? images.lightLogo : images.logo} alt="logo" width={139} height={44} />
                            </strong>

                           <figure className='w-full bg-light dark:bg-[#262932] flex gap-7 items-center justify-center p-5 grow mb-6'>
                           <Image
                                    src={"/assets/images/success-gif.gif"}
                                    height={170}
                                    width={170}
                                    className="w-[170px] h-[170px]"
                                    alt="logo"
                                />
                           </figure>

                            <h5 className='fs-28 dark:text-white text-center'>Welcome ONBOARD!</h5>
                            <p className=' dark:text-[#7C7D80] text-center'>Your account is now prepared</p>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default AccountVerifiedModule