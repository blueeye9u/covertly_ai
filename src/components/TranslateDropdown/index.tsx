import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Button } from "../global/button/Button";
import { promptEnhancerService } from "../../services/prompt-enhancer.service";
import { toast } from "react-hot-toast";
import { useConversation } from "../../context/conversation.context";
const languages = [
  "English",
  "Arabic",
  "Bengali",
  "Chinese",
  "Dutch",
  "French",
  "German",
  "Hebrew",
  "Hindi",
  "Italian",
  "Japanese",
  "Korean",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Swedish",
  "Thai",
  "Turkish",
  "Urdu",
  "Vietnamese"
];
const DEFAULT_LANG = languages[0];
interface TranslateComponentProps {
  readonly userInput: string;
  readonly setUserInput: (value: string) => void;
  readonly isAnyLoading: boolean;
  readonly setTranslating?: (value: boolean) => void;
}
interface TranslateMenuItemProps {
  lang: string;
  isSelected: boolean;
  isDefault: boolean;
  onSelect: (lang: string, e: React.MouseEvent) => void;
}
function TranslateMenuItem({ lang, isSelected, isDefault, onSelect }: Readonly<TranslateMenuItemProps>) {
  return <Menu.Item key={lang}>
    {({ active }) => (
     <button
     onClick={(e) => onSelect(lang, e)}
     className={`flex w-full cursor-pointer justify-between px-6 py-1.5 text-left text-sm ${
       isSelected ? "text-[#30C5D2]" : "text-whiteSmoke"
     } ${active ? "bg-gray-700" : ""}`}
   >
        {lang}{" "}
        {isDefault && (
          <span className="text-xs text-[#707174]">
            Default
          </span>
        )}
      </button>
    )}
  </Menu.Item>
}
export default function TranslateComponent({
  userInput,
  setUserInput,
  isAnyLoading,
  setTranslating,
}: TranslateComponentProps) {
  const { currentChat } = useConversation();
  const [selectedLang, setSelectedLang] = useState(DEFAULT_LANG);

  // Save selected language to localStorage per chat
  const saveLanguageForChat = (chatId: string, language: string) => {
    if (globalThis.window !== undefined) {
      const storageKey = `translate_lang_${chatId}`;
      localStorage.setItem(storageKey, language);
    }
  };

  // Get saved language for current chat
  const getSavedLanguageForChat = (chatId: string): string => {
    if (globalThis.window !== undefined) {
      const storageKey = `translate_lang_${chatId}`;
      return localStorage.getItem(storageKey) || DEFAULT_LANG;
    }
    return DEFAULT_LANG;
  };

  // Load saved language when chat changes
  useEffect(() => {
    const chatId = currentChat?._id ?? 'new';
    const savedLang = getSavedLanguageForChat(chatId);
    setSelectedLang(savedLang);
  }, [currentChat?._id]);

  const handleTranslate = async () => {
    try {
      if (!userInput.trim()) {
        toast.error("Please enter some text to improve");
        return;
      }
      setTranslating?.(true);
      const res = await promptEnhancerService.translatePrompt({
        text: userInput,
        targetLanguage: selectedLang,
      });
      if (res?.payload?.translatedText !== undefined) {
        setUserInput(res.payload.translatedText);
        toast.success(`Text translated to ${selectedLang}`);
        
        setSelectedLang(DEFAULT_LANG);
        const chatId = currentChat?._id ?? 'new';
        saveLanguageForChat(chatId, DEFAULT_LANG);
      } else if (selectedLang === 'English') {
        setUserInput(userInput);
        toast.success(`Text set to English`);
      } else {
        toast.error("Failed to translate prompt");
      }
    } catch (error) {
      console.error("Error improving prompt:", error);
      toast.error("Failed to improve prompt. Please try again.");
    } finally {
      setTranslating?.(false);
    }
  };
  const handleLangChange = (lang: string, e: React.FormEvent) => {
    e.preventDefault();
    setSelectedLang(lang);

    const chatId = currentChat?._id ?? 'new';
    saveLanguageForChat(chatId, lang);
  };

  return (
    <div className="">
      <Menu as="div" className="relative">
        {({ open, close }) => (
          <>
            <Menu.Button
              disabled={!userInput.trim() || isAnyLoading}
              className={`flex items-center justify-center gap-2 ${
                !userInput.trim() || isAnyLoading
                  ? "cursor-not-allowed disabled:opacity-25"
                  : "cursor-pointer"
              } bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-full p-2 sm:rounded-md sm:px-4 sm:py-2 transition-colors dark:text-white text-black text-sm duration-300`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33301 4.16667H9.55615C9.7965 4.16667 9.98771 4.3697 9.95681 4.60804C9.65611 6.92742 8.02031 10.8333 3.33301 10.8333M4.99967 6.66667C5.55523 7.83333 7.33301 10.4667 9.99967 11.6667M6.66634 4.16667V2.5M10.9997 15L9.99967 17.5M10.9997 15H15.6663M10.9997 15L12.9461 10.1338C13.0858 9.7846 13.5802 9.7846 13.7199 10.1338L15.6663 15M16.6663 17.5L15.6663 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="hidden lg:inline">Translate</span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="bg-gray-800 absolute bottom-12 z-10 w-[300px] rounded-md bg-[#1E2129] py-2 text-sm shadow-2xl">
                <div className="flex items-start justify-between border-b border-[#282A2F] p-2">
                  <div>
                    <h2 className="text-gray-400 text-base leading-tight p-1">Translation options</h2>
                    <p className="text-gray-500 mb-1.5 text-sm pl-1">Choose language for your text</p>
                  </div>
                  <button
                    onClick={close}
                    className="text-gray-400 hover:text-white transition-colors mt-1"
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="max-h-56 overflow-y-auto themeScrollbar mr-1">
                  {languages.map((lang) => (
                    <TranslateMenuItem
                      key={lang}
                      lang={lang}
                      isSelected={selectedLang === lang}
                      isDefault={lang === DEFAULT_LANG}
                      onSelect={handleLangChange}
                    />
                  ))}
                </div>
                <div
                  className={`px-6 pt-3 ${userInput ? "" : "text-gray-400"}`}
                >
                  {" "}
                  <Button className="w-full" onClick={handleTranslate}>
                    Translate
                  </Button>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}