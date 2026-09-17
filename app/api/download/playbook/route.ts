import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "private", "playbook.pdf");

    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Seven-Figure-Funded-Trader-Playbook.pdf"',
      },
    });
  } catch (error) {
    console.error("Error serving PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}