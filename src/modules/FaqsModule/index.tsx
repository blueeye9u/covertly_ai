import React from 'react'
import Banner from './Components/Banner'
import UnifiedFaqs from './Components/UnifiedFaqs'
import SupportModule from "../SupportModule";
import LeaveNoStoneUnturned from "./Components/LeaveNoStoneUnturrned";

const FaqsModule = () => {
    return (
        <section className='pt-[100px] pb-10 lg:pb-0 xl:pb-[60px]'>
            <Banner />
            <UnifiedFaqs/>
            <SupportModule />
            <LeaveNoStoneUnturned/>
        </section>
    )
}

export default FaqsModule