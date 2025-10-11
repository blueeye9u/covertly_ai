import React from "react";
import Input from "../../../components/global/forms/Input";
import { Button } from "../../../components/global/button/Button";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import {
  IUpdatePassword,
  updatePasswordSchema,
  createPasswordSchema,
} from "../../../validations/updatePasswordValidation";
import { useFormik } from "formik";
import { userService } from "../../../services/user.service";
import { errorHandler } from "../../../utils/errorHandler";
import { toast } from "react-hot-toast";
import useLoggedInUser from "../../../hooks/useLoggedInUser";

const PasswordSettings = () => {
  const [User, isLoading] = useLoggedInUser();
  const [handleClick, loadingStates] = useDebouncedClick();

  const formik = useFormik<IUpdatePassword>({
    initialValues: {
      oldPassword: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: (!isLoading && User?.hasPassword) ? updatePasswordSchema : createPasswordSchema,
    validateOnBlur: true,

    onSubmit: async (values, { resetForm, setFieldError }) => {
      handleClick(async () => {
        try {
          const response = await userService.updatePasswordHandler(values);
          resetForm();
          toast.success(response?.message);
        } catch (error: unknown) {
          errorHandler(error, setFieldError);
        }
      }, "loading");
    },
  });

  return (
    <>
      <div className="password__settings flex grow flex-col mb-10">
        <div className="mb-8">
          <h5 className="fs-20 font-medium">Change Password</h5>
          <p className="text-sm text-aluminium">
            To update your account password, kindly input both your current and
            new passwords below.
          </p>
        </div>
        <div className="form-group relative mb-4">
          <Input
            type="password"
            formik={formik}
            name="oldPassword"
            label={"Current Password"}
            placeholder={"Current Password"}
            className="text-blackrussian !pr-[50px]"
          />
        </div>
        <div className="form-group relative mb-4">
          <Input
            type="password"
            formik={formik}
            name="password"
            label={"New Password"}
            placeholder={"New Password"}
            className="text-blackrussian !pr-[50px]"
          />
        </div>
        <div className="form-group relative mb-4">
          <Input
            type="password"
            formik={formik}
            name="confirm_password"
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            className="text-blackrussian !pr-[50px]"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="lg"
          className="flex-none"
          disabled={isLoading || loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit}
        >
          Update Password
        </Button>
      </div>
    </>
  );
};

export default PasswordSettings;
