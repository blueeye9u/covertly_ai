import toast from "react-hot-toast";
import { downloadBlob } from "./downloadUtils";

/**
 * Extracts a clean filename from a URL
 * @param url - The image URL
 */
const getFilenameFromUrl = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split("/").pop()?.split("?")[0] || "downloaded-image.jpg";
  } catch {
    return "downloaded-image.jpg";
  }
};

const getFilenameFromDisposition = (header?: string | null): string | null => {
  if (!header) return null;
  try {
    const match = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(header);
    const raw = (match?.[1] || match?.[2] || "").trim();
    if (!raw) return null;
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
};

const fetchImageBlob = async (
  imageUrl: string
): Promise<{ blob: Blob; filename: string; mime: string }> => {
  try {
    const proxyUrl = `/api/download-image?url=${encodeURIComponent(imageUrl)}`;
    const response = await fetch(proxyUrl, { credentials: "include" });
    if (!response.ok) throw new Error("Proxy fetch failed");
    const blob = await response.blob();
    const filename =
      getFilenameFromDisposition(response.headers.get("content-disposition")) ||
      getFilenameFromUrl(imageUrl);
    const mime = response.headers.get("content-type") || blob.type || "application/octet-stream";
    return { blob, filename, mime };
  } catch {
  }

  const response = await fetch(imageUrl, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch image");
  const blob = await response.blob();
  const mime = response.headers.get("content-type") || blob.type || "application/octet-stream";
  return { blob, filename: getFilenameFromUrl(imageUrl), mime };
};

const trySaveWithFSAPI = async (
  blob: Blob,
  filename: string,
  mime: string
): Promise<boolean> => {
  const showSaveFilePicker: any = (globalThis.window !== undefined && (globalThis as any).showSaveFilePicker) || undefined;
  if (typeof showSaveFilePicker !== "function") return false;

  const suggestedExt = filename.includes(".") ? `.${filename.split(".").pop()}` : "";
  const handle = await showSaveFilePicker({
    suggestedName: filename,
    types: [
      {
        description: "Image",
        accept: { [mime || "image/*"]: [suggestedExt || ".jpg"] },
      },
    ],
  });
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
  return true;
};

const downloadBlobWithAnchor = (blob: Blob, filename: string): void => {
  downloadBlob(blob, filename);
};

const isUserAbort = (err: any): boolean => {
  const name = (err?.name || "").toString();
  const msg = (err?.message || "").toString().toLowerCase();
  return (
    name === "AbortError" ||
    msg.includes("abort") ||
    msg.includes("aborted") ||
    msg.includes("cancel") ||
    msg.includes("canceled")
  );
};

/**
 * Downloads an image from a URL
 * @param imageUrl - The URL of the image to download
 */
export const downloadImage = async (imageUrl: string): Promise<void> => {
  const toastId = toast.loading("Downloading image...");
  try {
    const { blob, filename, mime } = await fetchImageBlob(imageUrl);

    const savedWithFSAPI = await trySaveWithFSAPI(blob, filename, mime);
    if (savedWithFSAPI) {
      toast.success("Image downloaded successfully!!", { id: toastId });
      return;
    }

    downloadBlobWithAnchor(blob, filename);
    toast.success("Download started. Verify completion in your browser.", { id: toastId });
  } catch (error) {
    if (isUserAbort(error)) {
      toast.error("Download is cancelled", { id: toastId });
    } else {
      toast.error("Failed to download the image.", { id: toastId });
    }
  }
};

/**
 * Copies an image from a URL to the clipboard
 * @param imageUrl - The URL of the image to copy
 */
export const copyImageToClipboard = async (imageUrl: string): Promise<void> => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Failed to fetch the image.");

    const blob = await response.blob();
    const file = new File([blob], getFilenameFromUrl(imageUrl), { type: blob.type || "image/png" });

    if (typeof ClipboardItem === "undefined") {
      throw new TypeError("ClipboardItem is not supported in this browser.");
    }

    const clipboardItem = new ClipboardItem({ [file.type]: file });
    await navigator.clipboard.write([clipboardItem]);

    toast.success("Image copied to clipboard!");
  } catch (error) {
    console.error("Error copying the image:", error);
    toast.error("Failed to copy the image.");
  }
};

/**
 * Copies an image URL to the clipboard
 * @param imageUrl - The URL of the image to copy
 */
export const copyImageLinkToClipboard = async (imageUrl: string): Promise<void> => {
  try {
    if (!navigator?.clipboard) {
      throw new Error("Clipboard API not available");
    }

    if (typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(imageUrl);
    } else if (
      typeof (navigator.clipboard as Clipboard & { write?: unknown }).write === "function" &&
      typeof ClipboardItem !== "undefined"
    ) {
      const type = "text/plain";
      const blob = new Blob([imageUrl], { type });
      await (navigator.clipboard as Clipboard & { write: (items: ClipboardItem[]) => Promise<void> }).write([
        new ClipboardItem({ [type]: blob }),
      ]);
    } else {
      throw new TypeError("Clipboard API not fully supported");
    }

    toast.success("Image link copied to clipboard!");
  } catch (err) {
    console.warn("Clipboard API fallback triggered:", err);
    try {
      if (globalThis.window !== undefined && typeof globalThis.window.prompt === "function") {
        globalThis.window.prompt("Copy the image link below:", imageUrl);
        toast.success("Image link shown for manual copy.");
      } else {
        throw new TypeError("No supported clipboard method available");
      }
    } catch (fallbackError) {
      console.error("Error copying the image link:", fallbackError);
      toast.error("Failed to copy the image link.");
    }
  }
};
