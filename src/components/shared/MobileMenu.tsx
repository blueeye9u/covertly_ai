import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface MobileMenuProps {
    isMenuExpanded: boolean;
    isAtBottom: boolean;
    toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuExpanded, isAtBottom, toggleMenu }) => {
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
        <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
            isAtBottom ? 'relative' : 'fixed'
        }`}>
            <button 
                className={`w-[100%] bg-gradient-to-r from-[#30C5D2] to-[#471069] h-16 flex items-center justify-center cursor-pointer transition-all duration-300 border-none outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                    isMenuExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                onClick={toggleMenu}
                type="button"
                aria-label="Toggle menu"
                aria-expanded={isMenuExpanded}
            >
                <div className="flex items-center gap-2 text-white">
                    <span className="text-sm font-medium">Menu</span>
                    <svg 
                        className="w-5 h-5 transition-transform duration-300 rotate-180" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            <div className={`w-[100%] bg-gradient-to-r from-[#30C5D2] to-[#471069] transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className="h-80 bg-white dark:bg-[#FFFFFF08] rounded-t-2xl p-4 overflow-y-auto">
                    <div className='use-cases-profile mb-4' style={{ backgroundImage: 'url(/assets/images/use-cases/bg1.png)'}} >
                        <div style={{display: "flex", alignItems: "end", gap: "15px"}}>
                            <Image src={"/assets/images/use-cases/13.png"} alt="wolf" width={80} height={80} />
                            <Image src={"/assets/images/use-cases/linkedin-blue.png"} alt="Linkedin-Blue" width={24} height={24} />
                        </div>
                        <p className='dark:text-white fs-20 font-semibold'>Tamás Hám-Szabó</p>
                        <p className='dark:text-lavender text-xs fs-14 mb-2'>Founder of SAAS First - the Best AI and Data-Driven Customer Engagement Tool</p>
                        <hr />
                        <p className='dark:text-lavender text-xs fs-14 mt-2'>{`With 11 years in SaaS, I've built MillionVerifier and SAAS First. Passionate about SaaS, data, and AI. Let's connect if you share the same drive for success!`}</p>
                    </div>

                    <div className='use-cases-profile mb-4' style={{ backgroundImage: 'url(/assets/images/use-cases/bg2.png)'}} >
                        <p className='dark:text-lavender text-xs fs-14 mb-2'>Share with your community!</p>
                        <div style={{display: "flex", alignItems: "end", gap: "15px"}}>
                            <Image src={"/assets/images/use-cases/facebook.png"} alt="facebook" width={24} height={24} />
                            <Image src={"/assets/images/use-cases/twitter.png"} alt="twitter" width={24} height={24} />
                            <Image src={"/assets/images/use-cases/linkedin.png"} alt="linkedin" width={24} height={24} />
                        </div>
                    </div>
                    <div className='bg-white dark:bg-[#FFFFFF08] rounded-xl'>
                        <h4 className='fs-20 font-bold dark:text-white mb-3 p-3'>See More Use Cases</h4>
                        <ul className='mb-5'>
                            {menuItems.map((item, index) => (
                                <li 
                                    key={index}
                                    className={`see-more-use-cases fs-16 mb-5 ${
                                        isActiveMenuItem(item.route) 
                                            ? 'text-[#30C5D2] border-l-3 border-[#30C5D2] pl-2' 
                                            : 'dark:text-white'
                                    }`}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button 
                    className="w-[100%] bg-gradient-to-r from-[#30C5D2] to-[#471069] h-12 flex items-center justify-center cursor-pointer border-none outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    onClick={toggleMenu}
                    type="button"
                    aria-label="Close menu"
                >
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-sm font-medium">Close</span>
                        <svg 
                            className="w-5 h-5 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default MobileMenu;
