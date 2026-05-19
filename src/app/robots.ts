import type { MetadataRoute } from "next";

const siteUrl = "https://portfolio-rho-one-temibyr9a1.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
