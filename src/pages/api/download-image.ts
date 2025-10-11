import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

function getFilenameFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const last = pathname.split("/").pop() || "downloaded-image";
    const base = last.split("?")[0];
    return base || "downloaded-image";
  } catch {
    return "downloaded-image";
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || Array.isArray(url)) {
    res.status(400).json({ message: "Missing required 'url' query parameter" });
    return;
  }

  try {
    const parsed = new URL(url);
    if (!(parsed.protocol === "http:" || parsed.protocol === "https:")) {
      res.status(400).json({ message: "Unsupported protocol" });
      return;
    }

    const remote = await fetch(url);
    if (!remote.ok || !remote.body) {
      res.status(remote.status).json({ message: "Failed to fetch remote image" });
      return;
    }

    const contentType = remote.headers.get("content-type") || "application/octet-stream";
    const disposition = remote.headers.get("content-disposition");
    let filename = getFilenameFromUrl(url);
    if (disposition?.includes("filename=")) {
      const match = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(disposition);
      filename = decodeURIComponent(match?.[1] || match?.[2] || filename);
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Cache-Control", "private, max-age=0, must-revalidate");

    const arrayBuffer = await remote.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.status(200).send(buffer);
  } catch (error) {
    console.error("/api/download-image error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


