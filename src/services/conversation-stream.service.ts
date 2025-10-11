import { io, Socket } from "socket.io-client";

class ConversationStreamService {
  private socket: Socket | null = null;
  private isInitialized = false;

  public async initializeSocket(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        transports: ['websocket'],
      });

      this.setupListeners();
      this.isInitialized = true;
    } catch (error) {
      console.error("Error initializing socket:", error);
      throw error;
    }
  }

  private async ensureConnection(): Promise<void> {
    if (!this.isInitialized) {
      await this.initializeSocket();
    }

    if (!this.socket) {
      throw new Error("Socket connection failed");
    }
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }

  public async subscribeToChatStream(
    chatStreamId: string,
    callback: (data: any) => void
  ): Promise<void> {
    await this.ensureConnection();
    this.socket!.on(chatStreamId, callback);
  }

  public async unsubscribeFromChatStream(chatStreamId: string): Promise<void> {
    await this.ensureConnection();
    this.socket!.off(chatStreamId);
  }

  public async stopChatStream(chatStreamId: string): Promise<void> {
    await this.ensureConnection();
    this.socket!.emit('stop-generation', { chatStreamId });
  }

  public async disconnect(): Promise<void> {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isInitialized = false;
    }
  }

  public async isConnected(): Promise<boolean> {
    try {
      await this.ensureConnection();
      return this.socket?.connected ?? false;
    } catch {
      return false;
    }
  }
}

let legacyInstance: ConversationStreamService | null = null;

export function getConversationStreamService(): ConversationStreamService {
  if (!legacyInstance) {
    legacyInstance = new ConversationStreamService();
    // Note: This won't wait for initialization
    legacyInstance.initializeSocket().catch(console.error);
  }
  return legacyInstance;
}