import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import {
  IRegister,
  registerSchema,
} from "../../../validations/auth/registerValidation";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { authService } from "../../../services/auth.service";
import { errorHandler } from "../../../utils/errorHandler";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import PasswordForm from "../PasswordForm";

/**
 * SignupModule component handles the sign-up process.
 * It allows users to register with their full name, email, and password.
 * The component includes form validation and submission functionality.
 * @returns {JSX.Element} The JSX element representing the SignupModule component.
 */
const SignupModule = (): JSX.Element => {
  // Next.js router query object
  const { query } = useRouter();
  const router = useRouter();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();

  // Formik hook for managing form state and validation
  const formik = useFormik<IRegister>({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerSchema,
    validateOnBlur: true,
    /**
     * Submit handler for the sign-up form.
     * @param {IRegister} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     * @param {Function} setFieldError - Function to set error messages for form fields.
     */
    onSubmit: async (values: IRegister, { resetForm, setFieldError }) => {
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
          await authService.signupHandler(values);
          // Reset form after successful submission
          resetForm();
          // Display sign-up success modal
          // NiceModal.show("signUp", { email: values.email });
          let route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as Function;

          router.push(route(values.email));
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
    <div>
      <PasswordForm
        formik={formik}
        loadingStates={loadingStates}
        heading="Let's Create Account"
      />
    </div>
  );
};

export default SignupModule;