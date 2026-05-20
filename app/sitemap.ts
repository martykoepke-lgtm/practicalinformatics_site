import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const primary = ["", "/about", "/time-back-assessment", "/blog", "/contact"];
  const policy = ["/privacy", "/terms", "/cookies", "/acceptable-use", "/returns"];
  return [
    ...primary.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: (path === "/blog" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: path === "" ? 1 : path === "/time-back-assessment" ? 0.9 : 0.7,
    })),
    ...policy.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
