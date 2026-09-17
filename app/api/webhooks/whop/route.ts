import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase environment variables.");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    const body = await req.json();

    const eventType = body.action || body.event;
    const email = (body.data?.email || body.user?.email || "").toLowerCase();

    if (eventType === "payment.succeeded" && email) {
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ tier: "lifetime" })
        .eq("email", email);

      if (error) {
        console.error("Failed to update tier via webhook:", error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}