import { EGptModels } from "../enums/gpt-models.enum";

export interface ISendMessage {
  content?: string;
  model?: EGptModels | null;
  chat: string | null;
}

export interface IUploadFiles {
  files: File[];
  chat: string | null;
}

export interface IDeleteUnprocessedFile { 
  chat: string, 
  fileIndex: number, 
}
