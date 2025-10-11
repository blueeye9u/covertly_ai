import React from 'react'
import Link from 'next/link'

const PrivacyPolicyModule = () => {
    return (
        <section className='py-20'>
            <div className='container-landingpagetwo'>
                <h2 className='mb-3'>Privacy Policy</h2>
                <h3 className='mb-3'>Information We Collect</h3>
                <p className='dark:text-white mb-4'><span className='block font-bold'>Anonymous Usage</span>Covertly.AI does not collect any personal information, such as names, email addresses, or IP addresses. When you use our Service, the only data transmitted is the question or content you input into the chat. This interaction is masked with a hidden identity, ensuring that no personally identifiable information (PII) is shared with the LLMs or any third party.</p>
                <p className='dark:text-white'><span className='font-bold'>Collection of Data:</span> When a user interacts with our platform, we collect and store the following information:</p>
                    <ul className='dark:text-white list-decimal pl-5'>
                        <li>User Input: The questions, messages, or prompts entered by the user.</li>
                        <li>Usage Statistics: General usage data (e.g., timestamps of interactions) to improve the platform’s performance and monitor service uptime</li>
                        <li>{"Interaction History: A record of the user's interactions with our AI models, including the responses provided. (Held for a maximum of 24 hours then deleted or deleted instantly if selected by the user)"}</li>
                    </ul>
                    <p className='dark:text-white'><span className='font-bold'>Data Storage and Retention:</span>  We store user data in a secure and encrypted environment. User data is deleted automatically:</p>
                    <ul className='dark:text-white list-decimal pl-5'>
                        <li>Daily Deletion: All user data is deleted every 24 hours.</li>
                        <li>{"User Request: At the user's request, all data associated with their interaction is deleted immediately."}</li>
                    </ul>
                    <p className='dark:text-white'>Data Sharing and Disclosure: We do not share any user data, including interaction history, with third-party companies or organizations. The only information we may share is the question being asked, without any identifying information Cookies</p>
                    <p className='dark:text-white mb-5 md:mb-10'>Covertly.AI does not use tracking cookies to monitor your behavior or track your activities across other sites. We may use functional cookies to maintain session information, but these do not contain personal identifiers.</p>
                    <h4 className='mb-3'>How We Use Your Information</h4>
                    <p className='dark:text-white mb-5'>The limited information we collect is used solely to: Facilitate your interaction with the Service. Provide anonymous communication between you and the LLMs. Improve the technical performance of the Service. We collect and process the following types of information</p>
                    <ul className='dark:text-white list-disc mb-6 pl-6'>
                        <li className='mb-2'>Payment and billing information for the purpose of facilitating transactions and providing access to our Services.</li>
                        <li className='mb-2'>Any user-provided avatar or profile images, which are stored on our servers to allow for personalized interaction.</li>
                        <li className='mb-2'>Other information submitted by you through our registration or account setup process, such as your email address or username (if you choose to use one).</li>
                    </ul>
                    <p className='dark:text-white mb-5 md:mb-10'>However, we do not collect, access, or review the content of your interactions with the platform within the chat itself. All data inputted through the chat is processed in real-time and is not stored on our servers once the interaction is complete. This ensures that your communication with our LLMs remains private and secure.</p>
                    <h4 className='mb-3'>Data Deletion Policy</h4>
                    <p className='dark:text-white mb-6'>At Covertly.AI, we prioritize the deletion of user interactions:</p>
                    <ul className='dark:text-white list-disc mb-6 pl-6'>
                        <li>Automatic Deletion: All interactions, including chat logs, user-generated content, metadata (e.g., IP addresses), and cached data, are deleted automatically every 24 hours, ensuring that no historical data is retained.</li>
                        <li>Immediate Deletion Option: Users have the option to delete their interactions immediately after their session is complete. This deletion includes chat logs, user-generated content, and associated metadata.</li>
                    </ul>
                    <p className='dark:text-white'>
                        User account data, such as email addresses, payment information and avatar (if user has decided to add it) will be deleted in accordance with our account deletion policy.
                        We do not store backups of user interactions beyond the chosen deletion period. Any temporary storage of user data is strictly limited to the duration required for the interaction and is deleted as soon as possible.
                    </p>
                    <p className='dark:text-white mb-5 md:mb-10'>No user-generated content, chat logs, or user data are stored or accessible beyond the chosen deletion period, whether it’s 24 hours or immediately upon user request.</p>
                    <h4 className='mb-3'>Sharing of Information</h4>
                    <p className='dark:text-white mb-6'><span className='block font-bold'>No Data Sharing</span> Covertly.AI does not share, sell, or disclose any user data to third parties. The only data transmitted is the question or content you provide, which is relayed anonymously to the LLMs for processing. Covertly.AI ensures that your identity remains completely hidden throughout this process.</p>
                    <p className='dark:text-white mb-5 md:mb-10'><span className='block font-bold'>Compliance with Law</span> We may only disclose information if required by law or to protect the rights and safety of users or the company. However, since we do not collect personal data or track user interactions, there is typically no identifiable information available for disclosure.</p>
                    <h4 className='mb-3'>Data Security</h4>
                    <p className='dark:text-white mb-6'>We implement advanced security measures to ensure that all data interactions with Covertly.AI are protected. Communication between your device and our platform is encrypted, ensuring secure transmission of your questions to the LLMs. Additionally, because we do not store chat data beyond the set deletion timeframe, the risk of unauthorized access is minimized.</p>
                    <h4 className='mb-3'>User Rights</h4>
                    <p className='dark:text-white'>Since Covertly.AI does not collect or retain personal data, users do not need to request access, correction, or deletion of personal information. However, we provide users with</p>
                    <p className='dark:text-white'>the following rights:</p>
                    <ul className='dark:text-white list-disc pl-6'>
                        <li>Immediate Data Deletion: Users can choose to delete their chat interactions immediately after use, instead of waiting for the 24-hour automatic deletion.</li>
                        <li>Anonymity: Users have the right to use our service anonymously without providing any personally identifiable information.</li>
                        <li>Transparency: We provide clear and transparent information about our data practices and policies, giving users a comprehensive understanding of how their data is used, stored, and protected. </li>
                    </ul>
                    <p className='dark:text-white mb-5 md:mb-10'>Accountability: Covertly.AI is accountable for protecting user rights and adhering to our data policies. If users have concerns or questions, they can reach out to our support team for assistance.</p>
                    <h4 className='mb-3'>Children’s Privacy</h4>
                    <p className='dark:text-white mb-5 md:mb-10'>Covertly.AI does not knowingly collect any personal information from users under the age of 16. Users under the age of 16 must have parental or guardian consent to use our service. Since the platform does not require personal data, no information about children is retained.</p>
                    <h4 className='mb-3'>International Data Transfers</h4>
                    <p className='dark:text-white mb-5 md:mb-10'>{"AI operates globally, providing its services to users worldwide. Despite our global presence, we ensure that any data transmitted remains anonymous and secure, regardless of where users are located. In compliance with applicable laws and regulations, we undertake to protect user data, transferred both within and outside of the user's country, consistent with the commitments provided in this Privacy Policy."}</p>
                    <h4 className='mb-3'>Changes to the Privacy Policy</h4>
                    <p className='dark:text-white mb-5 md:mb-10'>We reserve the right to update this Privacy Policy at any time to reflect changes to our practices and/or conform to legal requirements. Users will be notified of significant changes to this Privacy Policy through our platform. What constitutes a significant change to this Privacy Policy will be determined by us, and may include changes to data collection practices, data retention periods, or access to user data. Your continued use of the Service after any changes to this Privacy Policy will constitute acceptance of those changes.</p>
                    <h4 className='mb-3'>Contact Information</h4>
                    <p className='dark:text-white mb-5 md:mb-10'>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:
                        <div className='block'>Email: <Link className='text-primary-100 underline' href="mailto:contact@covertly.ai">contact@covertly.ai</Link></div>
                    </p>
        </div>
    </section>
    ) 
}

export default PrivacyPolicyModule