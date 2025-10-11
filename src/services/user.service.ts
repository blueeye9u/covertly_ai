// auth.service.ts

// Importing base class
import { HttpService } from "./base.service";

// Importing interfaces

import { IResponse } from "../interfaces/response";
import { IUser } from "../interfaces/user";
import { IUpdateProfile } from "../validations/updateProfileValidation";
import { IUpdatePassword } from "../validations/updatePasswordValidation";
import { IUploadDocument } from "../validations/uploadDocumentValidation";
import { IUpdateExpiry } from "../validations/imageDeletionValidation";

class UserService extends HttpService {
  private readonly prefix: string = "user";

  /**
   * Retrieves the user's profile information.
   * @returns A promise that resolves to the response containing the user profile.
   */
  getProfileHandler = (): Promise<IResponse<{ user: IUser }>> =>
    this.get(`${this.prefix}`);

  /**
   * Updates the user's profile information.
   * @param data - The updated profile data.
   * @returns A promise that resolves to the response indicating success or failure.
   */
  updateProfileHandler = (data: IUpdateProfile): Promise<IResponse> =>
    this.put(`${this.prefix}`, data);

  /**
   * Updates the user's password.
   * @param data - The updated password data.
   * @returns A promise that resolves to the response indicating success or failure.
   */
  updatePasswordHandler = (data: IUpdatePassword): Promise<IResponse> =>
    this.put(`${this.prefix}/password`, data);

  /**
   * Updates the user's profile image.
   * @param data - The updated profile image data.
   * @returns A promise that resolves to the response indicating success or failure.
   */
  updateProfileImageHandler = (
    data: IUploadDocument
  ): Promise<IResponse<{ user: IUser }>> =>
    this.put(`${this.prefix}/avatar`, data);

    updateImageDeletion = (
      data: IUpdateExpiry
    ): Promise<IResponse> => this.put(`${this.prefix}/imagesDeletion`, data);

  updateChatDeletionSettings = (
    data: { chatDeletionDays: number }
  ): Promise<IResponse> => this.put(`${this.prefix}/chatDeletion`, data);

  deleteAccountHandler = (): Promise<IResponse> =>
    this.delete(`${this.prefix}/deleteAccount`);
}
export const userService = new UserService();
