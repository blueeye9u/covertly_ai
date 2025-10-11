import React from "react";
import { FormikProps } from "formik";
import Input from "../../global/forms/Input";
import { Button } from "../../global/button/Button";
import SocialAuth from "../../socialAuth";

interface PasswordFormProps {
  formik: FormikProps<any>;
  loadingStates: Record<string, boolean>;
  heading: string;
  buttonText?: string;
}

/**
 * Shared PasswordForm component for password-related forms (signup, password setup, etc.)
 * It provides a consistent UI and behavior for password entry forms
 * @param {PasswordFormProps} props - Component props
 * @returns {JSX.Element} The JSX element representing the PasswordForm component
 */
const PasswordForm = ({
  formik,
  loadingStates,
  heading,
  buttonText = "Sign Up"
}: PasswordFormProps): JSX.Element => {
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
      e.preventDefault();
    }
  };

  return (
    <>
      <legend className="fs-32 mb-10 text-center font-semibold dark:text-white">
        {heading}
      </legend>
      <div className="mb-8 flex flex-col gap-4">
        <Input
          name="password"
          type="password"
          onKeyDown={handleInputKeyDown}
          formik={formik}
          label={"Enter Password"}
          placeholder={"Enter Password"}
          className="text-blackrussian !pr-[50px]"
        />
        <Input
          type="password"
          formik={formik}
          onKeyDown={handleInputKeyDown}
          name="confirm_password"
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
          className="text-blackrussian !pr-[50px]"
        />
      </div>

      <div className="form-group mb-8 sm:mb-10">
        <Button
          size="lg"
          color="primary"
          className="w-full"
          disabled={loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit}
          type="button"
        >
          {buttonText}
        </Button>
      </div>
      <div className="continueWith form-group">
        <span>
          or continue with
        </span>
      </div>
      <SocialAuth />
    </>
  );
};

export default PasswordForm;