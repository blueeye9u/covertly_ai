import React from "react";
import { useRouter } from "next/router";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { VerifiedIcon } from "../../../svgs/svg";
const PrivacyProtectionModal = NiceModal.create(() => {
    const modal = useModal();
    const router = useRouter()
    return (
        <BasicModal show={modal.visible} hide={modal.hide}>
            <div className="rounded-2xl bg-white dark:bg-blackRussian2 p-5 md:p-8 sm:w-[458px] flex flex-col justify-center items-center">
                <div className="w-20 h-20 flex justify-center items-center border border-blackRussian3 rounded-full mb-4">
                    <VerifiedIcon width="33" height="40" />
                </div>
                <h2 className="fs-24 font-semibold mb-2 leading-tight dark:text-white">Privacy Protection</h2>
                <p className="dark:text-ghost mb-8 max-w-[348px] text-sm">All chats are private, anonymous, and unmoderated. We never store, monitor, sell, or utilize any data you provide. Your privacy is our priority.</p>
                <div className="flex gap-2 items-center w-full">
                    <Button
                        size="lg"
                        type="submit"
                        color="secondary"
                        className="w-full btn"
                        variant="outline"
                        onClick={() => {
                            modal.hide();
                            router.push("/privacy-policy"); 
                        }}
                    >
                        Privacy Policy
                    </Button>
                    <Button
                        onClick={() => { modal.hide() }}
                        size="lg"
                        type="submit"
                        className="w-full btn"
                    >
                        Got it!
                    </Button>
                </div>

            </div>
        </BasicModal>
    );
});

export default PrivacyProtectionModal;
