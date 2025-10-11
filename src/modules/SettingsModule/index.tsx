import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import SettingsTabs from "./components/SettingsTabs";
import ProfileSettings from "./components/ProfileSettings";
import ChatHeader from "../../components/ChatHeader";
import PasswordSettings from "./components/PasswordSettings";
import { useConversation } from "../../context/conversation.context";
import { HttpService } from "../../services/base.service";
import { EGptModels } from "../../enums/gpt-models.enum";
import CommonTooltip from "../../components/ComonTooltip";

import PurgingSettings from "./components/purgingSettings";

const SettingsModule = () => {
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);
  const router = useRouter();
  const { setSelected, setSelectedModel } = useConversation();

  useEffect(() => {
    const tabFromSession = sessionStorage.getItem("settings-tab");
    if (tabFromSession) {
      setSelectedTabIdx(Number.parseInt(tabFromSession, 10));
      sessionStorage.removeItem("settings-tab"); // clear it after using
    }
  }, []);

  const handleGoBack = () => {
    setSelected("");
    setSelectedModel("");
    HttpService.setCookie("model", EGptModels.GPT_4);
    router.back();
  }
  return (
    <section className="settings flex grow flex-col">
      <ChatHeader />
      <div className="settings__body">
        <button
          onClick={handleGoBack}
          className={`preferences__body__back__arrow dark:text-white`}
        >
          <span className='p-1 rounded-md bg-transparent hover:dark:bg-blackRussian3 hover:bg-linkWater'>
            <CommonTooltip position='bottom' name={"Back"} className={"mt-4 !px-2 pb-[5px] !pt-[1px] !py-1"}>
              <IoIosArrowBack />
            </CommonTooltip>
          </span>
          <span className="dark:text-white">Back</span>
        </button>
        <div className="settings__main  flex w-full grow flex-col items-start gap-6 md:grid md:grid-cols-12">
          <div className="settings__tabs w-full rounded-xl border border-linkWater dark:border-vulcan p-5 md:col-span-4 lg:col-span-3">
            <SettingsTabs
              selectedTabIdx={selectedTabIdx}
              setSelectedTabIdx={setSelectedTabIdx}
            />
          </div>
          <div className="settings__inner flex  w-full grow flex-col md:col-span-8 lg:col-span-9">
            {selectedTabIdx == 0 && <ProfileSettings />}
            {selectedTabIdx == 1 && <PasswordSettings />}
            {selectedTabIdx == 2 && <PurgingSettings />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsModule;
