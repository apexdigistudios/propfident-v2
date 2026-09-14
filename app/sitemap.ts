import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: "https://propfident.online/", lastModified, priority: 1.0 },
    { url: "https://propfident.online/tools/position-sizer", lastModified, priority: 0.8 },
    { url: "https://propfident.online/tools/prop-match", lastModified, priority: 0.8 },
    { url: "https://propfident.online/tools/ai-trade-planner", lastModified, priority: 0.8 },
  ];
}