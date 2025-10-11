import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Input from "../../global/forms/Input";
import { Button } from "../../global/button/Button";
import { ILogin, loginSchema } from "../../../validations/auth/loginValidation";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { authService } from "../../../services/auth.service";
import { errorHandler } from "../../../utils/errorHandler";
import { handleAuthentication } from "../../../utils/authUtils";
import { useUser } from '../../../context/user.context';

/**
 * LoginPasswordModule component handles login functionality with email and password.
 * If an OTP token is present in the URL query params, it sets the email field with the token value.
 * On form submission, it sends a login request to the authentication service,
 * sets the authentication token and cookies upon successful login, and redirects the user to the home route.
 * @returns {JSX.Element} The JSX element representing the LoginPasswordModule component.
 */
const LoginPasswordModule = () => {
  // Next.js router hook for navigating between pages
  const router = useRouter();

  const { setUser } = useUser();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();

  // Effect hook for setting email field if OTP token is present in the URL query params
  useEffect(() => {
    const otp_token = router.query.otp_token as string;
    const setEmail = async () => {
      try {
        formik.setFieldValue("email", otp_token);
      } catch (error) {
        console.error("Failed to set email from OTP token:", error);
      }
    };
    if (otp_token) {
      setEmail();
    }
  }, [router]);

  /**
   * Function for handling login.
   * Sends a login request to the authentication service, sets the authentication token and cookies upon successful login,
   * resets the form, and redirects the user to the home route.
   * @param {ILogin} values - The login form values containing email and password.
   * @param {Function} resetForm - Function to reset the form after submission.
   * @param {Function} setFieldError - Function to set field errors in the form.
   * @returns {Promise<void>} A promise representing the login operation.
   */
  const handleLogin = async (
    values: ILogin,
    resetForm: () => void,
    setFieldError: (field: string, message: string | undefined) => void
  ) => {
    try {
      // Send login request to authentication service
      const response = await authService.loginHandler(values);

      // Use shared authentication handling
      const success = await handleAuthentication(response, {
        router,
        onSuccess: () => {
          // Reset form after successful login
          resetForm();
          setUser(response.payload.user);
        }
      });
      
      if (!success) {
        return;
      }
    } catch (error: unknown) {
      // Handle error with form field validation
      errorHandler(error, setFieldError);
    }
  };

  // Formik hook for managing form state and submission
  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnBlur: true,
    /**
     * Submit handler for the login form.
     * Calls handleLogin function with form values, resetForm, and setFieldError functions.
     * @param {ILogin} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     * @param {Function} setFieldError - Function to set field errors in the form.
     */
    onSubmit: async (values: ILogin, { resetForm, setFieldError }) => {
      handleClick(
        async () => {
          handleLogin(values, resetForm, setFieldError);
        },
        "loginPassLoading",
        null,
        true,
        4000
      );
    },
  });

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
      e.preventDefault(); // Prevent the default behavior of Enter (form submission)
    }
  };
  return (
    <>
      <div className="mb-10">
        <legend className="fs-32 mb-2 text-center font-semibold dark:text-white">
          Welcome!
        </legend>

        <p className="text-center text-sm dark:text-white">
          Enter your Covertly AI password for{" "}
          <span className="block">{router.query.otp_token ?? ""}</span>
        </p>
      </div>

      <div className="form-group relative mb-2">
        <Input
          type="password"
          name="password"
          formik={formik}
          onKeyDown={handleInputKeyDown}
          label={"Enter Password"}
          placeholder={"Enter Password"}
          className="text-blackrussian !pr-[50px]"
        />
      </div>
      <div className="form-group mb-8 flex items-center justify-end">
        <Link href="/forgot-password" className="text-sm text-black dark:!text-white">
          Forgot Password?
        </Link>
      </div>

      <div className="form-group mb-8 sm:mb-10">
        <Button
          size="lg"
          onClick={formik.handleSubmit}
          color="primary"
          isLoading={loadingStates["loginPassLoading"]}
          disabled={loadingStates["loginPassLoading"]}
          className="w-full"
        >
          Login
        </Button>
      </div>
      {/* <div className="continueWith form-group">
        <span>
          or continue with
        </span>
      </div>
      <SocialAuth /> */}
    </>
  );
};

export default LoginPasswordModule;
