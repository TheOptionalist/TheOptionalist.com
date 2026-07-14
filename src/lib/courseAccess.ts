import "server-only";
import type { CourseCatalogEntry } from "./courseCatalog";
import { getPublishedCourses } from "./courseCatalog";
import type { CourseFolder } from "./courseFolders";
import { getCourseFolders } from "./courseFolders";
import type { ProfileRecord } from "./firebaseServer";

type CourseAccessTarget = {
  slug: string;
  title?: string;
  subject?: string;
  track?: string;
  audience?: string;
};

const ALL_COURSES_KEYS = new Set(["*", "all", "all-courses"]);

function normalizeCourseKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readStringList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function getTargetKeys(target: CourseAccessTarget) {
  return [
    target.slug,
    target.title,
    target.subject,
    target.track,
    target.audience,
    target.subject && target.track ? `${target.subject} ${target.track}` : null,
    target.subject && target.title ? `${target.subject} ${target.title}` : null
  ]
    .filter((value): value is string => Boolean(value))
    .map(normalizeCourseKey);
}

function getProfileCourseKeys(profile: ProfileRecord | null) {
  if (!profile) return new Set<string>();

  const values = [
    ...readStringList(profile.enrolledCourseSlugs),
    ...readStringList(profile.enrolledCourses),
    profile.courseSlug
  ].filter((value): value is string => typeof value === "string");

  return new Set(values.map(normalizeCourseKey));
}

export function hasAllCourseAccess(profile: ProfileRecord | null) {
  const keys = getProfileCourseKeys(profile);
  return [...ALL_COURSES_KEYS].some((key) => keys.has(key));
}

export function hasCourseAccess(
  profile: ProfileRecord | null,
  target: CourseAccessTarget
) {
  const profileKeys = getProfileCourseKeys(profile);

  if ([...ALL_COURSES_KEYS].some((key) => profileKeys.has(key))) {
    return true;
  }

  return getTargetKeys(target).some((key) => profileKeys.has(key));
}

export function getAccessibleCourseFolders(profile: ProfileRecord | null): CourseFolder[] {
  const folders = getCourseFolders();
  if (hasAllCourseAccess(profile)) return folders;
  return folders.filter((folder) => hasCourseAccess(profile, folder));
}

export function getAccessiblePublishedCourses(
  profile: ProfileRecord | null
): CourseCatalogEntry[] {
  const courses = getPublishedCourses();
  if (hasAllCourseAccess(profile)) return courses;
  return courses.filter((course) => hasCourseAccess(profile, course));
}
