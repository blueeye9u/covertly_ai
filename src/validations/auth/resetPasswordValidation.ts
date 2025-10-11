import * as yup from "yup";
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .matches(
      /^(?=.*[-!$%^&*()_+|~=`{}[\]:;"'<>,.?/@#])/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export interface IResetPassword
  extends yup.InferType<typeof resetPasswordSchema> {
  otp?: string;
  email?: string;
}
