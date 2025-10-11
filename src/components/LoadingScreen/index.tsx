import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/themeContext';
import { images } from '../../assets/images';

interface LoadingScreenProps {
  headingText: string;
  paragraphText: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ headingText, paragraphText }) => {
  const { isDarkMode } = useTheme();

  const [currentStep] = useState(0);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    const headingAnimationDuration = 1500;
    const paragraphDelay = 500;

    const startParagraphAnimation = () => {
      setTimeout(() => {
        setShowParagraph(true);
      }, paragraphDelay);
    };

    const headingTimer = setTimeout(() => {
      startParagraphAnimation();
    }, headingAnimationDuration);

    return () => clearTimeout(headingTimer);
  }, []);

  return (
    <main id="main" className="main authlayout">
      <div className="grow">
        <div className="mx-auto flex h-full w-full max-w-[950px] flex-col px-5 py-8 pb-16 lg:p-8">
          <div className="flex items-center justify-between gap-5">
            <strong className="flex-shrink-0">
              <Link href={"/"} className="inline-block">
                <Image
                  src={isDarkMode ? images.lightLogo : images.logo}
                  alt="logo"
                  width={139}
                  height={44}
                />
              </Link>
            </strong>
          </div>

          <div className="grow flex py-40">
            <div className="max-w-[556px] w-full mx-auto bg-whiteSmoke dark:bg-blackRussian2 p-6 rounded-xl flex flex-col grow">
              <strong className="flex-shrink-0 mb-8 mx-auto">
                <Image
                  src={isDarkMode ? images.lightLogo : images.logo}
                  alt="logo"
                  width={139}
                  height={44}
                />
              </strong>

              <div className="w-full bg-light dark:bg-[#262932] flex sm:flex-row flex-col gap-16 items-center justify-between p-5 grow mb-6">
                <div className="w-[120px] h-[120px] bg-whiteSmoke dark:bg-blackRussian2 flex justify-center items-center rounded-xl">
                  <Image
                    src={
                      isDarkMode
                        ? "/assets/images/dark-small-logo.svg"
                        : "/assets/images/light-small-logo.svg"
                    }
                    width={31}
                    height={58}
                    className="w-[31px] h-[58px]"
                    alt="logo"
                  />
                </div>

                <Image
                  src={"/assets/images/initializing.svg"}
                  width={103}
                  height={9}
                  className="w-[101px] h-[9px] rotate-90 sm:rotate-180"
                  alt="logo"
                />

                <div className="w-[120px] h-[120px] bg-whiteSmoke dark:bg-blackRussian2 flex justify-center items-center rounded-xl">
                  <Image
                    src={"/assets/images/anonymous.svg"}
                    width={66}
                    height={66}
                    className="w-16 h-16"
                    alt="logo"
                  />
                </div>
              </div>

              {/* Heading Animation */}
              <h5
                className={`fs-28 dark:text-white anonymous_typing ${
                  currentStep >= 0 ? "fade-in" : "invisible"
                }`}
              >
                {headingText}
              </h5>

              {/* Paragraph Animation */}
              <div className='w-[310px] mx-auto'>
                <p
                  className={`dark:text-[#7C7D80] ${
                    showParagraph ? "fade-in anonymous_typing" : "invisible"
                  }`}
                >
                  {paragraphText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoadingScreen;