import cheerio from "cheerio";

export default async function handler(req:any, res:any) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch the URL" });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const metaData = {
      favicon: $('link[rel="icon"]').attr("href"),
      description: $('meta[name="description"]').attr("content"),
    };

    res.status(200).json(metaData);
  } catch (error) {
    console.error("Error fetching meta tags:", error);
    res.status(500).json({ error: "Failed to fetch meta tags" });
  }
}
