// Shared utility functions for markdown processing and HTML manipulation

export function decodeHtmlEntities(input: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<!doctype html><body>${input}`, "text/html");
  return doc.body.textContent || "";
}

export function sanitizeHtmlTags(input: string): string {
  let sanitized = input;
  let previousLength;
  do {
    previousLength = sanitized.length;
    sanitized = sanitized.replaceAll(/<[^<>]*?>/g, "");
  } while (sanitized.length !== previousLength && sanitized.includes('<'));
  return sanitized;
}

export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
