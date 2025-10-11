import React from "react";
import { useFormik } from "formik";
import NiceModal from "@ebay/nice-modal-react";
import Input from "../../global/forms/Input";
import { Button } from "../../global/button/Button";
import { useRouter } from "next/navigation";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { errorHandler } from "../../../utils/errorHandler";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import Steps from "../../../enums/steps.enum";
import { authService } from "../../../services/auth.service";
import SocialAuth from "../../socialAuth";
import {
  IIndentify,
  identifySchema,
} from "../../../validations/auth/identifyValidation";
import { KeyIcon, RightIcon } from "../../../svgs/svg";
import { toast } from 'react-hot-toast';
import AuthInfoSection from '../common/AuthInfoSection';

interface IProps {
  signUp?: boolean;
}

/**
 * LoginModule component handles the login functionality.
 * It allows users to identify themselves using their email address.
 * After identification, it redirects users to appropriate routes based on the next step in the authentication process.
 * @returns {JSX.Element} The JSX element representing the LoginModule component.
 */
const LoginModule = ({signUp = false} : IProps) => {
  const router = useRouter();
  const [handleClick, loadingStates] = useDebouncedClick();

  /**
   * Function for handling user login.
   * Sends request to authentication service to identify user using provided email address.
   * Redirects user to appropriate routes based on the next step in the authentication process.
   * @param {IIndentify} values - User identification values (e.g., email).
   * @param {Function} setFieldError - Function to set form field errors.
   * @returns {Promise<void>} A promise representing the login operation.
   */
  const handleLogin = async (
    values: IIndentify,
    setFieldError: (field: string, message: string | undefined) => void
  ): Promise<void> => {
    try {
      const response = await authService.identifyHandler(values);
      const next_step = response?.payload?.nextStep.toString();
      // Determine the route based on the next step
      let route = UN_AUTHENTICATED_ROUTES.SIGNUP_PASSWORD as Function;
      if (next_step === Steps.USER_REGISTER) {
        route = UN_AUTHENTICATED_ROUTES.SIGNUP_PASSWORD as Function;
      } else if (next_step === Steps.VERIFY_EMAIL) {
        route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as Function;
      } else if (next_step === Steps.SET_PASSWORD) {
        route = UN_AUTHENTICATED_ROUTES.LOGIN_PASSWORD as Function;
      } else if (next_step === Steps.EMAIL_LOGIN_NOT_AVAILABLE) {
        toast.error("Email Login Not Available for This Account. Please use SSO to log in.");
        return;
      }
      router.push(route(values.email));
    } catch (error: unknown) {
      errorHandler(error, setFieldError);
    }
  };
  // Formik hook for managing form state and validation
  const formik = useFormik<IIndentify>({
    initialValues: {
      email: "",
    },
    validationSchema: identifySchema,
    validateOnBlur: true,
    /**
     * Submit handler for the login form.
     * @param {IIndentify} values - Form values.
     * @param {Function} setFieldError - Function to set form field errors.
     */
    onSubmit: async (values: IIndentify, { setFieldError }) => {
      handleClick(async () => {
        handleLogin(values, setFieldError);
      }, "loginLoading");
    },
  });

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
      e.preventDefault(); // Prevent the default behavior of Enter (form submission)
    } 
  };

  const title = signUp ? "There are 3 ways to create your Covertly account." : "There are 3 ways to sign in to your Covertly account.";
  const secretkeyLabel = signUp ? "Secret Key Sign Up" : "Secret Key Sign In";
  const emailLabel = signUp ? "For password-based sign up, use E-mail" : "For password-based login, use E-mail";
  return (
    <>
      <div className="mb-8">
        <legend className="fs-32 mb-2 text-center font-Outfit font-semibold text-black dark:text-athensgray">
          Welcome!
        </legend>
        <p className="text-center text-2xl dark:text-frenchgray">{title}</p>
      </div>
      <div className="flex flex-col gap-4">
        <SocialAuth/>
        <AuthInfoSection
          title={emailLabel}
        >
          <div className="flex w-full justify-between">
            <div className="form-group w-full z-0">
              <Input
                type="email"
                onKeyDown={handleInputKeyDown}
                name="email"
                formik={formik}
                placeholder={"Email"}
                label="Email"
              />
            </div>
            <div className="max-h-[50px] flex -ml-2 z-10 max-w-[50px]">
              <Button
                size="lg"
                onClick={formik.handleSubmit}
                color="primary"
                isLoading={loadingStates["loginLoading"]}
                disabled={loadingStates["loginLoading"]}
                className="w-full !px-[15px]"
              >
                <RightIcon/>
              </Button>
            </div>
          </div>
        </AuthInfoSection>
        <AuthInfoSection
          title={"For maximum privacy, use Secret Key"}
          tooltip={"Your unique 18-digit key is a cryptographic secret known only to you. We only store a double-hashed version of it, we have no way to know what a user is doing in our network."}
        >
          <Button onClick={() => {
            NiceModal.show("SecureLoginModal")
          }} size="lg" className="!w-full !py-[11px] !px-4 !text-sm !justify-between">
            <p className="flex gap-2 items-center">
              <KeyIcon/>
              {secretkeyLabel}
            </p>
            <span><RightIcon/></span>
          </Button>
        </AuthInfoSection>
      </div>
    </>
  );
};

export default LoginModule;
