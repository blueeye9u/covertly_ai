/**
 * Safely strips HTML tags from a string using DOM methods.
 * @param html - The HTML string to clean.
 * @returns A plain text string with all HTML tags removed.
 */
export function stripHtmlTags(html: string): string {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent ?? div.innerText ?? "";
}