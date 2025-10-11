import React from "react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import NiceModal from "@ebay/nice-modal-react";
import ImageComponent from "../../components/global/imageComponent/ImageComponent";
import { images } from "../../assets/images";
import { ImageGenerationIcon, InfoIcon, LoaderIcon} from "../../svgs/svg";
import ChatHeader from "../../components/ChatHeader";
import withAuthentication from "../../components/hoc/withAuthentication";
import { ISubscriptionType } from "../../enums/subscription.enum";
import useSubscriptionPackage from "../../hooks/useSubscriptionPackage";
import { EGptModels } from "../../enums/gpt-models.enum";
import { Button } from "../../components/global/button/Button";
import { ROUTES } from "../../components/global/routes";
import { HttpService } from "../../services/base.service";
import { useConversation } from "../../context/conversation.context";
import CommonTooltip from "../../components/ComonTooltip";
import WordsGeneratedChart from "./components/WordsGeneratedChart";
import ImageGenerationChart from "./components/ImageGenerationChart";
import { getRefinedFigure } from "../../utils/getRefinedFigure";

const UsageModule = () => {
  const router = useRouter();
  const { currentPackage, User, chatsGenerated, imagesGenerated, chatsRemaining, imagesRemaining, totalImages, totalChats }: any = useSubscriptionPackage();

  const { setSelected, setSelectedModel } = useConversation();

  const handleGoBack = () => {
    setSelected("");
    setSelectedModel("");
    HttpService.setCookie("model", EGptModels.GPT_4);
    router.replace(ROUTES.chat)
  }

  const handleBuyMoreModel = (modalName: string) => {
    NiceModal.show(modalName);
  };

  if (!User)
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );

  // Format subscription/tokens period end as "MMM DD YYYY" uppercased month (e.g., OCT 01 2025)
  const formatPeriodEnd = (date?: Date | string) => {
    if (!date) return "—";
    const d = new Date(date);
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month} ${day} ${year}`;
  };
  // Prefer monthly tokens renewal date (for yearly plans); fallback to subscription end
  const periodEndDisplay = (User?.tokensRenewalDate ?? User?.subscriptionEndDate);
  return (
    <section className="preferences">
      <ChatHeader />
      <div className="preferences__body w-full">

        {/* change div into button */}
        <button onClick={handleGoBack} className={`preferences__body__back__arrow dark:text-white`}>

          <span className='p-1 rounded-md bg-transparent hover:dark:bg-blackRussian3 hover:bg-linkWater'>
            <CommonTooltip position='bottom' name={"Back"} className={"mt-4 !px-2 pb-[5px] !pt-[1px] !py-1"}>
              <IoIosArrowBack />
            </CommonTooltip>
          </span>

          <span className="dark:text-white">Chats</span>
        </button>
        <div className="preferences__body__version">
          <h5>
            Usage
            <p className="text-sm text-aluminium">
               Check your prompt details below.
            </p>
          </h5>
        </div>

        <div className="flex md:flex-row flex-col justify-between gap-6  w-full mb-3">


          {
            currentPackage === ISubscriptionType.UNLIMITED_MONTHLY || currentPackage === ISubscriptionType.UNLIMITED_YEARLY ? (
              <div className="flex flex-col items-center justify-center py-14 border border-blackRussian3 rounded-lg p-5 w-full">
                <ImageComponent src={images.unlimited} height={96} width={232} figClassName="mb-2" alt="unlimited image"/>
                <h2 className="text-gradient h2 text-center">Unlimited Words</h2>
                <p className="dark:text-white text-center sm::px-20">You have unlimited words to use the chat. Enjoy uninterrupted conversations without any limits!</p>
              </div>
            ) : (
              <div className="w-full flex flex-col">
                {/* Top summary card - Words */}
                <div className="p-4 rounded-xl bg-neptune w-full min-h-[96px]">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 flex items-center justify-center rounded-md bg-shark2 text-white text-base font-medium">Aa</span>
                      <div className="leading-none ml-3">
                        <div className="fs-48 !text-shark2 !leading-tight font-semibold">{getRefinedFigure(chatsRemaining)}</div>
                        <p className="fs-16 text-vulcan font-semibold">
                          {currentPackage === ISubscriptionType.FREE && !User.topUpChatTokensCredits ? "Prompts Remaining" : "Words Remaining"}
                        </p>
                      </div>
                    </div>
                    <div className="w-[100px] text-right">
                      <span className="block text-[12px] tracking-wide text-bunker font-semibold text-left">Period Ending</span>
                      <span className="block text-bunker text-left text-[18px] font-semibold">{formatPeriodEnd(periodEndDisplay)}</span>
                    </div>
                  </div>
                </div>

                {/* Gauge and description */}
                <div className="p-4 mt-4 border-t-transparent border border-linkWater dark:border-blackRussian3 rounded-xl relative bg-woodsmoke">
                  <p className="text-sm text-manatee max-w-xs mb-4">This is a summary of how many {currentPackage === ISubscriptionType.FREE && !User.topUpChatTokensCredits ? "prompts" : "words"} you have remaining in the current period.</p>

                  <div className="relative mx-auto w-full max-w-[620px] lg:max-w-[820px]">
                    <div className="mr-0 lg:mr-[140px] xl:mr-0">
                      <WordsGeneratedChart percentage={chatsRemaining / totalChats * 100}/>
                    </div>

                    <div className="hidden lg:block absolute right-0 top-[78%] -translate-y-1/2 text-left">
                      <div className="dark:text-white"><span className="fs-24">{getRefinedFigure(chatsGenerated)}</span> <span className="text-paleSky text-[12px]">/ {getRefinedFigure(totalChats)}</span></div>
                      <span className="text-paleSky fs-16">{currentPackage === ISubscriptionType.FREE && !User.topUpChatTokensCredits ? "Prompts" : "Words"} Used</span>
                    </div>
                  </div>

                  <div className="lg:hidden">
                    <div className="flex items-baseline justify-between">
                      <div className="dark:text-white"><span className="fs-24">{getRefinedFigure(chatsGenerated)}</span> <span className="text-paleSky text-[12px]">/ {getRefinedFigure(totalChats)}</span></div>
                      <span className="text-paleSky fs-16">{currentPackage === ISubscriptionType.FREE && !User.topUpChatTokensCredits ? "Prompts" : "Words"} Used</span>
                    </div>
                  </div>
                </div>
                {
                  !chatsRemaining &&
                  <div className="p-4 border border-persianRed33 rounded-xl flex gap-3 items-center mt-3 bg-persianRed05">
                    <span className="text-valencia"><InfoIcon /> </span>
                    <p className="text-sm text-valencia">You have reached the maximum limit chat words credits. Please buy more.</p>
                  </div>
                }

                {
                  (currentPackage !== ISubscriptionType.FREE && !User.topUpChatTokensCredits && !User.subscriptionChatTokensCredits) &&
                  <div className="w-full mt-4 grow flex flex-col items-end justify-end">
                    <Button size="lg" className="w-full !flex-none" onClick={() => { handleBuyMoreModel("tokenModal") }}>Buy more words</Button>
                  </div>
                }
              </div>
            )
          }



          <div className="w-full flex flex-col">

            <div className="p-4 rounded-xl bg-logan w-full min-h-[96px]">
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 flex items-center justify-center rounded-md bg-shark2 text-white">
                    <span aria-hidden className="invisible w-0 overflow-hidden inline-block align-baseline">A</span>
                    <ImageGenerationIcon />
                  </span>
                  <div className="leading-none ml-3">
                    <div className="fs-48 !text-shark2 !leading-tight font-semibold">{getRefinedFigure(imagesRemaining)}</div>
                    <p className="fs-16 text-vulcan font-semibold">Images Remaining</p>
                  </div>
                </div>
                <div className="w-[100px] text-right">
                  <span className="block text-[12px] tracking-wide text-bunker text-left font-semibold">Period Ending</span>
                  <span className="block font-semibold text-[18px] text-left text-bunker">{formatPeriodEnd(periodEndDisplay)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 mt-4 border-t-transparent border border-linkWater dark:border-blackRussian3 rounded-xl relative bg-woodsmoke">
              <p className="text-sm text-manatee max-w-xs mb-4">This is a summary of how many images you have remaining in the current period.</p>

              <div className="relative mx-auto w-full max-w-[620px] lg:max-w-[820px]">
                <div className="mr-0 lg:mr-[140px] xl:mr-0">
                  <ImageGenerationChart percentage={imagesRemaining / totalImages * 100} />
                </div>

                <div className="hidden lg:block absolute right-0 top-[78%] -translate-y-1/2 text-left">
                  <div className="text-base dark:text-white"><span className="fs-24">{getRefinedFigure(imagesGenerated)}</span><span className="text-paleSky text-[12px]">/ {getRefinedFigure(totalImages)}</span></div>
                  <span className="fs-16 text-paleSky">Images Used</span>
                </div>
              </div>

              <div className="lg:hidden">
                <div className="flex items-baseline justify-between">
                  <div className="text-base dark:text-white"><span className="fs-24">{getRefinedFigure(imagesGenerated)}</span><span className="text-paleSky text-[12px]">/ {getRefinedFigure(totalImages)}</span></div>
                  <span className="fs-16 text-paleSky">Images Used</span>
                </div>
              </div>
            </div>
            {
              !imagesRemaining &&
                <div className="p-4 border border-persianRed33 rounded-xl flex gap-3 items-center mt-3 bg-persianRed05">
                  <span className="text-valencia"><InfoIcon /> </span>
                  <p className="text-sm text-valencia">You have reached the maximum limit for image generation credits. Please buy the more.</p>
                </div>
            }
            {
              (currentPackage !== ISubscriptionType.FREE && !User.topUpImagePromptsCredits && !User.subscriptionImagePromptsCredits) &&
              <div className="w-full mt-4 grow flex flex-col items-end justify-end">
                <Button size="lg" className="w-full !flex-none" onClick={() => { handleBuyMoreModel("tokenModal") }}>Buy more image generations</Button>
              </div>
            }
          </div>


        </div>
      </div>
    </section>
  );
};

export default withAuthentication(UsageModule);
