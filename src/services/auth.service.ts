// auth.service.ts

// Importing base class
import { HttpService } from "./base.service";

// Importing interfaces

import { IResponse } from "../interfaces/response";
import { IUser } from "../interfaces/user";
import { IToken } from "../interfaces/token";
import { IRegister } from "../validations/auth/registerValidation";
import { ILogin } from "../validations/auth/loginValidation";
import { IForgotPassword } from "../validations/auth/forgotPasswordValidation";
import { IResetPassword } from "../validations/auth/resetPasswordValidation";
import { IOtpVerify } from "../validations/auth/otpVerifyValidation";

class AuthService extends HttpService {
  private readonly prefix: string = "auth";

  signupHandler = (data: IRegister): Promise<IResponse> =>
    this.post(`${this.prefix}/register`, data);

  identifyHandler = (
    data: ILogin
  ): Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>> =>
    this.post(`${this.prefix}/identify`, data);

  loginHandler = (
    data: ILogin
  ): Promise<IResponse<{ token: IToken; user: IUser }>> =>
    this.post(`${this.prefix}/login`, data);

  forgotPasswordHandler = (data: IForgotPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/forgot-password`, data);

  resetPasswordHandler = (data: IResetPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/reset-password`, data);

  verifyEmail2FA = (
    data: IOtpVerify
  ): Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>> =>
    this.post(`${this.prefix}/verify-email`, data);

  resendOTPHandler = (data: IForgotPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/resend-otp`, data);

  verifyAutoRedactionPassword = (password: string): Promise<IResponse<{ success: boolean }>> =>
    this.post(`${this.prefix}/verify-auto-redaction-password`, { password });
}
export const authService = new AuthService();
