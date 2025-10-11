import React from 'react'
import {useRouter} from "next/router";
import {Button} from "../../components/global/button/Button";

const SupportModule = () => {
    const router = useRouter();
    const handleLiveChatClick = () => {
        router.push('/support/live'); // Redirect
    };
    return (
        <div className='container-landingpage w-full flex flex-col justify-center items-center mt-12'>
            <h2 className="fs-48 text-center text-[#24272E] dark:text-white mb-4 leading-tight">Need Help? We are Here for You !</h2>
            <h5 className='dark:text-[#D0D2DA] text-[#24272E] text-center mb-4'>
                Your peace of mind is very import to us. If you still can{`'`}t find the answer you{`'`}re looking for,
                <div className='lg:block'>just get in touch!</div>
            </h5>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full">
                <a href="mailto:support@covertly.ai" className="w-full sm:w-52">
                    <Button
                        size="lg"
                        color="primary"
                        className="w-full h-12 flex items-center justify-center"
                    >
                        Email Support
                    </Button>
                </a>

                <div className="w-full sm:w-52">
                    <Button
                        size="lg"
                        color="primary"
                        className="w-full h-12 flex items-center justify-center"
                        onClick={handleLiveChatClick}
                    >
                        Live Chat
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SupportModule



