import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: [...ROUTES] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
