import pdfMake from "pdfmake/build/pdfmake";
import htmlToPdfMake from "html-to-pdfmake";
import showdown from 'showdown';
import { BOLD_GARMOND_FONT_64, GARMOND_FONT_64, ITALIC_GARMOND_FONT_64 } from "../assets/fonts";
import { images } from "../assets/images";
import { Chat_Models_Display_data } from "../constants/chat-models-data";

const PDF_FILENAME_MAX_LENGTH = 80 as const;
const PDF_EXTENSION = ".pdf" as const;
// Removed arbitrary truncation boundary ratio; truncation will respect natural word boundaries.

pdfMake.vfs = {
  'garamond.ttf': GARMOND_FONT_64,
  'garamond-bold.ttf': BOLD_GARMOND_FONT_64,
  'garamond-italic.ttf': ITALIC_GARMOND_FONT_64,
};

pdfMake.fonts = {
  Garamond: {
    normal: 'garamond.ttf',
    bold: 'garamond-bold.ttf',
    italics: 'garamond-italic.ttf',
    bolditalics: 'garamond-italic.ttf',
  },
};

function convertMarkdownToHTML(markdown: any) {
  const converter = new showdown.Converter({ tables: true });
  return converter.makeHtml(markdown);
}

function imageToBase64WithCircle(url: any) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);

        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('Failed to get 2D context'));
      }
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

async function imageUrlToBase64(url: string): Promise<string> {
  if (!url) throw new Error('Empty image url');
  if (url.startsWith('data:')) return url;

  // Try via fetch -> blob -> FileReader first (more reliable across CORS setups)
  try {
    const proxied = `/api/image-base64?url=${encodeURIComponent(url)}`;
    const resp = await fetch(proxied, { method: 'GET' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const { dataUrl } = await resp.json();
    if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) return dataUrl;
    throw new Error('Invalid response');
  } catch {
    // Fallback to drawing on a canvas if fetch is blocked by CORS
    return await new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Failed to get 2D context'));
          ctx.drawImage(img, 0, 0);
          const data = canvas.toDataURL('image/png');
          resolve(data);
        } catch (e: unknown) {
          const error = e instanceof Error ? e : new Error(String(e));
          reject(error);
        }
      };
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      const cacheBust = url.includes('?') ? `&cb=${Date.now()}` : `?cb=${Date.now()}`;
      img.src = `${url}${cacheBust}`;
    });
  }
}

function buildPdfFileName(messages: any[], provided?: string): string {
  const now = new Date();
  const datePrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const stripPdfExtension = (raw: string) => raw.toLowerCase().endsWith(PDF_EXTENSION)
    ? raw.slice(0, -PDF_EXTENSION.length)
    : raw;

  const toTitleCase = (text: string) =>
    text
      .toLowerCase()
      .replaceAll(/(^|[\s-_])([a-z])/g, (m, p1, p2) => `${p1}${p2.toUpperCase()}`)
      .trim();

  const sanitizeSegment = (raw: string) => {
    let str = stripPdfExtension(raw)
      .normalize('NFKD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      .replaceAll('&', 'and')
      .replaceAll(/[<>:"/\\|?*]+/g, '') 
      .replaceAll(/\s+/g, ' ') 
      .replaceAll(/\.+$/g, '') 
      .trim();

    const reserved = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;
    if (reserved.test(str)) str = `${str}_`;

    str = toTitleCase(str)
      .replaceAll(/\s*[-_]{2,}\s*/g, ' - ')
      .replaceAll(/\s{2,}/g, ' ')
      .trim();
    return str;
  };

  const truncateAtBoundary = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const slice = text.slice(0, maxLength);
    const separators = [' ', '-', '_', '.', ',', ';', ':', '—'];
    let lastSep = -1;
    for (const sep of separators) {
      const idx = slice.lastIndexOf(sep);
      if (idx > lastSep) lastSep = idx;
    }
    const truncated = lastSep >= 0 ? slice.slice(0, lastSep) : slice;
    return truncated.replaceAll(/[\s\-_.:,;—]+$/g, '');
  };

  const extractTitleFromMessages = (msgs: any[]) => {
    for (const message of msgs || []) {
      const content: string | undefined = typeof message?.content === 'string' ? message.content : undefined;
      if (!content) continue;
      const lines = content.split('\n').map((l: string) => l.trim()).filter(Boolean);
      const heading = lines.find((l: string) => /^#{1,6}\s+/.test(l));
      if (heading) return heading.replace(/^#{1,6}\s+/, '');
      const candidate = lines.find((l: string) => l.length > 3);
      if (candidate) return candidate;
    }
    return '';
  };

  let rawBase = (provided ?? '').trim();
  if (!rawBase) rawBase = extractTitleFromMessages(messages);
  if (!rawBase) rawBase = 'Covertly Chat';

  const title = sanitizeSegment(rawBase) || 'Covertly Chat';

  const maxLengthWithoutExt = PDF_FILENAME_MAX_LENGTH - PDF_EXTENSION.length;
  const separator = ' - ';
  const staticPrefix = `${datePrefix}${separator}`;
  const maxTitleLength = Math.max(8, maxLengthWithoutExt - staticPrefix.length); 
  const truncatedTitle = truncateAtBoundary(title, maxTitleLength);
  const base = `${staticPrefix}${truncatedTitle}`.trim();

  return `${base}${PDF_EXTENSION}`;
}

export const handlePdf = (conversationMessages: any, preferredFileName?: string, chatFiles?: any[]) => {
    const handlePdfDownload = async () => {
        const pdfContent = await Promise.all(
          conversationMessages.map(async (item:any) => {
            return createPdfTableRow(item, chatFiles ?? []);
          })
        );
      
        const docDefinition:any = {
          content: pdfContent,
          styles: {
            header: {
              fontSize: 14,
              bold: true,
              margin: [0, 0, 0, 0],
              alignment: "top",
            },
            paragraph: {
              fontSize: 14,
              lineHeight: 1.6,
            },
          },
          defaultStyle: {
            font: "Garamond", 
            fontFallback: 'sans-serif',
          },
        };
        const computedFileName = buildPdfFileName(conversationMessages, preferredFileName);
        pdfMake.createPdf(docDefinition).download(computedFileName);
      };

      const getUserDisplayInfo = (item: any) => {
        const chatImg = item.role === "user" ? images.avatar : "assets/images/chat/covertly-emblem_profile_dark_mode.svg";
        let userName = item.role === "user" ? "Anonymous" : "Covertly AI";

        if (item.role !== "user") {
          if (item?.isSuperResponse) {
            userName = "Covertly AI (Super Response)";
          } else if (item.model) {
            const modelDisplayData = Chat_Models_Display_data.find((model: any) => model.key === item.model);
            if (modelDisplayData) {
              userName = `Covertly AI (${modelDisplayData.name})`;
            }
          }
        }

        return { chatImg, userName };
      };

      const processHtmlContent = (content: string) => {
        let listCounter = 1;

        const rawHtml = convertMarkdownToHTML(content);
        const adjustedHtml = rawHtml.replaceAll(/<ol>([\s\S]*?)<\/ol>/g, (match, content) => {
          let updatedContent = content;

          updatedContent = updatedContent.replaceAll(
            /<li>([\s\S]*?)(?=<\/li>|<ul>)/g,
            (liMatch: string, liContent: string) => {
              if (!liMatch.includes("<ul>")) {
                return `<li value="${listCounter++}">${liContent}</li>`;
              }
              return liMatch;
            }
          );

          return `<ol start="${listCounter - (content.match(/<li>/g)?.length ?? 0)}">${updatedContent}</ol>`;
        });

        const pdfMakeHtml = htmlToPdfMake(adjustedHtml);
        return Array.isArray(pdfMakeHtml) ? pdfMakeHtml : [pdfMakeHtml];
      };

      const buildCitationsContent = (citations: any) => {
        if (!citations?.results?.length) return [];

        const citationEntries = [{
          text: `\n\nSources (${citations.results.length}):`,
          style: "header",
          margin: [0, 15, 0, 5],
          color: "#3D5E96"
        }];

        for (const [index, citation] of citations.results.entries()) {
          const citationBlocks = [{
            text: `[${index + 1}] ${citation.title || 'Untitled Source'}`,
            style: "paragraph",
            margin: [0, 2, 0, 2],
            color: "#2563eb"
          }, {
            text: `    ${citation.url || 'No URL'}`,
            style: "paragraph",
            margin: [0, 0, 0, 2],
            fontSize: 10,
            color: "#6b7280"
          }];

          if (citation.score !== undefined) {
            citationBlocks.push({
              text: `    Relevance Score: ${citation.score}/10`,
              style: "paragraph",
              margin: [0, 0, 0, 5],
              fontSize: 9,
              color: "#6b7280"
            });
          }

          if (citation.content) {
            const truncatedContent = citation.content.length > 200
              ? citation.content.substring(0, 200) + '...'
              : citation.content;
            citationBlocks.push({
              text: `    ${truncatedContent}`,
              style: "paragraph",
              margin: [0, 0, 0, 8],
              fontSize: 9,
              color: "#374151"
            });
          }

          citationEntries.push(...citationBlocks);
        }

        return citationEntries;
      };

      const filterMessageFiles = (files: any[], item: any) => {
        return (files || []).filter((f: any) => {
          const convId = f?.conversation_id;
          if (!convId) return item?.role === 'user' && !item?._id;
          if (typeof convId === 'string') return convId === item?._id || convId.includes('temp_');
          if (Array.isArray(convId)) return convId.includes(item?._id) || convId.some((id: string) => String(id).includes('temp_'));
          return false;
        });
      };

      const categorizeFiles = (messageFiles: any[]) => {
        const imageFiles = messageFiles.filter((f: any) => {
          const n = (f?.originalName || f?.name || f?.url || "").toLowerCase();
          return n.endsWith('.png') || n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.webp') || n.endsWith('.gif');
        });

        const audioFiles = messageFiles.filter((f: any) => {
          const type = String(f?.type || '').toLowerCase();
          const n = (f?.originalName || f?.name || f?.url || '').toLowerCase();
          const byMime = type.startsWith('audio/');
          const byExt = ['.mp3', '.wav', '.m4a', '.ogg', '.webm'].some((ext) => n.endsWith(ext));
          return byMime || byExt;
        });

        const pdfFiles = messageFiles.filter((f: any) => {
          const type = String(f?.type || '').toLowerCase();
          const n = (f?.originalName || f?.name || f?.url || '').toLowerCase();
          const byMime = type === 'application/pdf';
          const byExt = n.endsWith('.pdf');
          return byMime || byExt;
        });

        return { imageFiles, audioFiles, pdfFiles };
      };

      const createImageBlocks = async (imageFiles: any[]) => {
        const imageBase64List = (await Promise.all(imageFiles.map(async (f: any) => {
          try {
            const url = f?.url || f?.signedUrl || f?.path || '';
            const b64 = await imageUrlToBase64(url);
            return b64;
          } catch {
            return null;
          }
        }))).filter(Boolean) as string[];

        const imageBlocks: any[] = [];
        if (imageBase64List.length) {
          const toImageDoc = (src: string) => ({ image: src, width: 140, margin: [0, 8, 8, 0] });
          for (let i = 0; i < imageBase64List.length; i += 3) {
            const row = imageBase64List.slice(i, i + 3).map(toImageDoc);
            imageBlocks.push({ columns: row });
          }
        }

        return imageBlocks;
      };

      const extractFileNameFromUrl = (url: string) => {
        try {
          const u = new URL(url, globalThis.location.origin);
          const parts = (u.pathname || '').split('/');
          const last = parts.at(-1) || '';
          return decodeURIComponent(last);
        } catch {
          return '';
        }
      };

      const createFileBlocks = (files: any[], fileType: 'audio' | 'pdf') => {
        if (!files.length) return [];

        const title = fileType === 'audio' ? 'Audio attachments:' : 'PDF attachments:';
        const defaultPrefix = fileType === 'audio' ? 'Audio' : 'Document';
        const defaultExt = fileType === 'pdf' ? '.pdf' : '';

        const fileEntries = [{
          text: title,
          style: 'paragraph',
          margin: [0, 8, 0, 2],
          color: '#3D5E96',
        }];

        for (const [idx, f] of files.entries()) {
          const url: string = f?.url || f?.signedUrl || f?.path || '';
          const fromUrlName = extractFileNameFromUrl(url);
          const displayName: string = f?.originalName || f?.name || fromUrlName || `${defaultPrefix} ${idx + 1}${defaultExt}`;
          const entry: any = {
            text: `• ${displayName}`,
            style: 'paragraph',
            margin: [0, 0, 0, 2],
          };

          if (url) {
            entry.link = url;
            entry.color = '#2563eb';
          } else {
            entry.color = '#374151';
          }

          fileEntries.push(entry);
        }

        return fileEntries;
      };

      const createPdfTableRow = async (item: any, files: any[]) => {
        const { chatImg, userName } = getUserDisplayInfo(item);
        const avatarBase64 = await imageToBase64WithCircle(chatImg);

        const pdfMakeHtmlArray = processHtmlContent(item.content);
        const citationsContent = buildCitationsContent(item.citations);

        const messageFiles = filterMessageFiles(files, item);
        const { imageFiles, audioFiles, pdfFiles } = categorizeFiles(messageFiles);

        const imageBlocks = await createImageBlocks(imageFiles);
        const audioBlocks = createFileBlocks(audioFiles, 'audio');
        const pdfBlocks = createFileBlocks(pdfFiles, 'pdf');

        return {
          table: {
            widths: [30, "*"],
            body: [
              [
                {
                  text: userName,
                  style: "header",
                  colSpan: 2,
                  alignment: "top",
                  margin: [38, 0, 0, 0],
                  color: "#3D5E96",
                },
                {},
              ],
              [
                {
                  image: avatarBase64,
                  width: 25,
                  height: 25,
                  margin: [0, -22, 0, 0],
                },
                {
                  stack: [...pdfMakeHtmlArray, ...citationsContent, ...imageBlocks, ...pdfBlocks, ...audioBlocks],
                  margin: [0, 0, 0, 0],
                },
              ],
            ],
          },
          layout: "noBorders",
          margin: [0, 0, 0, 0],
        };
      };
      handlePdfDownload()
}