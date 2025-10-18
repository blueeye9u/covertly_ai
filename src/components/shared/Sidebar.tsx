import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Sidebar = () => {
    const router = useRouter();
    const menuItems = [
        { name: 'Financial Analysis', route: '/financial-analysis' },
        { name: 'Anonymous and Private Conversations', route: '/anonymous-private-conversations' },
        { name: 'Multi-Modality (Healthcare)', route: '/multi-modality' },
        { name: 'Responsive', route: '/features/real-time-answers' },
        { name: 'Elijah', route: '/elijah' },
        { name: 'Financial Executives', route: '/features/redaction' },
        { name: 'Multi-LLM Querying', route: '/multillm-querying' }
    ];
    
    const isActiveMenuItem = (route: string) => {
        return router.pathname === route;
    };

    return (
        <div className='hidden md:block rounded-2xl flex flex-col sticky top-24 self-start'>
            <div className='use-cases-profile' style={{ backgroundImage: 'url(/assets/images/use-cases/bg1.png)'}} >
                <div style={{display: "flex", alignItems: "end", gap: "15px"}}>
                    <Image src={"/assets/images/use-cases/13.png"} alt="wolf" width={100} height={100} />
                    <Image src={"/assets/images/use-cases/linkedin-blue.png"} alt="Linkedin-Blue" width={30} height={30} />
                </div>
                <p className='dark:text-white fs-24 font-semibold'>Tamás Hám-Szabó</p>
                <p className='dark:text-lavender text-sm fs-16 mb-2'>Founder of SAAS First - the Best AI and Data-Driven Customer Engagement Tool</p>
                <hr />
                <p className='dark:text-lavender text-sm fs-16 mt-2'>{`With 11 years in SaaS, I've built MillionVerifier and SAAS First. Passionate about SaaS, data, and AI. Let's connect if you share the same drive for success!`}</p>
            </div>
            <div className='use-cases-profile' style={{ backgroundImage: 'url(/assets/images/use-cases/bg2.png)'}} >
                <p className='dark:text-lavender text-sm fs-16 mb-2'>Share with your community!</p>
                <div style={{display: "flex", alignItems: "end", gap: "15px"}}>
                    <Image src={"/assets/images/use-cases/facebook.png"} alt="facebook" width={30} height={30} />
                    <Image src={"/assets/images/use-cases/twitter.png"} alt="twitter" width={30} height={30} />
                    <Image src={"/assets/images/use-cases/linkedin.png"} alt="linkedin" width={30} height={30} />
                </div>
            </div>
            <div className='bg-white dark:bg-[#FFFFFF08] rounded-2xl'>
                <h4 className='fs-24 font-bold dark:text-white mb-3 p-3'>See More Use Cases</h4>
                <ul className='mb-5'>
                    {menuItems.map((item, index) => (
                        <li 
                            key={index}
                            className={`see-more-use-cases fs-16 mb-5 ${
                                isActiveMenuItem(item.route) 
                                    ? 'text-[#30C5D2] see-more-use-cases-focus' 
                                    : 'dark:text-white'
                            }`}
                        >
                            {item.name}
                        </li>
                    ))}       
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
