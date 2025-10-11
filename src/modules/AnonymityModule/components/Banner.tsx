import React from 'react'
import DataPrivacyAnimation from '../../../components/CovertlyFeatures/DataPrivacyAnimation';
import { Banner, BannerCard } from '../../../components/Banner';

const AnonymityBanner = () => {
  return (
    <Banner
      title="Anonymous + Secure + Unmoderated"
      description="Covertly AI ensures complete anonymity, encrypting every interaction with zero data retention or moderation."
      buttonText="Unlock Secure Conversations"
      containerClassName="container-landingpage pt-[110px] pb-[72px]"
      headerClassName="flex flex-col justify-center items-center mb-[72px]"
      useGrid={true}
    >
      <BannerCard
        title="Anonymous Interaction"
        description="Chat freely with complete anonymity. Covertly AI never stores, tracks, or shares your personal information—ensuring total privacy."
        imageSrc="/assets/images/anonymity/banner-01.webp"
      />
      
      <BannerCard
        title="Unmoderated Conversations"
        description="No restrictions, no interference. Covertly AI lets you engage in unfiltered discussions with total privacy and security."
        customComponent={<DataPrivacyAnimation />}
      />
      
      <BannerCard
        title="Data Deletion"
        description="Covertly AI automatically deletes all data every 24 hours or immediately, depending on user preferences."
        imageSrc="/assets/images/anonymity/banner-02.webp"
      />
    </Banner>
  );
};

export default AnonymityBanner;