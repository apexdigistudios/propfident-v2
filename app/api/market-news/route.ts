import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    // Fetch live Forex Factory weekly calendar feed
    const res = await fetch("https://nfp.ourfocus.net/calendar.json", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Forex Factory feed: ${res.status}`);
    }

    const data = await res.json();

    // Map Forex Factory fields into standard clean structure
    const newsEvents = data.map((item: any, index: number) => ({
      id: item.id || `ff-${index}`,
      title: item.title || item.event || "Economic Event",
      country: item.country || item.currency || "USD",
      date: item.date,
      impact: item.impact || "Low", // 'High', 'Medium', 'Low', 'Holiday'
      forecast: item.forecast || "—",
      previous: item.previous || "—",
      actual: item.actual || "—",
    }));

    return NextResponse.json({ success: true, events: newsEvents });
  } catch (error: any) {
    console.error("Market News Fetch Error:", error);
    
    // Fallback response structure if external feed is momentarily unreachable
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to load live Forex Factory feed",
        events: [] 
      },
      { status: 500 }
    );
  }
}