import React from 'react'
import Link from "next/link";
import {Button} from "../../../components/global/button/Button";
import {RightArrow} from "../../../svgs/svg";

const TakeItForSpin = () => {
    return (
        <section className="container-landingpage mt-[96px] dark:bg-[url(/assets/images/svgs/CTA.svg)] bg-no-repeat bg-cover bg-center">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[64px] ">
                <Link href="#">
                    <Button size='lg' className="btn rounded-full !min-w-auto !flex-none">
                        Learn About Elijah{' '}
                        <span className='rotate-180'><RightArrow/></span>
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default TakeItForSpin