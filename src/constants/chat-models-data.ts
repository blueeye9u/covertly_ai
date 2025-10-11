import { EModels, EChatTypes } from "../enums/modals.enum";
import { EChatType } from '../enums/gpt-models.enum';

export const ChatGPTDisplay = {
    name: "ChatGPT",
    key: EModels.GPT_4,
    img: "/assets/images/chat/chatgpt.jpeg",
    des: "Welcome to GPT-4o! The next-generation AI, offering deeper understanding and even more refined responses. Whether you're tackling complex questions, seeking creative insights, or solving detailed problems, GPT-4o brings enhanced capabilities to assist you with precision and depth across a wide array of topics.",
    supports: ["Image", "Audio", "PDF"],
};

export const ChatGPT_3_5 = {
    name: "GPT-3.5",
    key: EModels.GPT_3,
    img: "/assets/images/chat/chatgpt.jpeg",
    des: "Welcome to GPT-3.5! Your reliable AI companion, ready to deliver fast and accurate responses across various subjects. Whether you're brainstorming ideas, looking for clear explanations, or need help with everyday tasks, GPT-3.5 is designed to provide helpful and engaging solutions tailored to your needs.",
    supports: ["Audio", "PDF"],
};

export const ChatGPT_4o = {
    name: "GPT-4o",
    key: EModels.GPT_4,
    img: "/assets/images/chat/chatgpt.jpeg",
    des: "Welcome to GPT-4o! The next-generation AI, offering deeper understanding and even more refined responses. Whether you're tackling complex questions, seeking creative insights, or solving detailed problems, GPT-4o brings enhanced capabilities to assist you with precision and depth across a wide array of topics.",
    supports: ["Image", "Audio", "PDF"],
};

export const Claude = {
    name: "Claude",
    key: EModels.CLAUDE,
    img: "/assets/images/chat/claude.jpeg",
    des: "Welcome to Claude 3.5 Sonnet, your intelligent and conversational AI designed for clarity, precision, and depth. Whether you need assistance with complex problem-solving, creative brainstorming, or detailed explanations, Claude 3.5 excels at delivering thoughtful, context-aware responses.",
    supports: ["Image", "Audio", "PDF"],
};

export const Gemini = {
    name: "Gemini",
    key: EModels.GEMINI,
    img: "/assets/images/chat/gemini.jpeg",
    des: "Welcome to Gemini 1.5, your advanced AI assistant built to excel in multitasking and deep comprehension. Whether you're navigating complex data, generating creative content, or engaging in in-depth research, Gemini's state-of-the-art capabilities offer unparalleled efficiency and precision. With a focus on adaptability and nuanced understanding, Gemini is here to elevate your problem-solving and decision-making processes across a broad range of topics.",
    supports: ["Image", "Audio", "PDF"],
};

export const LLAMA = {
    name: "LLAMA",
    key: EModels.LLAMA,
    img: "/assets/images/chat/Llama.jpeg",
    des: "Welcome to LLAMA 3.2, your cutting-edge AI designed for fast, efficient, and contextually rich interactions. LLAMA excels at delivering concise yet detailed responses, whether you're tackling technical challenges, exploring creative ideas, or analyzing data. With a strong emphasis on accuracy and performance, LLAMA is your go-to assistant for solving complex problems and providing insightful information across diverse fields.",
    supports: ["Audio", "PDF"],
};

export const Dolphin = {
    name: "Dolphin",
    key: EModels.DOLPHIN,
    img: "/assets/images/chat/dolphin.png",
    des: "Welcome to Dolphin 2.5 Mixtral 8x7B, your ultimate AI companion engineered for next-level conversation and problem-solving. Built on the powerful Mixtral-8x7B model, Dolphin excels in delivering uncensored, unbiased, and deeply intelligent interactions. With advanced features like 4-bit quantization, Flash Attention 2, and enhanced coding abilities, this AI is designed to handle everything from technical challenges to open-ended dialogue. Whether you need insights, creative brainstorming, or coding support, Dolphin 2.5 Mixtral 8x7B is here to push the boundaries of what AI can do for you.",
    supports: [],
};

export const PDF = {
    name: "PDF",
    key: EChatTypes.PDF_CHAT,
    img: "/assets/images/pdf.svg",
    des: "Welcome to PDF 1.0, your personal document assistant tailored for legal research and writing. Whether you're drafting contracts, analyzing case law, or exploring legal concepts, PDF offers expert guidance and support to enhance your workflow. With specialized features for legal professionals, PDF ensures accurate and efficient document creation, review, and analysis. In addition to its core capabilities, PDF also provides LLM suggestions based on your queries, making it easier to access relevant and insightful information.",
    supports: [],
};

export const Smart = {
    name: "Smart",
    key: EChatTypes.SMART_LLM,
    img: "/assets/images/chat/llm.svg",
    des: "Welcome to Smart 1.0, your intelligent AI assistant tailored for advanced language understanding and generation. Whether you're delving into complex legal concepts, drafting detailed documents, or analyzing intricate case law, Smart delivers unparalleled expertise and precision in legal research and writing. In addition to its core capabilities, Smart also provides LLM suggestions based on your queries, ensuring you receive even more relevant and insightful responses.",
    supports: [],
};

export const Elijah = {
    name: "Elijah",
    key: EModels.ELIJAH,
    img: "/assets/images/chat/elijah.svg",
    des: 'Welcome to Elijah! Elijah is a multi-LLM orchestrator, integrating GPT, Gemini, LLAMA, DeepSeek, Grok and Claude. It enables tailored model selection and generates a unified "Super Response" for comprehensive and accurate answers.',
    supports: [],
};

export const DeepSeek = {
    name: "DeepSeek",
    key: EModels.DEEPSEEK,
    img: "/assets/images/chat/deepseek.svg",
    des: "Welcome to DeepSeek-R1! Your cutting-edge AI assistant designed for deep reasoning and complex problem-solving. With advanced capabilities in code understanding, mathematical reasoning, and multilingual support, DeepSeek excels at tackling challenging tasks across various domains.",
    supports: ["Image","Audio", "PDF"],
};

export const Grok = {
    name: "Grok",
    key: EModels.GROK,
    img: "/assets/images/chat/grok.svg",
    imgDark: "/assets/images/chat/grok_dark_mode.svg",
    des: "Welcome to Grok! Your witty and rebellious AI companion from xAI. With real-time access to X (Twitter) and a bold, humorous personality, Grok delivers insightful responses with a unique perspective on current events and complex topics.",
    supports: ["Image","Audio", "PDF"],
};

export const DeepResearchAgent = {
    name: "Deep Research Agent",
    key: EChatType.DEEP_RESEARCH,
    img: "/assets/images/chat/deep-search-icon.svg",
    des: "Advanced AI research assistant for comprehensive web searches and analysis",
    supports: [],
};

export const Chat_Types = [PDF, Smart];

export const Chat_Models = [ChatGPT_3_5, ChatGPT_4o, Claude, Gemini, LLAMA, Dolphin, DeepSeek, Grok, Elijah];

// Display order for the welcome screen model chips (two rows):
// Row 1: ChatGPT, Claude, Gemini, LLAMA, DeepSeek, Grok
// Row 2: Smart, Elijah, Dolphin
export const Chat_Models_Display_data = [
    ChatGPTDisplay,
    Claude,
    Gemini,
    LLAMA,
    DeepSeek,
    Grok,
    Smart,
    Elijah,
    Dolphin,
];

export const Chat_Model_data = [ChatGPT_3_5, ChatGPT_4o, Claude, Gemini, LLAMA, Dolphin, DeepSeek, Grok, Smart, PDF, Elijah];

export const Elijah_Model_Selection_Data = [ChatGPT_4o, Claude, Gemini, LLAMA, DeepSeek, Grok];

