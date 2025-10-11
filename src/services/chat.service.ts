// social-auth.service.ts

// Importing base class
import { HttpService } from "./base.service";
import { IShareChat } from "../interfaces/chat";

// Importing interfaces
import { IResponse } from "../interfaces/response";

class ChatService extends HttpService {
  private readonly prefix: string = "chat";

  getChat = (title = "", model = "", chatType = "", signal?: AbortSignal): Promise<IResponse> => {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (model) params.append('model', model);
    if (chatType) params.append('chatType', chatType);
    
    return this.get(`${this.prefix}?${params.toString()}`, undefined, signal);
  };

  getChatById = (id: string): Promise<IResponse> =>
    this.get(`${this.prefix}/${id}`);

  deleteChatById = (id: string): Promise<IResponse> =>
    this.delete(`${this.prefix}/${id}`);

  updateChatById = (id: string, body: { chat: string; title: string }): Promise<IResponse> =>
    this.put(`${this.prefix}/update/${id}`, body);

  deleteChatAll = (): Promise<IResponse> =>
    this.delete(`${this.prefix}/`);

  deleteNormalChatAll = (): Promise<IResponse> =>
    this.delete(`${this.prefix}/?type=normal`);

  deleteDeepSearchChatAll = (): Promise<IResponse> =>
    this.delete(`${this.prefix}/?type=deep-search`);

  shareChat = (data: IShareChat): Promise<IResponse<{ shareLink: string }>> =>
    this.put(`${this.prefix}/share`, data);

  getSharedChatById = (id: string): Promise<IResponse> =>
    this.get(`${this.prefix}/share/${id}`);
}
export const chatService = new ChatService();
