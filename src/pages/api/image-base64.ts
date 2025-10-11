import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse = { dataUrl?: string; message?: string };

function sendError(res: NextApiResponse<ApiResponse>, status: number, message: string) {
  res.status(status).json({ message });
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { url } = req.query;

  if (!url || Array.isArray(url)) {
    sendError(res, 400, "Missing required 'url' query parameter");
    return;
  }

  try {
    const parsed = new URL(url);
    if (!(parsed.protocol === "http:" || parsed.protocol === "https:")) {
      sendError(res, 400, "Unsupported protocol");
      return;
    }

    const remote = await fetch(url);
    if (!remote.ok || !remote.body) {
      sendError(res, remote.status, "Failed to fetch remote image");
      return;
    }

    const contentType = remote.headers.get("content-type") || "image/png";
    const arrayBuffer = await remote.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    res.status(200).json({ dataUrl });
  } catch (error) {
    console.error("/api/image-base64 error", error);
    sendError(res, 500, "Internal server error");
  }
}


