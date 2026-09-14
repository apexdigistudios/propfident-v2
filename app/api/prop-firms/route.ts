import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const source = await readFile(path.join(process.cwd(), "JSON.txt"), "utf8");
    const jsonBlock = source.match(/```json\s*([\s\S]*?)\s*```/i)?.[1];

    if (!jsonBlock) {
      return NextResponse.json({ error: "No JSON data block found" }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(jsonBlock));
  } catch {
    return NextResponse.json({ error: "Unable to load prop-firm data" }, { status: 500 });
  }
}
