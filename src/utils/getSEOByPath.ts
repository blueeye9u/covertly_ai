import seoData from "../constants/seo-data";

interface SEOEntry {
    url: string;
    title: string;
    description: string;
    h1: string;
}

export function getSEOByPath(pathname: string): Partial<SEOEntry> {
    const match = seoData.find((page: SEOEntry) => page.url === pathname);
    return match || {};
}