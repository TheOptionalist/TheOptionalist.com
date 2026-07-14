import { NextResponse } from "next/server";
import { getPublishedCourses } from "@/lib/courseCatalog";
import { getCourseFolders } from "@/lib/courseFolders";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";

function getAllowedCourseSlugs() {
  return new Set([
    "*",
    "all",
    "all-courses",
    ...getCourseFolders().map((folder) => folder.slug),
    ...getPublishedCourses().map((course) => course.slug)
  ]);
}

function parseCourseSlugs(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return [];

  return value
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const uid = formData.get("uid");
  const courseSlugs = parseCourseSlugs(formData.get("courseSlugs"));

  if (typeof uid !== "string" || !uid) {
    return NextResponse.json({ error: "Missing uid." }, { status: 400 });
  }

  const allowedSlugs = getAllowedCourseSlugs();
  const invalidSlug = courseSlugs.find((slug) => !allowedSlugs.has(slug));

  if (invalidSlug) {
    return NextResponse.json(
      { error: `Unknown course slug: ${invalidSlug}` },
      { status: 400 }
    );
  }

  const { db, error } = getFirebaseAdmin();

  if (!db) {
    return NextResponse.json(
      { error: error?.message ?? "Missing Firebase admin config." },
      { status: 500 }
    );
  }

  await db.collection("profiles").doc(uid).set(
    {
      enrolledCourseSlugs: courseSlugs
    },
    { merge: true }
  );

  const url = new URL("/admin", request.url);
  url.searchParams.set("saved", "1");
  return NextResponse.redirect(url, { status: 303 });
}
