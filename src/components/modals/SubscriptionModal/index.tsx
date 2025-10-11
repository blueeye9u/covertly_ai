import React from "react";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PricePlanSwitcher from "../../PriceplanSwitcher";
import SubscriptionCard from "./SubscriptionCard";
import useSubscriptionTab from "../../../hooks/useSubscriptionTab";

const SubscriptionModal = NiceModal.create(() => {
  const modal = useModal();
  const { selectedTabIdx, setSelectedTabIdx } = useSubscriptionTab();

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div
        className="
          rounded-2xl bg-whiteSmoke dark:bg-blackRussian2
          p-5 pt-10 md:p-8
          w-full
          max-w-[calc(100vw-6rem)] md:max-w-[1500px]   
          sm:ml-auto                 
          mx-auto
          flex flex-col
          overflow-hidden
        "
      >
        <h3 className="h3 fs-30 mb-4 font-bold leading-tight">
          Choose the plan that fits your needs.
        </h3>

        <div className="flex flex-col gap-2 items-center justify-center mb-6">
          <PricePlanSwitcher
            selectedTabIdx={selectedTabIdx}
            setSelectedTabIdx={setSelectedTabIdx}
          />
          <p className="text-[#77EA9E] text-xl font-bold mt-2">
            Save ~ 15%{" "}
            <span className="!text-black dark:!text-white text-xl">
              on a yearly subscription
            </span>
          </p>
        </div>

        <SubscriptionCard selectedTabIdx={selectedTabIdx} />
      </div>
    </BasicModal>
  );
});

export default SubscriptionModal;
