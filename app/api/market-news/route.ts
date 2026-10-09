import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  const endpoints = [
    "https://nfs.faireconomy.media/ff_calendar_thisweek.json",
    "https://nfs.faireconomy.media/ff_calendar_nextweek.json",
  ];

  try {
    let responseData = null;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "application/json, text/plain, */*",
          },
          next: { revalidate: 300 },
        });

        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              responseData = data;
              break;
            }
          }
        }
      } catch (e) {
        console.warn(`Failed to fetch from ${url}:`, e);
      }
    }

    if (!responseData) {
      throw new Error("Unable to retrieve feed from Forex Factory endpoints.");
    }

    // Map Forex Factory JSON payload into standard terminal schema
    const newsEvents = responseData.map((item: any, index: number) => ({
      id: `ff-${index}-${item.title?.replace(/\s+/g, "-") || "event"}`,
      title: item.title || "Economic Release",
      country: item.country || "USD",
      date: item.date || new Date().toISOString(),
      impact: item.impact || "Low", // 'High', 'Medium', 'Low', 'Holiday'
      forecast: item.forecast || "—",
      previous: item.previous || "—",
      actual: item.actual || "—",
    }));

    return NextResponse.json({ success: true, events: newsEvents });
  } catch (error: any) {
    console.error("Market News Fetch Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load live Forex Factory feed",
        events: [],
      },
      { status: 500 }
    );
  }
}