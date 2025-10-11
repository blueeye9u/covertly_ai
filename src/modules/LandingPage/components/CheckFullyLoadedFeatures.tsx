import React from 'react'
import FeatureIcon from '../../../components/FeatureIcon';
import { useTheme } from '../../../context/themeContext';

const staticFeatures = [
    {
        iconSource: '/assets/images/json/pdf.json',
        iconSource1: '/assets/images/json/pdf1.json',
        title: 'PDF Parsing',
        description: 'Analyze and chat with standard text or scanned PDFs.'
    },
    {
        iconSource: '/assets/images/json/multi.json',
        iconSource1: '/assets/images/json/multi1.json',
        title: 'Multi-Modality',
        description: 'Prompt using documents, audio, images, links, or spreadsheets.'
    },
    {
        iconSource: '/assets/images/json/current-sources.json',
        iconSource1: '/assets/images/json/current-sources1.json',
        title: 'Current Sources',
        description: 'Get AI insights using up-to-date information from the web.'
    },
    {
        iconSource: '/assets/images/json/prompt.json',
        iconSource1: '/assets/images/json/prompt1.json',
        title: 'Prompt Assist',
        description: 'Enhance prompts and follow-up with expert suggestions.'
    },
    {
        iconSource: '/assets/images/json/image.json',
        iconSource1: '/assets/images/json/image1.json',
        title: 'Image Generation',
        description: 'Create stunning visuals with DALL-E and Stable Diffusion.'
    },
    {
        iconSource: '/assets/images/json/image-vault.json',
        iconSource1: '/assets/images/json/image-vault1.json',
        title: 'Image Vault',
        description: 'Store your AI images in a centralized and secure library.'
    }
]

const CheckFullyLoadedFeatures = () => {
    const { isDarkMode} = useTheme();
    return (
        <section className="container-landingpage check-features-gradient">
            <div className="absolute transform -translate-x-1/2 top-2/3 bg-blackRussian bg-opacity-[0.01] z-[-1]">
            </div>
            <div className="absolute transform -translate-x-1/2 right-0 top-2/3 bg-blackRussian bg-opacity-[0.01] z-[-1]">
            </div>
            <div className="text-[48px] md:text-[56px] lg:text-[64px] mb-1 leading-normal text-center text-blackRussian dark:text-athensgray landing_home-title">Check these fully loaded <span className="text-mediumTurquoise">features</span>.</div>
            <div className="home-subtitle text-[20px] sm:text-[24px] leading-normal text-center
                text-blackRussian dark:text-frenchgray font-light max-w-[900px] mx-auto px-4">Covertly makes productivity feel like a stealth jet joyride. Powerful tools help you research, analyze, and generate without leaving a trace.</div>
            <div className="pt-9 md:pt-12 lg:pt-[96px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-[48px]">
                {staticFeatures.map((item) => (
                    <div className="relative" key={item.title}>
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                                <FeatureIcon
                                    src={isDarkMode ? item.iconSource ?? "" : item.iconSource1 ?? ""}
                                    alt="feature icon"
                                    height={90}
                                    width={90}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className='text-[20px] sm:text-[24px] leading-relaxed font-semibold text-athensgray mb-2'>{item.title}</div>
                                <div className='text-[15px] text-blackRussian dark:text-athensgray font-normal leading-[22px]'>{item.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CheckFullyLoadedFeatures