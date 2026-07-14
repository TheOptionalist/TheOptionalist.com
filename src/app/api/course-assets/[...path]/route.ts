import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { hasCourseAccess } from "@/lib/courseAccess";
import { getCourseFolderBySlug } from "@/lib/courseFolders";
import { getProfileByUid, getServerSession } from "@/lib/firebaseServer";

const COURSE_ASSETS_ROOT = path.join(process.cwd(), "public", "course-assets");

export const runtime = "nodejs";

function getSafeAssetPath(parts: string[]) {
  const filePath = path.resolve(COURSE_ASSETS_ROOT, ...parts);
  const relativePath = path.relative(COURSE_ASSETS_ROOT, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  return filePath;
}

export async function GET(
  _request: Request,
  { params }: { params: { path: string[] } }
) {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const folder = getCourseFolderBySlug(params.path[0] ?? "");
  if (!folder) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { profile } = await getProfileByUid(user.uid);
  if (!hasCourseAccess(profile, folder)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = getSafeAssetPath(params.path);

  if (!filePath || !filePath.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stats = statSync(filePath);
  if (!stats.isFile()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stream = Readable.toWeb(createReadStream(filePath));
  const fileName = path.basename(filePath);

  return new Response(stream as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(stats.size),
      "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
      "Cache-Control": "private, no-store"
    }
  });
}
