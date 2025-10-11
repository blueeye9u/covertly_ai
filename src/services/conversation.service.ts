// social-auth.service.ts

// Importing base class
import { HttpService } from "./base.service";

import { ISendMessage, IDeleteUnprocessedFile } from "../interfaces/send-message";

class ConversationService extends HttpService {
  private readonly prefix: string = "conversations";

  create = (data: ISendMessage): any => this.post(`${this.prefix}`, data);

  uploadPDFFiles = (data: any): any => this.post(`${this.prefix}/upload-pdf`, data);

  uploadAudioFiles = (data: any): any => this.post(`${this.prefix}/upload-audio`, data);

  uploadImageFiles = (data: any): any => this.post(`${this.prefix}/upload-image`, data);

  regenerate = (data: ISendMessage & { conversation: string | undefined }) =>
    this.post(`${this.prefix}/regenerate`, data);

  update = (data: ISendMessage & { conversation: string | undefined }) =>
    this.put(`${this.prefix}/`, data);

  deleteUnprocessedFile = (data: IDeleteUnprocessedFile): any => this.delete(`${this.prefix}/delete-unprocessed-file`, data);

  createDeepResearchConversation = (data: any): any => this.post(`${this.prefix}/deep-research`, data);

  getResearchReportData = (conversationId: string): any => this.post(`${this.prefix}/research-report`, { conversationId });

  getChainOfThoughtReportData = (messageId: string): any => this.post(`${this.prefix}/chain-of-thought-report`, { messageId });
}
export const conversationService = new ConversationService();
