import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin client using Service Role key to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Verify Whop payment success payload
    const eventType = body.action || body.event;
    const email = (body.data?.email || body.user?.email || "").toLowerCase();

    if (eventType === "payment.succeeded" && email) {
      // Upgrade existing profile or insert tier record
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