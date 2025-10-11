/**
 * Capitalizes each word in a given text that is separated by underscores.
 * For example, "DOCUMENT_GENERATED" will be transformed to "Document Generated".
 *
 * @param {string} text - The text to capitalize.
 * @returns {string} The capitalized text.
 */
export const capitalizeTextHandler = (text: string): string => {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
