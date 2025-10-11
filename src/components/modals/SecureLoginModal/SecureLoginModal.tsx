import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Link from "next/link";
import Image from "next/image";
import SecureKey from "../../SecureKey";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import { useTheme } from "../../../context/themeContext";
import { images } from "../../../assets/images";
import { socialAuthService } from "../../../services/account-key-auth-service";
import { ErrorIcon } from "../../../svgs/svg";
import { useUser } from '../../../context/user.context';

const SecureLoginModal = NiceModal.create((): JSX.Element => {
  const [error, setError] = useState("");
  const router = useRouter();
  const modal = useModal();
  const [value, setValue] = useState("");
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  useEffect(() => {
    setError("");
    setValue("");
    setLoading(false);
  }, [modal.visible]);

  const handleError = (error: string) => {
    setError(error);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await socialAuthService.loginWithAccountKey(value);
      
      // Import here to avoid circular dependencies
      const { handleAuthentication } = await import("../../../utils/authUtils");
      
      // Use shared utility for authentication
      const success = await handleAuthentication(res, {
        router,
        onSuccess: () => {
          setValue("");
          modal.hide();
          setUser(res.payload.user);
        }
      });
      
      if (!success) {
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status == "404") {
        setError("Invalid key. Please try again.");
        return;
      }
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="flex w-full flex-col items-center rounded-lg bg-whiteSmoke dark:bg-blackRussian2 p-8 pt-10 sm:w-[506px]">
        <strong className="flex-shrink-0 mb-10">
          <Link href={"#"} className="inline-block">
            <Image src={isDarkMode ? images.lightLogo : images.logo} alt="logo" width={139} height={44} />
          </Link>
        </strong>
        <div className="grow flex flex-col">
          <h4 className="mb-2">Welcome!</h4>
          <p className="text-sm dark:text-ghost mb-8">Please provide your Covertly key below.</p>

          <div className="sm:w-[378px] mx-auto">
            <div className="dark:bg-ebony3 bg-linkWater py-3 rounded-t-md">Enter your Covertly Key</div>
            <SecureKey handleChange={handleChange} value={value} handleError={handleError} error={error} />
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
            <Button isLoading={loading} disabled={!value || loading} size="lg" className="btn w-full mb-8 mt-6" onClick={handleLogin}>Login</Button>

            <div className="flex gap-1 justify-center dark:text-white mb-10">
              Don’t have a key?{" "}
              <button className="text-mediumTurquoise" onClick={() => { NiceModal.show("SecureSignupModal"); NiceModal.hide("SecureLoginModal") }}> {""} Create a new key</button>
            </div>

            <p className="mt-4 text-center text-sm text-black dark:text-white">
              By signing in or creating an account, you agree with our{" "}
              <Link href={"/terms-and-conditions"} className="text-cornflowerBlue">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href={"/privacy-policy"} className="text-cornflowerBlue">
                Privacy Statement
              </Link>
            </p>
          </div>
        </div>
      </div>
    </BasicModal>
  );
});

export default SecureLoginModal;
