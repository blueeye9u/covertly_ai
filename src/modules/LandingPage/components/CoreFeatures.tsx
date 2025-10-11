import React from "react";
import GenerateImagesAnimation from "../../../components/CovertlyFeatures/GenerateImagesAnimation";
import AiGeneratedAnimation from "../../../components/CovertlyFeatures/AiGeneratedAnimation";
import { GoogleIntegrationAnimation } from "../../../components/CovertlyFeatures/GoogleIntegrationAnimation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DataPrivacyAnimation from "../../../components/CovertlyFeatures/DataPrivacyAnimation";
import PdfReadingAnimation from "../../../components/CovertlyFeatures/PdfReadingAnimation";
import AnonymousAnimation from "../../../components/CovertlyFeatures/AnonymousAnimation";
import SecureRedactionAnimation from "../../../components/CovertlyFeatures/SecureRedactionAnimation";
import { CustomPrevArrow, CustomNextArrow } from "../../../components/SliderArrows";
import FeatureCard from "../../../components/FeatureCard";
import OcrSupportBubbles from "../../../components/OcrSupportBubbles";
import MultipleLlmsIcon from "../../../components/MultipleLlmsIcon";
import { featureItems, FeatureItem } from "./featureData";

const CoreFeaturesCovertly: React.FC = () => {
  // Slider settings for mobile view
  const settings = {
    slidesToShow: 1.5,
    centerMode: true,
    centerPadding: "10%",
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    dots: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  /**
   * Renders the appropriate content based on feature type
   */
  const renderFeatureContent = (feature: FeatureItem, isMobile: boolean = false) => {
    switch (feature.type) {
      case "googleIntegration":
        return <GoogleIntegrationAnimation />;
      case "anonymous":
        return <div className={isMobile ? "mb-4" : "mb-10"}><AnonymousAnimation /></div>;
      case "dataPrivacy":
        return <div className="flex items-center"><DataPrivacyAnimation /></div>;
      case "generateImages":
        return <GenerateImagesAnimation />;
      case "aiGeneratedLibrary":
        return <AiGeneratedAnimation />;
      case "multipleLlms":
        return (
          <MultipleLlmsIcon 
            className={`mb-10 ${isMobile ? "h-full" : ""}`} 
            iconPath={isMobile ? "/assets/images/covertly-features/multiple-llms/logo.svg" : "/assets/images/covertly-features/multiple-llms/multiple-llm-logo.webp"}
          />
        );
      case "secureRedaction":
        return <div className="flex"><SecureRedactionAnimation /></div>;
      case "ocrSupport":
        return (
          <OcrSupportBubbles 
            scannerImagePath={isMobile ? "/assets/images/covertly-features/ocr-support/scanner.svg" : "/assets/images/covertly-features/ocr-support/scanner.webp"}
          />
        );
      case "pdfReading":
        return <PdfReadingAnimation />;
      default:
        return null;
    }
  };

  // Find feature items by type
  const getFeatureByType = (type: string): FeatureItem => {
    return featureItems.find(item => item.type === type) || featureItems[0];
  };

  return (
    <section className="container-landingpage covertly_gradient !relative">
      <h5 className="fs-64 text-center mb-5">Features of Covertly AI</h5>
      <p className="dark:text-linkWater50 text-center max-w-[418px] mx-auto mb-16">
        Covertly.AI ensures anonymity and data security through robust privacy protection, data deletion, and auto redaction.
      </p>

      {/* Desktop/Tablet Layout - Top Row */}
      <div className="hidden sm:grid lg:grid-cols-12 sm:grid-cols-2 gap-6 mb-6">
        {/* Google Integration */}
        <FeatureCard
          title={getFeatureByType("googleIntegration").title}
          description={getFeatureByType("googleIntegration").description}
          className="xl:col-span-3 lg:col-span-4"
          titleContentClassName="mt-6"
        >
          {renderFeatureContent(getFeatureByType("googleIntegration"))}
        </FeatureCard>

        {/* Anonymous Interaction */}
        <FeatureCard
          title={getFeatureByType("anonymous").title}
          description={getFeatureByType("anonymous").description}
          className="xl:col-span-6 lg:col-span-4"
          figureContentClassName="mb-10"
        >
          {renderFeatureContent(getFeatureByType("anonymous"))}
        </FeatureCard>

        {/* Data Privacy */}
        <FeatureCard
          title={getFeatureByType("dataPrivacy").title}
          description={getFeatureByType("dataPrivacy").description}
          className="xl:col-span-3 lg:col-span-4"
          figureContentClassName="flex items-center"
        >
          {renderFeatureContent(getFeatureByType("dataPrivacy"))}
        </FeatureCard>

        {/* Hidden on large screens, showing on medium */}
        <FeatureCard
          title={getFeatureByType("generateImages").title}
          description={getFeatureByType("generateImages").description}
          className="lg:hidden xl:col-span-3 lg:col-span-4"
        >
          {renderFeatureContent(getFeatureByType("generateImages"))}
        </FeatureCard>
      </div>

      {/* Desktop/Tablet Layout - Bottom Rows */}
      <div className="hidden sm:grid lg:grid-cols-12 grid-cols-1 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-3 lg:col-span-4 col-span-12 grid gap-6">
          {/* Generate Images */}
          <FeatureCard
            title={getFeatureByType("generateImages").title}
            description={getFeatureByType("generateImages").description}
            titleContentClassName="mt-2"
            className="hidden lg:block"
          >
            {renderFeatureContent(getFeatureByType("generateImages"))}
          </FeatureCard>

          {/* AI Generated Library (hidden on xl) */}
          <FeatureCard
            title={getFeatureByType("aiGeneratedLibrary").title}
            description={getFeatureByType("aiGeneratedLibrary").description}
            titleContentClassName="mt-2"
            className="xl:hidden"
          >
            {renderFeatureContent(getFeatureByType("aiGeneratedLibrary"))}
          </FeatureCard>
        </div>

        {/* Right Columns */}
        <div className="xl:col-span-9 lg:col-span-8 col-span-12">
          <div className="grid lg:grid-cols-12 sm:grid-cols-2 grid-cols-12 gap-6 mb-6">
            {/* Multiple LLMs */}
            <FeatureCard
              title={getFeatureByType("multipleLlms").title}
              description={getFeatureByType("multipleLlms").description}
              className="xl:col-span-4 lg:col-span-6 col-span-12"
            >
              {renderFeatureContent(getFeatureByType("multipleLlms"))}
            </FeatureCard>

            {/* Secure Auto Redaction */}
            <FeatureCard
              title={getFeatureByType("secureRedaction").title}
              description={getFeatureByType("secureRedaction").description}
              className="xl:col-span-8 lg:col-span-6 col-span-12"
              figureContentClassName="flex"
            >
              {renderFeatureContent(getFeatureByType("secureRedaction"))}
            </FeatureCard>
          </div>

          <div className="grid xl:grid-cols-12 sm:grid-cols-2 gap-6">
            {/* OCR Support */}
            <FeatureCard
              title={getFeatureByType("ocrSupport").title}
              description={getFeatureByType("ocrSupport").description}
              className="xl:col-span-4"
            >
              {renderFeatureContent(getFeatureByType("ocrSupport"))}
            </FeatureCard>

            {/* PDF Reading */}
            <FeatureCard
              title={getFeatureByType("pdfReading").title}
              description={getFeatureByType("pdfReading").description}
              className="overflow-hidden xl:col-span-4"
              titleContentClassName="mt-2"
            >
              {renderFeatureContent(getFeatureByType("pdfReading"))}
            </FeatureCard>

            {/* AI Generated Image Library (visible on xl) */}
            <FeatureCard
              title={getFeatureByType("aiGeneratedLibrary").title}
              description={getFeatureByType("aiGeneratedLibrary").description}
              className="xl:col-span-4 xl:flex hidden"
            >
              {renderFeatureContent(getFeatureByType("aiGeneratedLibrary"))}
            </FeatureCard>
          </div>
        </div>
      </div>

      {/* Slider for small screens */}
      <div className="sm:hidden">
        <Slider {...settings} className="overflow-x-visible -ml-3 flex">
          {featureItems.map((feature) => (
            <div key={feature.id} className="px-1 flex h-[400px]">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                className="h-full"
                isMobile={true}
              >
                {renderFeatureContent(feature, true)}
              </FeatureCard>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CoreFeaturesCovertly;