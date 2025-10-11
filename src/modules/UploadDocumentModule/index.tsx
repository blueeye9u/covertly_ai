import React, { useState } from 'react';
import ChatBootLayout from '../../components/ChatBootLayout';
import ImageComponent from '../../components/global/imageComponent/ImageComponent';
import Progressbar from '../../components/global/progressBar';
import { Button } from '../../components/global/button/Button';
import Header from '../../components/header';

const UploadDocumentModule = () => {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
    const [switchSidebar, setSwitchSidebar] = useState<boolean>(true);



    console.log(setSwitchSidebar, "setSwitchSidebar");


    return (
        <ChatBootLayout toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} setSwitchSidebar={setSwitchSidebar} switchSidebar={switchSidebar}>
            <div className={"chatBoot"}>
                <Header toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
                <div className='flex flex-col justify-center items-center grow'>
                    <div className='flex flex-col justify-center items-center grow max-w-[431px]'>
                        <ImageComponent src={"/assets/images/upload-document.png"} width={272} height={234} alt='upload-image' figClassName='mb-10' />
                        <h6 className='text-base font-medium mb-4'>Document Ready!</h6>
                        <p className='text-aluminium text-sm mb-10'>We’ve successfully processed your document and it’s ready for review. </p>
                        <Progressbar />
                        <Button
                            size="lg"
                            type="button"
                            color="primary"
                            className="!flex-none !w-[168px] mt-14">Start Chat</Button>
                    </div>
                </div>
            </div>
        </ChatBootLayout>
    )
}

export default UploadDocumentModule