# Google Drive Course Sync

This project can treat Google Drive as the content source for new courses while still rendering lessons inside the website.

## How it works

- Course metadata lives in [src/content/course-catalog.json](/home/bhavesh/Documents/WEB/web/src/content/course-catalog.json)
- Raw lesson HTML lives in [src/content/raw](/home/bhavesh/Documents/WEB/web/src/content/raw)
- The sync command downloads or exports Drive files into that raw content folder:

```bash
npm run sync:drive
```

## Recommended setup

1. Use a Google service account with the Google Drive API enabled.
2. Put your course file in Google Drive.
3. Share that file or its parent folder with the service account email.
4. Add Drive credentials in `.env.local`.
5. Add a new `pageSource: "drive"` entry to the course catalog.
6. Run `npm run sync:drive`.
7. Open the lesson at `/courses/<slug>`.

## Environment variables

You can use dedicated Drive credentials:

```bash
GOOGLE_DRIVE_PROJECT_ID=your-project-id
GOOGLE_DRIVE_CLIENT_EMAIL=service-account@your-project.iam.gserviceaccount.com
GOOGLE_DRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
```

Or reuse the existing Firebase service account variables already used by the app:

```bash
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Example course entry

Add a new object like this to the course catalog:

```json
{
  "slug": "anthropology-upsc-human-origins",
  "title": "Human Origins",
  "subject": "Anthropology",
  "track": "UPSC CSE",
  "description": "Drive-synced lesson for human origins.",
  "order": 60,
  "status": "published",
  "pageSource": "drive",
  "driveFileId": "YOUR_GOOGLE_DRIVE_FILE_ID",
  "outputFileName": "Anthropology_UPSC_CSE_Human_Origins.html",
  "baseUrl": "https://theoptionalist.com/anthropology/upsc-cse/",
  "studyPanel": {
    "title": "Human Origins: Revision Snapshot",
    "summary": "Short revision-first overview for the lesson.",
    "keyPoints": ["Point 1", "Point 2"],
    "prompts": ["Prompt 1", "Prompt 2"],
    "glossary": [{ "term": "Example", "meaning": "Definition" }]
  }
}
```

## Supported content types

- Google Docs: exported to HTML during sync
- Regular uploaded HTML files: downloaded directly

If you want PDF-based course pages too, that should be added as a separate viewer flow.
