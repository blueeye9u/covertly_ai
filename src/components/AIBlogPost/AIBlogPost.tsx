import React, { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from "next/router";

interface AIBlogPostProps {
  /**
   * Main banner image source
   */
  bannerImage: string;

  /**
   * Alt text for banner image
   */
  bannerAlt?: string;

  /**
   * Main title of the blog post
   */
  title: string;

  /**
   * Main description text
   */
  description?: string | ReactNode;

  /**
   * Content for the strengths section
   */
  strengthsContent: ReactNode;

  /**
   * Content for the limitations section
   */
  limitationsContent: ReactNode;

  /**
   * Content for the Covertly solution section
   */
  covertlySolutionContent: ReactNode;

  /**
   * Bottom image source
   */
  bottomImage: string;

  /**
   * Alt text for bottom image
   */
  bottomImageAlt?: string;

  /**
   * Additional custom content to render
   */
  children?: ReactNode;
}

/**
 * A reusable component for AI model blog posts that maintains consistent structure
 * while allowing for customized content
 */
const AIBlogPost: React.FC<AIBlogPostProps> = ({
  bannerImage,
  bannerAlt = "AI blog banner",
  title,
  description,
  strengthsContent,
  limitationsContent,
  covertlySolutionContent,
  bottomImage,
  bottomImageAlt = "Covertly features",
  children,
}) => {
  const router = useRouter();
  return (
    <div>
      <figure className='w-full mb-10'>
        <Image
          src={bannerImage}
          alt={bannerAlt}
          width={1220}
          height={550}
          className='w-full rounded-2xl'
        />
      </figure>

      <div className='grid sm:grid-cols-12 items-start sm:gap-8 gap-4'>
        <div className='lg:col-span-9 md:col-span-8 sm:col-span-7 pr-7 border-r border-whiteSmoke dark:border-blackRussian2'>
          <h2 className='fs-40 dark:text-white leading-tight mb-4'>{title}</h2>

          {typeof description === 'string' ? (
            <p className='mb-8 text-blackPearl dark:text-manatee'>{description}</p>
          ) : (
            description
          )}

          <h3 className='mb-4'>What makes it stand out?</h3>
          {strengthsContent}

          {limitationsContent}

          <h2 className='mb-3 fs-40'>Why Choose Covertly.AI?</h2>
          {covertlySolutionContent}

          {children}

          <figure className="relative">
            <Image
              src={bottomImage}
              alt={bottomImageAlt}
              width={897}
              height={262}
            />
            <button
              className="
                  absolute
                  left-[78%] top-[68%]
                  -translate-x-1/2 -translate-y-1/2
                  flex items-center justify-center
                  p-2 py-2.5 rounded-xl w-[220px] text-base font-semibold
                  transition-all duration-300
                  dark:bg-blackRussian4 bg-linkWater50 text-white shadow-lg
                  hover:scale-105 hover:shadow-2xl hover:brightness-110
                  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-linkWater50
                  sm:left-[75%] sm:top-[70%]
                  md:left-[78%] md:top-[68%]
                  lg:left-[80%] lg:top-[68%]
  "
              onClick={() => router.push("/")}
              style={{ zIndex: 10 }}
            >
              Switch to Covertly
            </button>
          </figure>
        </div>

        <div className='lg:col-span-3 md:col-span-4 sm:col-span-5 p-8 bg-whiteSmoke dark:bg-blackRussian2 rounded-3xl'>
          <ul className='space-y-3'>
            <li className='dark:text-white text-xl font-medium'>Categories</li>
            <li className='text-sm dark:text-manatee'>AI vs. Gemini</li>
            <li className='text-sm dark:text-manatee'>Data Security</li>
            <li className='text-sm dark:text-manatee'>Cybersecurity Trends</li>
            <li className='text-sm dark:text-manatee'>Anonymity in Tech</li>
            <li className='text-sm dark:text-manatee'>User Trust & Ethics</li>
            <li className='text-sm dark:text-manatee'>Privacy Laws & Regulations</li>
            <li className='text-sm dark:text-manatee'>AI Innovations</li>
            <li className='text-sm dark:text-manatee'>Data Breach Insights</li>
            <li className='text-sm dark:text-manatee'>Future of AI</li>
            <li className='text-sm dark:text-manatee'>Privacy Tools & Resources</li>
            <li className='text-sm dark:text-manatee'>Tech News & Updates</li>
            <li className='text-sm dark:text-manatee'>Case Studies</li>
            <li className='text-sm dark:text-manatee'>Product Updates</li>
            <li className='text-sm dark:text-manatee'>Startups & Innovation</li>
            <li className='text-sm dark:text-manatee'>Digital Ethics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIBlogPost;