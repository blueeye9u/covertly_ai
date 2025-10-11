import React, { useEffect, useState } from "react";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { CopyIcon, DownloadIcon, Tick, WarningIcon, ErrorIcon } from "../../../svgs/svg";
import { toast } from "react-hot-toast";
import AnimationString from "./AnimatedString";
import { socialAuthService } from "../../../services/account-key-auth-service";
import { downloadBlob } from "../../../utils/downloadUtils";

const SecureSignupModal = NiceModal.create((): JSX.Element => {
  const [checked, setChecked] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [accountKey, setAccountKey] = useState("");
  const [error, setError] = useState("");

  const modal = useModal();

  useEffect(() => {
    setChecked(true);
    setRevealed(false);
    setAccountKey("");
    setError("");
  }, [modal.visible]);

  const handleRevealKey = async () => {
    try {
      setRevealed(true);
      setError("");
      setAccountKey("");
      const res = await socialAuthService.generateAccountKey();
      setAccountKey(res.payload.accountKey);
    } catch (error) {
      console.error("Error generating account key:", error);
      setAccountKey("");
      setRevealed(false);
      setError("Failed to generate account key. Please try again.");
    }
  }

  const handleDownload = () => {
    if (accountKey) {
      const text = accountKey;
      const blob = new Blob([text], { type: 'text/plain' });
      downloadBlob(blob, 'Account_Key-Covertly_AI.txt');
    }
  };

  const handleCopyToClipboard = () => {
    if (accountKey) {
      navigator.clipboard
        .writeText(accountKey)
        .then(() => {
          toast.success("Account key copied to clipboard!")
        })
        .catch(() => {
          toast.error("Failed to copy the account key")
        });
    }
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="secure-signup !px-10 !py-12 md:!w-[49rem] sm:!w-[24rem] !w-full rounded-tl-3xl rounded-br-3xl">
        <h4 className="font-medium mb-1 text-white">Your Secure Login Key is Ready</h4>
        <p className="max-w-[360px] mx-auto text-white text-sm mb-8">
          Keep your key safe; your account is secured with an encrypted access
          key.
        </p>
        <div className="mb-10">
          <div className="rounded-full py-5 bg-blackRussian w-full text-center sm:text-4xl text-lg placeholder:text-[#585A5D] text-mediumTurquoise flex justify-center">
            {revealed ? (
              <div className="account-key__main">
                <span id="main-account-key-container" className="account-key__main__text primary-text-highlight">
                  {
                    accountKey || <AnimationString />
                  }
                </span>
              </div>
            ) : (
              <p className="text-capeCod text-center">***** - **** - **** - *****</p>
            )}
          </div>
          {error && (
            <div className="flex gap-2 items-center mt-2">
              <span>
                <ErrorIcon />
              </span>
              <p className="text-red-500 text-start text-sm">
                {error}
              </p>
            </div>
          )}

        </div>
        {
          accountKey && (
            <div className="secure-signup_warning-btn">
              <span>
                <WarningIcon />
              </span>
              <p className="text-white text-start text-sm">
                Do not lose your encrypted account key—it’s your only access and cannot be recovered if lost. Additionally, it will expire if not used within 24 hours.
              </p>
            </div>
          )
        }
        {!accountKey && (
          <div className="flex gap-3 items-start mb-6">
            <button
              className={`chekBtn block text-white shrink-0 ${checked ? "bg-white" : "bg-[linear-gradient(99.26deg,#30C5D2_-10.79%,#471069_154.3%)]"}`}
              onClick={() => {
                setChecked(!checked);
              }}
            >
              {checked ? "" : <Tick />}
            </button>
            <p className="text-sm text-white sm:pr-28 text-start">I understand that if I lose my key, I lose this account and everything linked to it.
            </p>
          </div>
        )}
        {
          !accountKey && (
            <Button
              disabled={checked}
              onClick={handleRevealKey}
              size="lg" className={`btn w-full mb-6 ${checked ? "opacity-20 cursor-not-allowed" : ""}`}
            >
              {error ? "Regenerate" : "Reveal key"}
            </Button>
          )
        }
        {accountKey && (
          <div className="flex sm:flex-row flex-col gap-2 items-center mb-6">
            <Button size="lg" className="!w-full" onClick={handleDownload}>
              <DownloadIcon /> Download as .txt
            </Button>
            <button
              className="btn py-2.5 lg:py-[0.75rem] fs-16 px-5 lg:px-[1.75rem] bg-white hover:opacity-70 duration-300 min-w-fit text-blackRussian w-full"
              onClick={handleCopyToClipboard}
            >
              <CopyIcon /> Copy to Clipboard
            </button>
          </div>
        )}
        <div className="flex gap-1 justify-center text-white">
          Already have a key?{" "}
          <button className="text-mediumTurquoise" onClick={() => { NiceModal.show("SecureLoginModal"); NiceModal.hide("SecureSignupModal") }}>Login</button>
        </div>
      </div>
    </BasicModal>
  );
});

export default SecureSignupModal;
