import { HttpService } from "./base.service";

import { IResponse } from "../interfaces/response";
import { IUser } from "../interfaces/user";
import { IToken } from "../interfaces/token";
import { IAccountKey } from "../interfaces/account-key";

class AccountKeyAuthService extends HttpService {
  private readonly prefix: string = "account-key-auth";

  generateAccountKey = (): Promise<IResponse<IAccountKey>> =>
    this.post(`${this.prefix}/generate`);

  loginWithAccountKey = (accountKey: string): Promise<IResponse<{ token: IToken; user: IUser, isFirstTimeUser: boolean }>> =>
    this.post(`${this.prefix}/login`, { accountKey });
}
export const socialAuthService = new AccountKeyAuthService();
