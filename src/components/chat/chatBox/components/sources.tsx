import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { v4 as uuidv4 } from "uuid";
import { useConversation } from "../../../../context/conversation.context";
import { useTheme } from "../../../../context/themeContext";
const skeletonCount = 3;

const Sources = ({ message }: { message: any }): JSX.Element => {
  const { conversationMessages, setConversationMessages } = useConversation();
  const { isDarkMode } = useTheme();

  const [isWebSearch, setIsWebSearch] = React.useState(false);
  const { citations, showResources } = message;

  const handleShowResources = () => {
    const updatedMessages = conversationMessages.map((msg) => {
      if (msg._id === message._id) {
        return { ...msg, showResources: !msg.showResources };
      }
      return msg;
    });
    setConversationMessages(updatedMessages);
  };

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  React.useEffect(() => {
    const hasCitations = message.citations?.results?.length > 0;
    if (message.chatEvent === "Searching the web..." || hasCitations) {
      setIsWebSearch(true);
    } else {
      setIsWebSearch(false);
    }

    return () => {
      setIsWebSearch(false);
    };
  }, [message.chatEvent, message.citations]);

  if (!isWebSearch) return <></>;

  return (
    <div className="source_grid mb-6 gap-2">
      {citations?.results ? (
        citations.results.slice(0, skeletonCount).map((c: any) => (
          <button
            key={c?.title}
            onClick={() => openInNewTab(c.url)}
            className="flex flex-col justify-between w-full cursor-pointer rounded-md bg-whiteSmoke p-3 duration-500 hover:bg-linkWater dark:bg-blackRussian2 hover:dark:bg-blackRussian3 text-left"
          >
            <p className="display-webkit-box !mb-3 !line-clamp-2 text-xs font-semibold dark:text-white">
              {c?.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="truncate text-xs text-greyChateau">
                {new URL(c?.url).hostname}
              </span>
            </div>
          </button>
        ))
      ) : (
        <SkeletonTheme
          baseColor={isDarkMode ? "#2b2b2b" : "#e0e0e0"}
          highlightColor={isDarkMode ? "#3c3c3c" : "#f5f5f5"}
        >
          {Array.from({ length: skeletonCount }).map(() => (
            <div
              key={uuidv4()}
              className="w-full h-[88px] rounded-md bg-[#f5f5f5] p-3 dark:bg-[#3c3c3c]"
            >
              <div className="rt-skeletonsection-sources relative mb-1">
                <Skeleton className="h-1 w-full" height={5} />
              </div>
              <div className="rt-skeletonsection-sources relative mb-2">
                <Skeleton className="h-1 w-3/4" height={5} />
              </div>
              <div className="relative flex items-center">
                <div className="rt-skeletonsection-sources relative flex-shrink-0">
                  <Skeleton circle={true} width={30} height={30} />
                </div>
                <div className="relative ml-3 h-1 w-full">
                  <Skeleton height={5} />
                </div>
              </div>
            </div>
          ))}
        </SkeletonTheme>
      )}

      <button
        className="flex h-[] cursor-pointer flex-col justify-between gap-3 rounded-md bg-whiteSmoke p-3 duration-500 hover:bg-linkWater dark:bg-blackRussian2 hover:dark:bg-blackRussian3"
        onClick={handleShowResources}
      >
        <span className="cursor-pointer text-xs dark:text-greyChateau">
          {
            showResources ? "Hide sources" : "Show all sources"
          }
        </span>
      </button>
    </div>
  );
};

export default Sources;
