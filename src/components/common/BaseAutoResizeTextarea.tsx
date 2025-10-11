import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  TextareaHTMLAttributes,
  useCallback,
  ReactNode,
  forwardRef,
  useImperativeHandle
} from "react";
import { useRouter } from "next/router";

export interface BaseAutoResizeTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: string;
  maxHeight?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  spaceAdd?: boolean;
  maxLength?: number;
  className?: string;
  children?: ReactNode;
  wrapperClassName?: string;
  showWebSearchMention?: boolean;
  isAnyLoading?: boolean;
}

export interface TextareaRefHandle {
  focus: () => void;
  getTextarea: () => HTMLTextAreaElement | null;
}

/**
 * Base component for auto-resizing textareas
 */
const BaseAutoResizeTextarea = forwardRef<TextareaRefHandle, BaseAutoResizeTextareaProps>(
  (
    {
      minHeight = "30px",
      maxHeight = "300px",
      className = "",
      value,
      onChange,
      placeholder = "Ask me anything...",
      onKeyDown,
      disabled,
      spaceAdd,
      maxLength,
      children,
      wrapperClassName = "relative w-full",
      showWebSearchMention = true,
      isAnyLoading,
      ...restProps
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showMentionPopup, setShowMentionPopup] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
    const router = useRouter();

    // Expose the textarea ref methods to parent components
    useImperativeHandle(ref, () => ({
      focus: () => {
        textareaRef.current?.focus();
      },
      getTextarea: () => textareaRef.current
    }));

    // Adjust textarea height based on content
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "28px";
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current.scrollHeight,
          Number.parseInt(maxHeight)
        )}px`;
      }
    }, [value, maxHeight]);

    // Preserve @google_search when textarea is cleared
    useEffect(() => {
      if (value === '') {
        const preservedValue = preserveWebSearch(textareaRef.current?.value ?? '');
        if (preservedValue) {
          const newEvent = {
            target: {
              value: preservedValue
            }
          } as ChangeEvent<HTMLTextAreaElement>;
          onChange(newEvent);
        }
      }
    }, [value, onChange]);

    // Remove @google_search when navigating to a chat
    useEffect(() => {
      const asPath = router.asPath;
      const queryParams = new URLSearchParams(asPath.split('?')[1]);
      const id = queryParams.get('id');
      if (id) {
        const newValue = value.replaceAll(/@google_search\s*/g, '');
        const newEvent = {
          target: {
            value: newValue
          }
        } as ChangeEvent<HTMLTextAreaElement>;
        onChange(newEvent);
      }
    }, [router, value, onChange]);

    // Extract @google_search text from input
    const preserveWebSearch = useCallback((newValue: string) => {
      const webSearchRegex = /@google_search\s*/g;
      const matches = newValue.match(webSearchRegex);
      return matches ? matches.join(' ') : '';
    }, []);

    // Handle input changes and trigger mention popup
    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
      // Apply max length constraint if specified
      if (maxLength && event.target.value.length > maxLength) {
        event.target.value = event.target.value.slice(0, maxLength);
      }

      onChange(event);

      if (!showWebSearchMention) return;

      const newValue = event.target.value;
      const cursorPosition = event.target.selectionStart;
      const lastChar = newValue[cursorPosition - 1];

      if (lastChar === '@') {
        setShowMentionPopup(true);
        updateCursorPosition();
      } else if (showMentionPopup) {
        const words = newValue.slice(0, cursorPosition).split(' ');
        const currentWord = words.at(-1);
        if (!currentWord?.startsWith('@')) {
          setShowMentionPopup(false);
        }
      }
    }, [onChange, showMentionPopup, maxLength, showWebSearchMention]);

    // Get cursor coordinates for mention popup positioning
    const getCursorCoordinates = useCallback((textarea: HTMLTextAreaElement, position: number): { top: number; left: number } => {
      const { scrollLeft, scrollTop, offsetLeft, offsetTop } = textarea;
      const div = document.createElement('div');
      const styles = getComputedStyle(textarea);
      const properties = ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'textTransform', 'wordSpacing', 'textIndent'];

      for (const prop of properties) {
        div.style[prop as any] = styles[prop as any];
      }

      div.textContent = textarea.value.substring(0, position);
      div.style.position = 'absolute';
      div.style.visibility = 'hidden';
      div.style.whiteSpace = 'pre-wrap';
      div.style.overflowWrap = 'break-word';

      document.body.appendChild(div);
      const coordinates = {
        top: div.offsetHeight - scrollTop + offsetTop,
        left: div.offsetWidth - scrollLeft + offsetLeft,
      };
      div.remove();

      return coordinates;
    }, []);

    // Update cursor position for mention popup
    const updateCursorPosition = useCallback(() => {
      if (textareaRef.current) {
        const { selectionStart, selectionEnd } = textareaRef.current;
        if (selectionStart === selectionEnd) {
          const coords = getCursorCoordinates(textareaRef.current, selectionStart);
          setCursorPosition(coords);
        }
      }
    }, [getCursorCoordinates]);

    // Insert web search mention
    const insertMention = useCallback(() => {
      if (textareaRef.current) {
        const cursorPosition = textareaRef.current.selectionStart;
        const textBeforeCursor = value.slice(0, cursorPosition);
        const textAfterCursor = value.slice(cursorPosition);
        const lastAtSymbolIndex = textBeforeCursor.lastIndexOf('@');
        const newValue =
          textBeforeCursor.slice(0, lastAtSymbolIndex) +
          '@google_search' +
          textAfterCursor;
        const newEvent = {
          target: {
            value: newValue
          }
        } as ChangeEvent<HTMLTextAreaElement>;
        onChange(newEvent);
        setShowMentionPopup(false);
        setTimeout(() => {
          if (textareaRef.current) {
            const newCursorPosition = lastAtSymbolIndex + '@google_search '.length;
            textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
            textareaRef.current.focus();
          }
        }, 0);
      }
    }, [value, onChange]);

    // Render the mention popup if enabled
    const renderMentionPopup = () => {
      if (!showWebSearchMention || !showMentionPopup) return null;

      return (
        <div
          className="absolute !top-auto !bottom-[54px] py-2 px-4 w-full max-w-[266px] bg-white dark:bg-[#1E2129] border-0 rounded-lg z-10"
          style={{ top: `${cursorPosition.top + 20}px`, left: `${cursorPosition.left}px` }}
        >
          <button
            className="flex items-center gap-3 cursor-pointer py-2 border-b border-whiteSmoke dark:border-[#282A2F] bg-transparent hover:dark:bg-[#242831] hover:bg-whiteSmoke"
            onClick={insertMention}
            aria-label="Mention user"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <g clipPath="url(#clip0_2701_12805)">
                <path d="M16.8347 9.426C16.8768 9.45656 16.9172 9.48864 16.9557 9.52225C16.9575 9.48192 16.9584 9.44128 16.9584 9.40033V5.27075C16.9584 4.72374 16.7411 4.19914 16.3543 3.81234C15.9675 3.42555 15.4429 3.20825 14.8959 3.20825H11.6876V2.52075L11.6821 2.42817C11.6597 2.26325 11.5782 2.11207 11.4528 2.00267C11.3274 1.89326 11.1665 1.83307 11.0001 1.83325L10.9066 1.83967C10.742 1.86226 10.5911 1.94369 10.4819 2.0689C10.3727 2.19411 10.3126 2.35462 10.3126 2.52075L10.3117 3.20825H7.10333C6.55648 3.2085 6.03211 3.4259 5.64551 3.81267C5.25892 4.19944 5.04174 4.7239 5.04174 5.27075V9.40033C5.04174 9.94734 5.25904 10.4719 5.64584 10.8587C6.03263 11.2455 6.55723 11.4628 7.10424 11.4628H14.2396L14.2579 11.4143L14.2652 11.3904L14.6777 10.1218L14.6823 10.1108C14.7551 9.90431 14.8748 9.71757 15.0319 9.5652C15.1891 9.41283 15.3795 9.29899 15.588 9.23262C15.7966 9.16626 16.0178 9.14918 16.2341 9.18274C16.4504 9.21629 16.656 9.29956 16.8347 9.426ZM8.93758 5.95825C9.09072 5.95392 9.24317 5.98034 9.38592 6.03595C9.52867 6.09156 9.65882 6.17524 9.76867 6.28202C9.87852 6.38881 9.96584 6.51654 10.0255 6.65766C10.0851 6.79878 10.1158 6.95043 10.1158 7.10363C10.1158 7.25683 10.0851 7.40847 10.0255 7.54959C9.96584 7.69071 9.87852 7.81844 9.76867 7.92523C9.65882 8.03202 9.52867 8.11569 9.38592 8.1713C9.24317 8.22691 9.09072 8.25333 8.93758 8.249C8.63941 8.24057 8.35629 8.11619 8.14838 7.90231C7.94047 7.68844 7.82415 7.40191 7.82415 7.10363C7.82415 6.80534 7.94047 6.51882 8.14838 6.30494C8.35629 6.09106 8.63941 5.96669 8.93758 5.95825ZM13.0552 5.95825C13.2084 5.95392 13.3608 5.98034 13.5036 6.03595C13.6463 6.09156 13.7765 6.17524 13.8863 6.28202C13.9962 6.38881 14.0835 6.51654 14.1431 6.65766C14.2028 6.79878 14.2335 6.95043 14.2335 7.10363C14.2335 7.25683 14.2028 7.40847 14.1431 7.54959C14.0835 7.69071 13.9962 7.81844 13.8863 7.92523C13.7765 8.03202 13.6463 8.11569 13.5036 8.1713C13.3608 8.22691 13.2084 8.25333 13.0552 8.249C12.7571 8.24057 12.474 8.11619 12.266 7.90231C12.0581 7.68844 11.9418 7.40191 11.9418 7.10363C11.9418 6.80534 12.0581 6.51882 12.266 6.30494C12.474 6.09106 12.7571 5.96669 13.0552 5.95825ZM11.9552 12.8672L12.0588 12.8333H5.73291C5.1859 12.8333 4.6613 13.0506 4.2745 13.4373C3.88771 13.8241 3.67041 14.3487 3.67041 14.8958V15.7272C3.67032 16.2222 3.77716 16.7115 3.98362 17.1614C4.19009 17.6113 4.4913 18.0114 4.86666 18.3342C6.29941 19.5653 8.35183 20.1675 11.0001 20.1675C12.9031 20.1675 14.499 19.8568 15.7787 19.2252C15.5354 19.1786 15.3085 19.0693 15.1206 18.908C14.9326 18.7467 14.7901 18.5391 14.7071 18.3057L14.7034 18.2948L14.2909 17.0252C14.2083 16.7765 14.069 16.5497 13.8839 16.3643L13.5548 16.1241L13.2257 15.9563L11.9562 15.5438L11.9452 15.5393C11.6698 15.4412 11.4314 15.2603 11.2629 15.0214C11.0944 14.7826 11.0039 14.4974 11.0039 14.205C11.0039 13.9127 11.0944 13.6275 11.2629 13.3886C11.4314 13.1498 11.6698 12.9689 11.9452 12.8708L11.9552 12.8672ZM14.5329 15.7171C14.8199 16.0031 15.0351 16.3531 15.1608 16.7383L15.5715 18.0005C15.6056 18.0981 15.6693 18.1827 15.7536 18.2425C15.8379 18.3024 15.9388 18.3345 16.0422 18.3345C16.1456 18.3345 16.2465 18.3024 16.3308 18.2425C16.4151 18.1827 16.4788 18.0981 16.5129 18.0005L16.9227 16.7383C17.05 16.3543 17.2654 16.0055 17.5516 15.7197C17.8377 15.4338 18.1868 15.2188 18.5708 15.0919L19.834 14.6813C19.9306 14.6463 20.014 14.5825 20.073 14.4984C20.132 14.4144 20.1636 14.3142 20.1636 14.2115C20.1636 14.1088 20.132 14.0086 20.073 13.9245C20.014 13.8404 19.9306 13.7766 19.834 13.7417L19.8092 13.7353L18.5461 13.3246C18.1624 13.197 17.8137 12.9818 17.5276 12.6961C17.2415 12.4103 17.0259 12.0618 16.8979 11.6783L16.4872 10.416C16.4529 10.3187 16.3892 10.2345 16.305 10.1749C16.2208 10.1153 16.1202 10.0833 16.017 10.0833C15.9138 10.0833 15.8132 10.1153 15.729 10.1749C15.6447 10.2345 15.5811 10.3187 15.5467 10.416L15.1361 11.6783L15.1251 11.7094C14.9966 12.0834 14.7847 12.4233 14.5053 12.7031C14.2259 12.983 13.8864 13.1955 13.5127 13.3246L12.2504 13.7353C12.1538 13.7702 12.0704 13.834 12.0114 13.9181C11.9524 14.0022 11.9208 14.1024 11.9208 14.205C11.9208 14.3077 11.9524 14.4079 12.0114 14.492C12.0704 14.5761 12.1538 14.6399 12.2504 14.6748L13.5127 15.0855C13.8977 15.2138 14.2469 15.4302 14.5329 15.7171ZM21.0999 19.2178L21.8012 19.4452L21.8158 19.4488C21.87 19.4678 21.9169 19.5031 21.9501 19.5499C21.9833 19.5968 22.0011 19.6527 22.0011 19.7101C22.0011 19.7675 21.9833 19.8234 21.9501 19.8702C21.9169 19.917 21.87 19.9524 21.8158 19.9713L21.1137 20.1987C20.9004 20.2698 20.7067 20.3895 20.5477 20.5485C20.3888 20.7074 20.269 20.9012 20.1979 21.1144L19.9706 21.8148C19.9516 21.8689 19.9163 21.9158 19.8695 21.949C19.8227 21.9822 19.7667 22 19.7093 22C19.652 22 19.596 21.9822 19.5492 21.949C19.5024 21.9158 19.4671 21.8689 19.4481 21.8148L19.2189 21.1144C19.1483 20.9008 19.0288 20.7065 18.87 20.5471C18.7112 20.3877 18.5174 20.2674 18.3041 20.1959L17.6019 19.9677C17.5478 19.9487 17.5009 19.9134 17.4677 19.8666C17.4345 19.8198 17.4166 19.7638 17.4166 19.7064C17.4166 19.649 17.4345 19.5931 17.4677 19.5463C17.5009 19.4995 17.5478 19.4641 17.6019 19.4452L18.3041 19.2178C18.5145 19.1449 18.7053 19.0244 18.8615 18.8657C19.0178 18.7071 19.1354 18.5145 19.2052 18.303L19.4334 17.6018C19.4524 17.5476 19.4877 17.5007 19.5345 17.4675C19.5813 17.4343 19.6373 17.4165 19.6947 17.4165C19.752 17.4165 19.808 17.4343 19.8548 17.4675C19.9016 17.5007 19.9369 17.5476 19.9559 17.6018L20.1842 18.3021C20.2553 18.5153 20.375 18.7091 20.534 18.868C20.6929 19.027 20.8867 19.1467 21.0999 19.2178Z" fill="url(#paint0_linear_2701_12805)" />
              </g>
              <defs>
                <linearGradient id="paint0_linear_2701_12805" x1="3.67041" y1="11.9166" x2="22.0011" y2="11.9166" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F65468" />
                  <stop offset="0.5" stopColor="#A851F5" />
                  <stop offset="1" stopColor="#5989FD" />
                </linearGradient>
                <clipPath id="clip0_2701_12805">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="text-gray-800 dark:text-white text-sm">Google-Search</div>
          </button>
        </div>
      );
    };

    return (
      <div className={wrapperClassName}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          className={`${className} pl-4 !py-1 !focus:outline-none !border-0`}
          placeholder={placeholder}
          style={{
            height: "28px",
            minHeight,
            maxHeight,
          }}
          onKeyDown={onKeyDown}
          disabled={!isAnyLoading && disabled}
          id="auto-resize-textarea"
          {...restProps}
        />
        {renderMentionPopup()}
        {children}
      </div>
    );
  }
);

BaseAutoResizeTextarea.displayName = "BaseAutoResizeTextarea";

export default BaseAutoResizeTextarea;