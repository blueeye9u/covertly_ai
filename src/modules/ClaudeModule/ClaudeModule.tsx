import React from 'react';
import Image from 'next/image';
import AIBlogPost, { StrengthItem } from '../../components/AIBlogPost';

const ClaudeModule = () => {
  const strengthsContent = (
    <ul>
      <StrengthItem 
        title="1. Ethics First:"
        description='Guided by "Constitutional AI" principles, Claude ensures thoughtful, safe, and trustworthy interactions, prioritizing ethical AI use.'
      />
      <StrengthItem 
        title="2. Conversational and Intuitive:"
        description="With natural, human-like interactions, Claude feels like a reliable partner for brainstorming, problem-solving, and idea generation."
      />
      <StrengthItem 
        title="3. Versatile and Dependable:"
        description="From drafting emails to generating creative content and tackling everyday challenges, Claude is your go-to AI for reliable, high-quality assistance."
      />
      <StrengthItem 
        title="4. Customizable and Adaptive:"
        description="Claude learns and adapts to your preferences, ensuring tailored responses that meet your unique needs over time."
      />
    </ul>
  );

  const limitationsContent = (
    <>
      <figure className='mb-8 text-blackPearl dark:text-manatee'>
        <Image src="/assets/images/blogs/claude/01.webp" className='rounded-md' alt='claude limitations' width={897} height={415} />
      </figure>
      
      <p className='mb-8 text-blackPearl dark:text-manatee'>{"Claude is undeniably helpful, but for professionals handling sensitive information or requiring advanced tools, its limitations quickly become apparent. Claude's lack of a comprehensive privacy framework may raise concerns for users handling confidential data, such as legal documents, medical records, or proprietary business information. Is it worth compromising security when a more robust solution like Covertly.AI exists?"}</p>
      
      <figure className='mb-8 text-blackPearl dark:text-manatee'>
        <Image src="/assets/images/blogs/claude/02.webp" className='rounded-md' alt='claude issues' width={897} height={415} />
      </figure>

      <ul className='mb-8 text-blackPearl dark:text-manatee'>
        <h3 className='fs-28 mb-8'>1. Privacy Concerns:</h3>
        <li className='text-base font-light text-blackPearl dark:text-manatee mb-4 list-disc ml-4'>{"Claude retains input data to improve its responses, which might not sit well with users managing sensitive or confidential information."}</li>
        <p className='mb-8 text-blackPearl dark:text-manatee'>{"Example: A government official uses Claude to draft a policy document. Since Claude stores user data, the draft could become accessible under U.S. data laws, leading to unintended disclosures of national secrets."}</p>
      </ul>

      <ul className='mb-8 text-blackPearl dark:text-manatee'>
        <h3 className='fs-28 mb-8'>2. Single-Model Dependency:</h3>
        <li className='text-base font-light text-blackPearl dark:text-manatee mb-4 list-disc ml-4'>{"Claude's reliance on a single AI model limits the depth and diversity of its insights."}</li>
        <p className='mb-8 text-blackPearl dark:text-manatee'>{"Example: An engineer troubleshooting a complex design issue might find Claude's perspective helpful, but it's a one-sided view. They miss out on the comprehensive insights multiple AI models could provide."}</p>
      </ul>
      
      <ul className='mb-8 text-blackPearl dark:text-manatee'>
        <h3 className='fs-28 mb-8'>3. Limited Functionality for Professionals:</h3>
        <li className='text-base font-light text-blackPearl dark:text-manatee mb-4 list-disc ml-4'>{"While Claude excels at generating conversational responses, it lacks advanced features tailored to professional needs, such as automatic document redaction or multi-model comparison."}</li>
        <p className='mb-8 text-blackPearl dark:text-manatee'>{"Example: A doctor summarizing sensitive patient data for a report faces the risk of breaching confidentiality because Claude doesn't provide built-in privacy protections."}</p>
      </ul>
    </>
  );

  const covertlySolutionContent = (
    <>
      <h2 className='fs-40 dark:text-white leading-tight mb-8'>{"The Ultimate AI for Professionals: Who Takes the Lead?"}</h2>
      <h6 className='fs-28 mb-4'>{"Introducing Covertly.AI: Redefining Privacy and Performance"}</h6>
      <p className='mb-8 text-blackPearl dark:text-manatee'>{"Meet Covertly.AI—a platform built to bridge the gaps where Claude falls short while elevating its strengths. By combining a privacy-first approach with access to multiple AI models and advanced professional tools, Covertly delivers a solution tailored for high-stakes industries where security, precision, and efficiency are non-negotiable."}</p>
      
      <figure className='mb-8 text-blackPearl dark:text-manatee'>
        <Image src="/assets/images/blogs/chat-gpt/02.png" className='rounded-md' alt='covertly solution' width={897} height={415} />
      </figure>

      <h4 className='fs-28 mb-8'>Why Choose Covertly.AI?</h4>
      <ul className='mb-8 text-blackPearl dark:text-manatee'>
        <li className='fs-18 font-bold dark:text-white mb-8'>1. Uncompromising Privacy:
          <div className='text-base font-light text-blackPearl dark:text-manatee'> {"Covertly guarantees total privacy with stateless interactions—no data is stored or shared. Each session is encrypted and deleted after use, providing peace of mind for professionals handling sensitive information."}</div>
          <p className='mb-8 text-blackPearl dark:text-manatee text-base mt-4'>{"Example: A lawyer drafting a confidential contract can trust Covertly to safeguard sensitive details, ensuring attorney-client privilege remains intact—something Claude simply cannot guarantee."}</p>
        </li>
        
        <li className='fs-18 font-bold dark:text-white mb-8'>2. Diverse Insights with Multiple LLMs:
          <div className='text-base font-light text-blackPearl dark:text-manatee'> {" Rather than relying on a single model, Covertly integrates five leading LLMs—Claude, GPT-4.0, Gemini, LLAMA, and Dolphin. This multi-model approach allows users to compare responses and gain a broader perspective."}</div>
        </li>
        
        <figure className='mb-8 text-blackPearl dark:text-manatee'>
          <Image src="/assets/images/blogs/claude/03.webp" className='rounded-md' alt='multiple models' width={897} height={415} />
        </figure>
        
        <li className='fs-18 font-bold dark:text-white mb-8'>3. Professional-Grade Features:
          <div className='text-base font-light text-blackPearl dark:text-manatee'> {"Covertly goes beyond conversation, offering advanced tools designed for professionals:"}</div>
        </li>
        
        <li className='mb-3 font-bold dark:text-white list-disc ml-4'>{"Auto Redaction:"}
          <div className='text-base font-light text-blackPearl dark:text-manatee'>{"Automatically removes sensitive details from documents."}</div>
        </li>
        
        <li className='mb-3 font-bold dark:text-white list-disc ml-4'>{"Auto Summarization:"}
          <div className='text-base font-light text-blackPearl dark:text-manatee'>{"Condenses lengthy reports into actionable insights."}</div>
        </li>
        
        <li className='mb-3 font-bold dark:text-white list-disc ml-4'>{"Google API Integration:"}
          <div className='text-base font-light text-blackPearl dark:text-manatee'>{"Provides real-time, accurate data."}</div>
        </li>
        
        <p className='mb-8 text-blackPearl dark:text-manatee'>{"Example: An accountant preparing a financial report can save hours of manual work with Covertly's redaction and summarization features, ensuring compliance and efficiency."}</p>
        
        <li className='fs-18 font-bold dark:text-white mb-8'>4. Freedom to Explore:
          <div className='text-base font-light text-blackPearl dark:text-manatee'> {"With Covertly's Uncensored Dolphin Mode, users can push boundaries and tackle complex queries without moderation filters or unnecessary restrictions."}</div>
          <p className='mb-8 text-blackPearl dark:text-manatee text-base mt-4'>{"Example: An engineer seeking unconventional solutions for a technical challenge can explore unfiltered insights, avoiding the limitations imposed by other platforms like Claude."}</p>
        </li>
        
        <li className='fs-18 font-bold dark:text-white mb-8'>5. Affordable Innovation:
          <div className='text-base font-light text-blackPearl dark:text-manatee'> {"At just $29/month, Covertly delivers exceptional value by combining multiple models and professional tools into a single, cost-effective platform."}</div>
          <p className='mb-8 text-blackPearl dark:text-manatee text-base mt-4'>{"Example: A small business owner can replace multiple AI subscriptions with Covertly, streamlining workflows and saving money without sacrificing quality."}</p>
        </li>
      </ul>

      <h6 className='fs-40 font-bold mb-4'>{"Why Professionals Choose Covertly"}</h6>
      <p className='mb-4'>{"While Claude provides an ethical and approachable AI experience, Covertly.AI raises the bar by meeting the demands of professionals who cannot compromise on privacy, versatility, or advanced functionality. More than just solving problems, Covertly enhances workflows, empowers smarter decision-making, and delivers unparalleled peace of mind."}</p>
      <p className='mb-4'>{"For government workers, lawyers, doctors, accountants, engineers, and project managers, the choice is simple:"}</p>
      <h4 className='fs-24 font-bold mb-8 text-center'>{"Why settle for good when you can have the best?"}</h4>
    </>
  );

  return (
    <AIBlogPost
      bannerImage="/assets/images/blogs/claude/claude-01.webp"
      bannerAlt="Claude blog"
      title="Claude: A Polished Conversationalist"
      description="Claude, developed by Anthropic, prides itself on being a responsible and approachable AI. Its design emphasizes ethical considerations, making it a safe and reliable tool for users."
      strengthsContent={strengthsContent}
      limitationsContent={limitationsContent}
      covertlySolutionContent={covertlySolutionContent}
      bottomImage="/assets/images/blogs/claude/claude-02.webp"
      bottomImageAlt="Claude vs Covertly features"
    />
  );
};

export default ClaudeModule;