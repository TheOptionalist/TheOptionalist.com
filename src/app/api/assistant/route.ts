import { NextResponse } from "next/server";
import { createAssistantReply } from "@/lib/studyAssistant";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const query = typeof body?.query === "string" ? body.query : "";
    const reply = createAssistantReply(query);

    return NextResponse.json(reply);
  } catch {
    return NextResponse.json(
      {
        message: "The assistant could not process this request right now.",
        links: [],
        suggestions: ["Open courses", "Open video library", "Open revision lectures"]
      },
      { status: 500 }
    );
  }
}
