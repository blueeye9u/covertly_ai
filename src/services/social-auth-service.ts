// social-auth.service.ts

// Importing base class
import { HttpService } from "./base.service";

// Importing interfaces
import { IResponse } from "../interfaces/response";
import { IUser } from "../interfaces/user";
import { IToken } from "../interfaces/token";
import { IAccountLink } from "../validations/auth/accountLinkValidation";

class SocialAuthService extends HttpService {
  private readonly prefix: string = "social-auth";

  linkAccount = (
    data: IAccountLink
  ): Promise<IResponse<{ token: IToken; user: IUser; nextStep: string }>> =>
    this.post(`${this.prefix}/link-accounts`, data);
}
export const socialAuthService = new SocialAuthService();
