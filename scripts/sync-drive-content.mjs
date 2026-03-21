import fs from "fs/promises";
import path from "path";
import nextEnv from "@next/env";
import { google } from "googleapis";

const rootDir = process.cwd();
const catalogPath = path.join(rootDir, "src", "content", "course-catalog.json");
const rawContentDir = path.join(rootDir, "src", "content", "raw");

const { loadEnvConfig } = nextEnv;
loadEnvConfig(rootDir);

function normalizePrivateKey(value) {
  return value ? value.replace(/\\n/g, "\n") : undefined;
}

async function readCatalog() {
  const file = await fs.readFile(catalogPath, "utf8");
  return JSON.parse(file);
}

function getDriveEntries(catalog) {
  return catalog.filter(
    (course) =>
      course.pageSource === "drive" &&
      typeof course.driveFileId === "string" &&
      course.driveFileId.length > 0 &&
      typeof course.outputFileName === "string" &&
      course.outputFileName.length > 0
  );
}

function createAuth() {
  const clientEmail =
    process.env.GOOGLE_DRIVE_CLIENT_EMAIL ?? process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(
    process.env.GOOGLE_DRIVE_PRIVATE_KEY ?? process.env.FIREBASE_PRIVATE_KEY
  );
  const projectId =
    process.env.GOOGLE_DRIVE_PROJECT_ID ?? process.env.FIREBASE_PROJECT_ID;

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing Google Drive service account credentials. Set GOOGLE_DRIVE_CLIENT_EMAIL and GOOGLE_DRIVE_PRIVATE_KEY, or let the script reuse FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY."
    );
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
      project_id: projectId
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"]
  });
}

async function downloadCourse(drive, course) {
  const metadataResponse = await drive.files.get({
    fileId: course.driveFileId,
    fields: "id,name,mimeType"
  });

  const metadata = metadataResponse.data;
  const mimeType = metadata.mimeType ?? "";
  let response;

  if (mimeType === "application/vnd.google-apps.document") {
    response = await drive.files.export(
      {
        fileId: course.driveFileId,
        mimeType: "text/html"
      },
      { responseType: "arraybuffer" }
    );
  } else {
    response = await drive.files.get(
      {
        fileId: course.driveFileId,
        alt: "media"
      },
      { responseType: "arraybuffer" }
    );
  }

  const targetPath = path.join(rawContentDir, course.outputFileName);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, Buffer.from(response.data));

  return {
    name: metadata.name ?? course.outputFileName,
    mimeType,
    targetPath
  };
}

async function main() {
  const catalog = await readCatalog();
  const driveEntries = getDriveEntries(catalog);

  if (driveEntries.length === 0) {
    console.log("No Google Drive-backed courses found in src/content/course-catalog.json");
    return;
  }

  const auth = createAuth();
  const drive = google.drive({ version: "v3", auth });

  console.log(`Syncing ${driveEntries.length} course(s) from Google Drive...`);

  for (const course of driveEntries) {
    const result = await downloadCourse(drive, course);
    console.log(
      `Synced "${course.title}" from ${result.name} (${result.mimeType || "download"}) -> ${path.relative(rootDir, result.targetPath)}`
    );
  }

  console.log("Google Drive sync complete.");
}

main().catch((error) => {
  console.error("Google Drive sync failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
