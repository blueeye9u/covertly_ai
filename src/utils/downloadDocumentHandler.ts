import { downloadBlob } from "./downloadUtils";

/**
 * Downloads a PDF file from a given URL and saves it locally with the specified title and extension.
 * @param {string} pdfUrl The URL of the PDF file to be downloaded.
 * @param {string} title The title to be used for the downloaded file.
 * @param {string} [extension=".pdf"] The file extension to be used for the downloaded file (default is ".pdf").
 * @returns {Promise<void>} A Promise that resolves once the download is complete.
 * @throws {Error} If the download fails or encounters an error.
 */
export const downloadDocumentHandler = async (
  pdfUrl: string,
  title: string,
  extension: string = ".pdf"
): Promise<void> => {
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error("Failed to download PDF");
    }
    const blob = await response.blob();
    downloadBlob(blob, title + extension);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    // Handle error
    throw error;
  }
};
