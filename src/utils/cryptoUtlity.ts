class CryptoUtility {
  private encryptionKey: CryptoKey | Uint8Array | null = null;
  private initializationPromise: Promise<void> | null = null;

  private async initialize(): Promise<void> {
    try {
      if (globalThis.window === undefined) {
        const { randomBytes } = await import("node:crypto");
        this.encryptionKey = new Uint8Array(randomBytes(32).buffer);
      } else {
        this.encryptionKey = await globalThis.window.crypto.subtle.generateKey(
          {
            name: "AES-GCM",
            length: 256,
          },
          true,
          ["encrypt", "decrypt"]
        );
      }
    } catch (error) {
      console.error("Key generation failed:", error);
      throw new Error("Failed to initialize encryption key");
    }
  }

  private async ensureInitialized(): Promise<void> {
    this.initializationPromise ??= this.initialize();
    await this.initializationPromise;
  }

  async encryptData(data: string): Promise<string> {
    await this.ensureInitialized();

    if (!this.encryptionKey) {
      throw new TypeError("Encryption key not available");
    }

    if (globalThis.window === undefined) {
      throw new TypeError("Browser environment required for encryption");
    }

    try {
      const dataBuffer = new TextEncoder().encode(data);
      const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
      const encryptedBuffer = await globalThis.window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
        },
        this.encryptionKey as CryptoKey,
        dataBuffer
      );

      // Alternative to spread operator that works in all targets
      const encryptedArray = new Uint8Array(encryptedBuffer);
      let binaryString = '';
      for (const byte of encryptedArray) {
        binaryString += String.fromCodePoint(byte);
      }
      return btoa(binaryString);
    } catch (error) {
      console.error("Encryption failed:", error);
      throw new Error("Encryption failed");
    }
  }

  async decryptData(encryptedData: string): Promise<string> {
    await this.ensureInitialized();

    if (!this.encryptionKey) {
      throw new Error("Encryption key not available");
    }

    if (globalThis.window === undefined) {
      throw new TypeError("Browser environment required for decryption");
    }

    try {
      const binaryString = atob(encryptedData);
      const encryptedBuffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        encryptedBuffer[i] = binaryString.codePointAt(i) ?? 0;
      }

      const decryptedBuffer = await globalThis.window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: new Uint8Array(12),
        },
        this.encryptionKey as CryptoKey,
        encryptedBuffer
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      console.error("Decryption failed:", error);
      throw new Error("Decryption failed");
    }
  }
}

export const cryptoUtility = new CryptoUtility();