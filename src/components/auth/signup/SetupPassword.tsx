import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { authService } from "../../../services/auth.service";
import { errorHandler } from "../../../utils/errorHandler";
import {
  ISetupPassword,
  setupPasswordSchema,
} from "../../../validations/auth/setupPassword";
import { EUN_ROUTES } from "../../../enums/routes.enum";
import PasswordForm from "../PasswordForm";

/**
 * SetupPasswordModule component handles the sign-up process.
 * It allows users to register with their full name, email, and password.
 * The component includes form validation and submission functionality.
 * @returns {JSX.Element} The JSX element representing the SetupPasswordModule component.
 */
const SetupPasswordModule = (): JSX.Element => {
  // Next.js router query object
  const { query } = useRouter();

  // Next.js router hook for navigation
  const router = useRouter();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();

  // Formik hook for managing form state and validation
  const formik = useFormik<ISetupPassword>({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: setupPasswordSchema,
    validateOnBlur: true,
    /**
     * Submit handler for the sign-up form.
     * @param {IRegister} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     * @param {Function} setFieldError - Function to set error messages for form fields.
     */
    onSubmit: async (values: ISetupPassword, { resetForm, setFieldError }) => {
      // Extract email from query parameters
      let formatEmail = query.otp_token as string;
      if (!formatEmail) {
        toast.error("Email is required");
        return;
      }

      // Handle form submission using debounced click handler
      handleClick(async () => {
        try {
          // Call authentication service to sign up user
          await authService.resetPasswordHandler(values);
          // Reset form after successful submission
          resetForm();
          router.push(EUN_ROUTES.LOGIN);
        } catch (error: unknown) {
          // Handle form submission error
          errorHandler(error, setFieldError);
        }
      }, "loading");
    },
  });

  // Effect hook to pre-fill email field if provided in query parameters
  useEffect(() => {
    if (query.otp_token) {
      formik.setFieldValue("email", query.otp_token as string);
    }
  }, [query]);

  return (
    <PasswordForm
      formik={formik}
      loadingStates={loadingStates}
      heading="Create password"
    />
  );
};

export default SetupPasswordModule;