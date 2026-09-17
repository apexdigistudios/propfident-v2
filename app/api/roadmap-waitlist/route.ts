import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error("Missing Supabase env vars in /api/roadmap-waitlist");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { error } = await supabase
      .from("roadmap_waitlist")
      .insert([{ email: email.toLowerCase() }]);

    // Ignore duplicate email errors (code 23505)
    if (error && error.code !== "23505") {
      console.error("Supabase waitlist insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Roadmap waitlist handler error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}