import React, { useEffect, useState } from "react";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../global/button/Button";
import { ISubscriptionType, SubscriptionBuyMore } from "../../../enums/subscription.enum";
import useLoggedInUser from "../../../hooks/useLoggedInUser";
import { subscriptionService } from "../../../services/subscription.service";
import { errorHandler } from "../../../utils/errorHandler";
import { getRefinedFigure } from "../../../utils/getRefinedFigure";
import { useSubscription } from "../../../context/subscription.context";

const BuyTokenModal = NiceModal.create(() => {
  const modal = useModal();
  const [User, isLoading]: any = useLoggedInUser();
  const [currentPackage, setCurrentPackage] = useState<string>("free");

  const { getSubscriptionType } = useSubscription();

  useEffect(() => {
    const stripePriceId: any = User?.stripePriceId;
    if (stripePriceId) {
      const subscriptionType = getSubscriptionType(stripePriceId);
      setCurrentPackage(subscriptionType);
    }
  }, [isLoading, User, getSubscriptionType]);

  const buyMoreSessionHandler = async (subscription: string) => {
    try {
      const response = await subscriptionService.buyMoreSession({
        subscription: subscription,
      });
      const sessionUrl = response?.payload?.sessionUrl;
      globalThis.window.location.href = sessionUrl;
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const packageData = {
    [ISubscriptionType.STARTER_YEARLY]: ['basic_low_buymore', 'basic_high_buymore'],
    [ISubscriptionType.STARTER_MONTHLY]: ['basic_low_buymore', 'basic_high_buymore'],
    [ISubscriptionType.PRO_YEARLY]: ['basic_high_buymore', 'advanced_low_buymore'],
    [ISubscriptionType.PRO_MONTHLY]: ['basic_high_buymore', 'advanced_low_buymore'],
  }[currentPackage] ?? [];

  return (
    <BasicModal show={modal.visible} hide={modal.hide} className="md:w-[45.813rem]">
      <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian p-5 pt-10 md:p-8 w-full">
        <h2 className="buyToken fs-32 font-bold text-start mb-9">Buy Tokens</h2>

        <div className="grid grid-cols-2 xs:grid-cols-1 gap-7 w-full">
          {packageData.length > 0 ? packageData.map((packageKey: string) => (
            <div key={uuidv4()} className="border border-linkWater dark:border-[#32353C] rounded-xl bg-white dark:bg-[#1E2129] px-6 py-2.5">
              <div className="mb-14">
                <h6 className="fs-22 font-semibold text-start mb-2">
                  Chat Tokens: <span className="text-[#9FA0A2]">{getRefinedFigure(SubscriptionBuyMore[packageKey].topUpChatTokensCredits)}</span>
                </h6>
                <h6 className="fs-22 font-semibold text-start">
                  Image Generations: <span className="text-[#9FA0A2]">{getRefinedFigure(SubscriptionBuyMore[packageKey].topUpImagePromptsCredits)}</span>
                </h6>
                {/* <span className="text-[#9FA0A2] text-start block text-sm">Tokens</span> */}
              </div>
              <div className="mb-7 pb-7 border-b border-linkWater dark:border-[#32353C]">
                <h4 className="fs-32 font-semibold text-start">
                  ${SubscriptionBuyMore[packageKey].price.toFixed(2)}
                </h4>
                <span className="text-[#9FA0A2] text-start block text-base">One time payment</span>
              </div>
              <Button size="lg" className="w-full" onClick={()=>buyMoreSessionHandler(packageKey)}>Buy Tokens</Button>
            </div>
          )) : (
            <div>No tokens available for your current package.</div>
          )}
        </div>
      </div>
    </BasicModal>
  );
});

export default BuyTokenModal;
