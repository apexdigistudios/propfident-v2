import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Propfident | Prop Firm Trading Risk & AI Suite",
    short_name: "Propfident",
    description: "Prop firm risk management, position sizing, AI trade planning, and challenge matching.",
    start_url: "/userDashboard",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Dashboard",
        short_name: "Dashboard",
        description: "Open PropFident Dashboard",
        url: "/userDashboard",
      },
      {
        name: "Journal",
        short_name: "Journal",
        description: "Open Trading Journal",
        url: "/userDashboard?view=journal",
      },
    ],
  };
}