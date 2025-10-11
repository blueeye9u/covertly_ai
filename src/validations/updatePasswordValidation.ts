import * as yup from "yup";
export const updatePasswordSchema = yup.object({
  oldPassword: yup.string().required("Current Password is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .matches(
      /^(?=.*[-!$%^&*()_+|~=`{}[\]:;"'<>,.?/@#])/,
      "Password must contain at least one special character"
    )
    .required("New Password is required")
    .test(
      "not-equal-to-old-password",
      "New password must be different from the current password",
      function (value) {
        return value !== this.parent.oldPassword;
      }
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const createPasswordSchema = yup.object({
  oldPassword: yup.string(),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .matches(
      /^(?=.*[-!$%^&*()_+|~=`{}[\]:;"'<>,.?/@#])/,
      "Password must contain at least one special character"
    )
    .required("New Password is required")
    .test(
      "not-equal-to-old-password",
      "New password must be different from the current password",
      function (value) {
        return value !== this.parent.oldPassword;
      }
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export interface ICreatePassword
  extends yup.InferType<typeof createPasswordSchema> {}

export interface IUpdatePassword
  extends yup.InferType<typeof updatePasswordSchema> {}
