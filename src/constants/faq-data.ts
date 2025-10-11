// Helper function to create FAQ items
const createFaq = (id: string, question: string, answer: string, isOpen = false) => ({
    id,
    isOpen,
    question,
    answer
});

export const FaqData = [
    createFaq("1", "What is Covertly?", "Covertly is an AI platform designed to enable anonymous and secure interactions with leading large language models (LLMs) worldwide."),
    createFaq("2", "How does the AI chatbot ensure my anonymity?", "Covertly ensures your anonymity by only saving your tokens and email. All interactions are conducted using a randomly assigned 12-digit number, which serves as your username. This ensures that none of your conversations can be traced back to you. Interactions with LLM models occur through our general service account, and all data is deleted after use, leaving no trace of your identity."),
    createFaq("3", "What measures are in place for data security?", "It is a vertically stacked list of headers that, when clicked, reveals or hides the content associated within them. Instead of overwhelming consumers with longform content, accordions are employed in designs to deliver content to users in a more progressive manner."),
    createFaq("4", "How does the service connect to popular LLMs like GPT and Claude?", "Covertly connects to leading LLMs, such as GPT and Claude, via APIs. This integration allows you to access powerful AI capabilities while maintaining anonymity and ensuring data is not stored."),
    createFaq("5", "What are the benefits of using this AI chatbot service?", "Covertly offers several benefits including complete anonymity, robust security, data deletion, unmoderated usage, PDF reading capabilities, and integration with Google's API for web searches."),
    createFaq("6", "Can I use the chatbot for any type of query?", "Yes, Covertly supports any type of text query, providing you with versatile and extensive AI-powered solutions."),
    createFaq("7", "Is there a limit to how often I can use the service?", "There is no limit to how often you can use the service. Visit our pricing page for details on different plans available."),
    createFaq("8", "What kind of support is available if I encounter issues?", "We offer live support through a chat widget located at the bottom right side of the screen. Our support team is ready to assist you with any issues you may encounter."),
    createFaq("9", "How do I know my interactions are secure?", "Your interactions are secure as they are encrypted and managed by cybersecurity experts. Furthermore, all data is deleted post-interaction, ensuring no information is retained."),
    createFaq("10", "Are there any costs associated with using the chatbot?", "Yes, there are costs associated with using Covertly due to the API charges from popular LLM providers. These costs help cover our platform's operational expenses."),
    createFaq("11", "How does your service stay up-to-date with the latest AI developments?", "Covertly maintains its cutting-edge capabilities by connecting to the latest LLMs from major providers like GPT, LLAMA, CLAUDE, and GEMINI, ensuring that you have access to the most advanced AI technology."),
    createFaq("12", "Where do I add my feedback?", "You can add your feedback on the right side of the screen using the blue feedback tab. We appreciate your input as it helps us improve our service.")
];

export const GeneralFaqData = [
    createFaq("1", "What is Covertly?", "Covertly is an AI platform designed for anonymous and secure interactions with leading large language models (LLMs)."),
    createFaq("2", "What are the benefits of using this AI chatbot service?", "Covertly offers complete anonymity, strong security, data deletion, unmoderated usage, PDF reading capabilities, image generation, and integration with Google for real-time web searches."),
    createFaq("3", "Can I use the chatbot for any type of query?", "Yes. While some of the LLMs we connect to have internal restrictions and limitations, you can ask Covertly any type of text-based question and receive AI-powered responses from those LLMs that are able to provide them."),
    createFaq("4", "How does the service connect to popular LLMs like GPT and Claude?", "Covertly anonymizes and encrypts your data before connecting to external LLMs like GPT and Claude through APIs, enabling secure and private access to advanced AI models without storing your data and ensuring whatever the external LLMs store cannot be tracked or identified."),
    createFaq("5", "How does Covertly ensure my anonymity?", "Covertly uses end-to-end encryption, zero data tracking, and secure authentication to ensure nothing is stored or linked to your activity. Only your tokens are mapped to your secret key or email so we can know how to credit your account. All other activity remains completely anonymous keeping your identity protected with any login option."),
    createFaq("6", "Are there usage rate limits? ", "There are no usage rate limits. You can use your monthly subscription tokens as quickly or as slowly as you need.\n" +
        "For Unlimited accounts, we provide surge protection to prevent costly accidental overuse.\n" +
        "For more details, visit our Pricing Page.\n"),
    createFaq("7", "How does your service stay up-to-date with the latest AI developments?", "Covertly stays current by continuously evaluating the technology landscape and integrating new LLMs and the latest releases of existing LLMs once they are deemed safe and stable, giving you access to top-tier AI technology without compromising our mission."),
    createFaq("8", "What kind of support is available if I encounter issues?", "Our support team is available 24/7 through the live chat. Users can navigate to the bottom of the support / FAQ page and begin chatting with our team there. "),
    createFaq("9", "Where do I add my feedback?", "You can send us an email with your thoughts anytime. We love to hear what you like and where we can improve.")
];

export const FaqFeaturesTabs = [
    { name: "Anonymity & Security", current: true },
    { name: "Real-Time Answers", current: false },
    { name: "Elijah", current: false }
];

export const FaqFeaturesData = [
    [
        createFaq("1", "How does Covertly protect my anonymity?", "When you use Covertly, you're assigned a random 12-digit username so your identity is never tied to your conversations. We cannot access your chat history, and your conversations are never linked to your account. All messages are routed through a shared service account to prevent any trace back to you.\n" +
            "The only things we store are your tokens and email or secret key for account access — nothing else. Your conversations are automatically deleted shortly after they happen, based on your own deletion preferences, so nothing lingers on our servers.\n" +
            "In short: your chats aren't recorded, they aren't connected to you, and they disappear.\n"),
        createFaq("2", "What is a Secret Key Login and how does it work?", "A Secret Key Login lets you access Covertly without using personal identifiers such as an email. It is never stored in plain form on our servers, we only keep a double-hashed version. This makes it secure but also mathematically impossible to recover if lost. If you chose to use it, store it safely as it is your only way to log.\n" +
            "\n" +
            "When you pay with Stripe, you are assigned a random email address for billing purposes, ensuring your identity remains private. No one, not even Covertly, can identify you in any way. We also do not store IP addresses or any information related to your usage."),
        createFaq("3", "What happens if I use Microsoft, Google, Apple, or Facebook to log in?", "We ensure your privacy by blocking all data transmitted by Google, accepting only your email for authentication purposes. This email is securely converted into a 12-digit unique ID, used solely to track your token count. We do not store, monitor or have access to any details about your activity, plus all data is deleted."),
        createFaq("4", "Does Covertly store or track my conversations?", "No. Covertly never stores, tracks, or logs your conversations. All messages are encrypted and can be deleted instantly from your dashboard at any time. If you don't delete them manually, they will be removed automatically after 24 hours—or sooner if you've set a custom time in your preferences."),
        createFaq("5", "Can I delete my account?", "Yes. However, Covertly automatically deletes all usage data making your account effectively blank after a time period of your choosing."),
        createFaq("6", "How does Covertly ensure my queries remain anonymous?", "Covertly is designed from the ground up to protect your privacy. Every query you make passes through our secure proxy, which automatically strips away all identifying metadata before it ever reaches any external large language model (LLM) provider.\n" +
            "Messages are encrypted in transit and can be manually deleted from your dashboard at any time, instantly. Otherwise, they're automatically deleted after a period of your choosing, or 24 hours by default. Covertly does not store, track, or log your conversations.\n" +
            "Because we act only as an anonymous proxy, external LLMs never see your account information, IP address, or other personally identifiable data. This ensures that your interactions remain completely untracable to your identity. \n")
    ],
    [
        createFaq("1", "Do large language models (LLMs) use up to date sources within their responses? ", "No, the “brain” of an LLM is trained on data available only up to a specific point in time, so it cannot natively access current information.\n" +
            "Some products built on top of LLMs, like ChatGPT with live search tools, can retrieve and incorporate up-to-date content. However, this real-time capability comes from the connected search feature, not from the LLM's core training data. \n"),
        createFaq("2", "How does Covertly provide current sources? ", "Covertly connects to a real-time web indexing system, which continually crawls Google for the latest online content. Responses are based on live data, not static training sets."),
        createFaq("3", "How does Covertly compare to ChatGPT in its search integration?", "ChatGPT uses Bing due to its Microsoft integration while Covertly uses Google, offering results from a platform many users are more familiar with."),
        createFaq("4", "Are the answers with current sources always accurate?", "LLMs can sometimes produce errors or hallucinations even when referencing external information. If an answer seems off, we suggest reviewing the sources or rephrasing your question.")
    ],
    [
        createFaq("1", "What is Elijah?", "Elijah is Covertly's in-house AI hub that allows users to query multiple LLMs at the same time. Responses can then be compared side by side and integrated into a Super Response "),
        createFaq("2", "How does the Super Response feature work?", "The Super Response feature sends your question to multiple LLMs simultaneously, gathering diverse perspectives and strengths from each model. All these responses are then passed back through GPT, which analyzes, compares, and merges them into a single amalgamated “master” answer.\n" +
            "This ensures you get a more accurate, well-rounded, and balanced response than relying on any one LLM alone, combining the best elements from each model into one optimized reply."),
        createFaq("3", "Can I choose which LLMs to query?", "Yes. You can choose to query two or more available LLMs based on your needs."),
        createFaq("4", "Is Elijah different from other LLMs available in Covertly?", "Yes. Elijah is Covertly's proprietary, in-house LLM hub designed to enhance your workflow efficiency by letting you compare multiple answers and generate super responses.")
    ],
    [
        createFaq("1", "How does the auto redaction system ensure data security?", "The system operates fully offline, so no data is stored or sent over the internet during redaction. This guarantees complete security and compliance."),
        createFaq("2", "What types of information can the system redact?", "The AI can detect and redact PII, PHI, financial data, legal information, and other sensitive content across a wide range of file types."),
        createFaq("3", "Can I review redacted information before finalizing?", "Yes. You can review, edit, and approve all redactions before saving or sharing the final document."),
        createFaq("4", "What file formats does the redaction tool support?", "The tool supports PDFs at the moment but soon you'll be able to redact Word documents, images, scanned files, emails, and more for maximum flexibility across all industries."),
        createFaq("5", "Is this solution easy to use, or does it require technical expertise?", "The redaction tool is user-friendly and requires no technical knowledge. It features an intuitive interface with automated detection and manual override options for full control.")
    ]
];
