import React from 'react';
import Image from 'next/image';
import AIBlogPost, { StrengthItem } from '../../components/AIBlogPost';

const ChatgptModule = () => {
  const strengthsContent = (
    <ul>
      <StrengthItem 
        title="1. Simple and User-Friendly"
        description="Its clean interface makes it accessible for everyone, from beginners to experts."
      />
      <StrengthItem 
        title="2. Versatile Knowledge"
        description="Trained on vast datasets, ChatGPT can answer nearly anything—from general trivia to complex coding queries."
      />
      <StrengthItem 
        title="3. Affordable Power"
        description="At $20/month, it's budget-friendly for individual users and small businesses."
      />
      <StrengthItem 
        title="4. Customizable"
        description="It adapts to your preferences for a more tailored experience."
      />
    </ul>
  );

  const limitationsContent = (
    <>
      <h5 className='fs-24'>But while ChatGPT excels at being a jack-of-all-trades, its hidden flaws can become major pain points for professionals handling sensitive or critical data.</h5>

      <figure className='mb-8 text-blackPearl dark:text-manatee mt-8'>
        <Image src="/assets/images/blogs/chat-gpt/01.webp" className='rounded-md' alt='gemini' width={897} height={415} />
      </figure>
      
      <ul>
        <h2 className='fs-40 dark:text-white leading-tight mb-8'>The Hidden Risks of ChatGPT</h2>
        <ul>
          <h3 className='fs-28 mb-8'>1. Lack of Privacy</h3>

          <li className='fs-18 font-bold dark:text-white mb-8 list-disc ml-4'>A Government Worker&apos;s Nightmare:
            <div className='text-base font-light text-blackPearl dark:text-manatee'> {"Imagine a government employee drafting policy-related documents using ChatGPT. The platform stores and processes input data, potentially making it accessible to its U.S.-based developers."}</div>
          </li>
          <li className='fs-18 font-bold dark:text-white mb-8 list-disc ml-4'>The Risk:
            <div className='text-base font-light text-blackPearl dark:text-manatee'> {"Sensitive national policies could inadvertently end up in foreign hands due to data collection laws."}</div>
          </li>
          <li className='fs-18 font-bold dark:text-white mb-8 list-disc ml-4'>The Pain:
            <div className='text-base font-light text-blackPearl dark:text-manatee'> {"This isn't just a privacy issue; it's a sovereignty and security breach waiting to happen."}</div>
          </li>
        </ul>
      </ul>

      <ul>
        <h2 className='fs-28 dark:text-white leading-tight mb-3'>2. Compromising Client Confidentiality for Lawyers</h2>
        <p className='mb-8 text-blackPearl dark:text-manatee'>A lawyer relies on ChatGPT to summarize legal cases or draft contracts. While convenient, the platform retains input data, breaching attorney-client privilege.</p>
        <ul>
          <li className='fs-18 font-bold dark:text-white mb-8 list-disc ml-4'>The Risk:
            <div className='text-base font-light text-blackPearl dark:text-manatee'> {"Details about high-stakes mergers or sensitive lawsuits could be exposed."}</div>
          </li>
          <li className='fs-18 font-bold dark:text-white mb-8 list-disc ml-4'>The Pain:
            <div className='text-base font-light text-blackPearl dark:text-manatee'> {"One leaked case detail could lead to lawsuits or reputational damage."}</div>
          </li>
        </ul>
      </ul>

      <ul>
        <h2 className='fs-28 dark:text-white leading-tight mb-3'>3. Patient Data Leaks in Healthcare</h2>
        <p className='mb-8 text-blackPearl dark:text-manatee'>Doctors often juggle massive amounts of patient information. Using ChatGPT to summarize case notes might seem like a timesaver, but what if that information is stored and accessed by others?</p>
        <ul>
          <li className='fs-18 font-bold dark:text-white mb-8 list-disc ml-4'>The Risk:
            <div className='text-base font-light text-blackPearl dark:text-manatee'> {"Violating strict privacy laws like HIPAA or PHIPA."}</div>
          </li>
          <li className='fs-18 font-bold dark:text-white mb-8 list-disc ml-4'>The Pain:
            <div className='text-base font-light text-blackPearl dark:text-manatee'> {"The trust between patients and healthcare providers is shattered, not to mention legal repercussions."}</div>
          </li>
        </ul>
      </ul>
    </>
  );

  const covertlySolutionContent = (
    <>
      <h2 className='mb-3 fs-40'>So what is the solution?</h2>
      <h6 className='fs-28 mb-4'>Enter Covertly.AI: The Privacy-First AI Platform</h6>
      <p className='mb-8 text-blackPearl dark:text-manatee'>Covertly.AI is designed for professionals seeking the power of AI without sacrificing privacy, efficiency, or control. Discover how it transforms challenges into opportunities for seamless and secure workflows.</p>
      
      <figure className='mb-8 text-blackPearl dark:text-manatee'>
        <Image src="/assets/images/blogs/chat-gpt/02.webp" className='rounded-md' alt='gemini' width={897} height={415} />
      </figure>
      
      <h6 className='fs-24 mb-4'>How Covertly Solves the Problems:</h6>
      
      <ul className='mb-8 text-blackPearl dark:text-manatee'>
        <li className='fs-18 font-bold dark:text-white mb-8'>1. Stateless Interactions for Total Anonymity
          <div className='text-base font-light text-blackPearl dark:text-manatee mt-1 block'> {"Covertly doesn't store your data. Conversations are encrypted and deleted after your session ends. For the government worker drafting sensitive policies, this means absolute peace of mind."}</div>
          <div className='text-sm font-light text-blackPearl dark:text-manatee mt-1 block'> {"Example: Instead of worrying about sensitive national data being stored, a policy advisor can confidently refine drafts, knowing nothing is saved or shared."}</div>
        </li>
        
        <figure className='mb-8 text-blackPearl dark:text-manatee'>
          <Image src="/assets/images/blogs/chat-gpt/chat-gpt-02.webp" className='rounded-md' alt='gemini' width={897} height={415} />
        </figure>
        
        <li className='fs-18 font-bold dark:text-white mb-8'>2. Multi-LLM Access for Smarter Insights
          <div className='text-base font-light text-blackPearl dark:text-manatee mt-1 block'> {"Why choose one AI model when you can have five? Covertly combines GPT-4.0, Claude, Gemini, LLAMA, and even an uncensored Dolphin model."}</div>
          <div className='text-sm font-light text-blackPearl dark:text-manatee mt-1 block'> {"Example: A lawyer comparing legal precedents gets nuanced perspectives from multiple models in one session, all without risking client confidentiality."}</div>
        </li>

        <li className='fs-18 font-bold dark:text-white mb-8'>3. Document Handling with Built-In Privacy
          <div className='text-base font-light text-blackPearl dark:text-manatee mt-1 block'> {"Covertly's auto-redaction feature ensures that sensitive details in uploaded documents are hidden before processing."}</div>
        </li>

        <figure className='mb-8 text-blackPearl dark:text-manatee'>
          <Image src="/assets/images/blogs/chat-gpt/chat-gpt-03.webp" className='rounded-md' alt='gemini' width={897} height={415} />
        </figure>

        <li className='fs-18 font-bold dark:text-white mb-8'>4. Flexibility and Uncensored Access
          <div className='text-base font-light text-blackPearl dark:text-manatee mt-1 block'> {"Covertly's Uncensored Dolphin mode allows unrestricted exploration without filters or moderation."}</div>
          <div className='text-base font-light text-blackPearl dark:text-manatee mt-1 block'>{"Example: Engineers troubleshooting a complex design flaw can ask tough, unfiltered questions, unlocking more creative solutions than a moderated AI could offer."}</div>
        </li>

        <li className='fs-18 font-bold dark:text-white mb-4'>5. Professional Features Built-In
          <div className='text-base font-light text-blackPearl dark:text-manatee mt-1 block'> {"Covertly isn't just about privacy—it's designed for professionals:"}</div>
        </li>

        <li className='dark:text-white mb-2 list-disc ml-4'>Google API Integration: Perfect for real-time research.</li>
        <li className='dark:text-white mb-2 list-disc ml-4'>Self-Deleting Chats: Ideal for accountants handling confidential financial data.</li>
        <li className='dark:text-white mb-2 list-disc ml-4'>Affordable Access: At $29/month for all 5 LLMs, it&apos;s a steal compared to managing subscriptions for multiple AI models.</li>
      </ul>

      <ul>
        <h2 className='fs-40 dark:text-white leading-tight mb-8'>Why Professionals Choose Covertly?</h2>
        <p className='text-mantee mb-8'>{"Covertly isn't just an AI platform—it's your trusted ally in protecting data and enhancing workflows. More than solving problems, it empowers professionals to think smarter, move faster, and work more securely. Whether you're a government worker, lawyer, doctor, engineer, accountant, or project manager, Covertly.AI redefines how you achieve success. The choice is simple: "}</p>
      </ul>

      <h6 className='fs-24 font-bold mb-8'>{"Stay secure. Stay efficient. Switch to Covertly.AI."}</h6>

      <h6 className='fs-28 font-bold mb-4 text-center'>Covertly Features Overview</h6>
    </>
  );

  return (
    <AIBlogPost
      bannerImage="/assets/images/blogs/chat-gpt/chat-gpt-01.webp"
      bannerAlt="ChatGPT blog"
      title="ChatGPT: The Good, the Bad, and the Covertly Solution"
      description="When it comes to AI, ChatGPT has earned its place in the spotlight. It's powerful, easy to use, and versatile, making it a favorite for millions around the world. Whether you're drafting an email, brainstorming ideas, or solving a tricky problem, ChatGPT can handle it with ease."
      strengthsContent={strengthsContent}
      limitationsContent={limitationsContent}
      covertlySolutionContent={covertlySolutionContent}
      bottomImage="/assets/images/blogs/chat-gpt/chat-gpt-04.webp"
      bottomImageAlt="ChatGPT vs Covertly features"
    />
  );
};

export default ChatgptModule;