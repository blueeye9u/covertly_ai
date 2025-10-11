export interface IChatMessage {
  role?: "user" | "system";
  content?: string;
  timestamp?: number;
  createdAt?: string;
  _id?: string;
  botimg?: string;
  loading?: boolean;
  userMessageId?: string;
  title: string;
}
