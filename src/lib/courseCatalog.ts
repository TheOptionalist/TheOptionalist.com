import catalog from "@/content/course-catalog.json";

export type StudyPanelData = {
  title: string;
  summary: string;
  keyPoints: string[];
  prompts: string[];
  glossary: { term: string; meaning: string }[];
};

export type CourseCatalogEntry = {
  slug: string;
  title: string;
  subject: string;
  track: string;
  description: string;
  order: number;
  status: "published" | "draft";
  pageSource: "legacy" | "drive";
  href?: string;
  driveFileId?: string;
  outputFileName?: string;
  baseUrl?: string;
  studyPanel?: StudyPanelData;
};

export type DriveCourseCatalogEntry = CourseCatalogEntry & {
  pageSource: "drive";
  driveFileId: string;
  outputFileName: string;
};

const courseCatalog = catalog as CourseCatalogEntry[];

function sortCourses<T extends CourseCatalogEntry>(courses: T[]): T[] {
  return [...courses].sort((left, right) => left.order - right.order);
}

export function getPublishedCourses() {
  return sortCourses(courseCatalog.filter((course) => course.status === "published"));
}

export function getCoursesBySubject(subject: string) {
  return getPublishedCourses().filter((course) => course.subject === subject);
}

export function getCourseHref(course: CourseCatalogEntry) {
  if (course.pageSource === "drive") {
    return `/courses/${course.slug}`;
  }

  return course.href ?? `/courses/${course.slug}`;
}

export function getDriveCourses(): DriveCourseCatalogEntry[] {
  return sortCourses(
    courseCatalog.filter(
      (course): course is DriveCourseCatalogEntry =>
        course.pageSource === "drive" &&
        typeof course.driveFileId === "string" &&
        course.driveFileId.length > 0 &&
        typeof course.outputFileName === "string" &&
        course.outputFileName.length > 0
    )
  );
}

export function getPublishedDriveCourses(): DriveCourseCatalogEntry[] {
  return getDriveCourses().filter((course) => course.status === "published");
}

export function getDriveCourseBySlug(slug: string): DriveCourseCatalogEntry | null {
  return getPublishedDriveCourses().find((course) => course.slug === slug) ?? null;
}
