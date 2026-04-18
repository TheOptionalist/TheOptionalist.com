import "server-only";
import { getCourseHref, getPublishedCourses } from "@/lib/courseCatalog";
import { getCourseFolders } from "@/lib/courseFolders";
import { getVideoCollections } from "@/lib/videoLibrary";

export type SiteSearchItem = {
  id: string;
  title: string;
  href: string;
  label: "Page" | "Folder" | "Module" | "Lesson" | "Video";
  category: string;
  description: string;
  keywords: string[];
};

export function getSiteSearchItems(): SiteSearchItem[] {
  const folders = getCourseFolders();
  const courses = getPublishedCourses();
  const videoCollections = getVideoCollections();

  const pageItems: SiteSearchItem[] = [
    {
      id: "page-home",
      title: "Home",
      href: "/",
      label: "Page",
      category: "Navigation",
      description: "Main landing page for The Optionalist.",
      keywords: ["home", "landing", "optionalist"]
    },
    {
      id: "page-courses",
      title: "Courses",
      href: "/courses",
      label: "Page",
      category: "Navigation",
      description: "Open all published study folders and lessons.",
      keywords: ["courses", "course library", "folders", "study material"]
    },
    {
      id: "page-upsc-prelims",
      title: "UPSC Prelims",
      href: "/upsc-prelims",
      label: "Page",
      category: "Navigation",
      description: "Open economy and polity prelims preparation shelves.",
      keywords: ["upsc prelims", "prelims", "economy", "polity", "objective preparation"]
    },
    {
      id: "page-tests",
      title: "Tests",
      href: "/tests",
      label: "Page",
      category: "Navigation",
      description: "Open test lanes, revision drills, and subject-focused practice sections.",
      keywords: ["tests", "test section", "practice", "mock", "revision drills", "prelims tests"]
    },
    {
      id: "page-anthropology",
      title: "Anthropology",
      href: "/anthropology",
      label: "Page",
      category: "Subjects",
      description: "Anthropology track overview and entry points.",
      keywords: ["anthropology", "anthro", "upsc anthropology", "ugc anthropology"]
    },
    {
      id: "page-psir",
      title: "PSIR",
      href: "/psir",
      label: "Page",
      category: "Subjects",
      description: "PSIR track overview and entry points.",
      keywords: ["psir", "political science", "upsc psir", "ugc psir"]
    },
    {
      id: "page-blogs",
      title: "Blogs",
      href: "/blogs",
      label: "Page",
      category: "Reading",
      description: "Open the blog section.",
      keywords: ["blogs", "articles", "reading"]
    },
    {
      id: "page-stories",
      title: "Stories",
      href: "/stories",
      label: "Page",
      category: "Reading",
      description: "Open the stories section.",
      keywords: ["stories", "story library", "reading"]
    },
    {
      id: "page-account",
      title: "Account",
      href: "/account",
      label: "Page",
      category: "User",
      description: "Open account information and profile details.",
      keywords: ["account", "profile", "user details"]
    },
    {
      id: "page-login",
      title: "Login",
      href: "/login",
      label: "Page",
      category: "User",
      description: "Login to your The Optionalist account.",
      keywords: ["login", "sign in", "account access"]
    }
  ];

  const folderItems = folders.flatMap((folder) => [
    {
      id: `folder-${folder.slug}`,
      title: folder.title,
      href: `/courses/folders/${folder.slug}`,
      label: "Folder" as const,
      category: folder.audience,
      description: folder.description,
      keywords: [
        folder.slug,
        folder.title,
        folder.subtitle,
        folder.audience,
        folder.description
      ]
    },
    ...folder.modules.map((module) => ({
      id: `module-${folder.slug}-${module.order}`,
      title: `${module.title} · ${folder.title}`,
      href: `/courses/folders/${folder.slug}`,
      label: "Module" as const,
      category: folder.audience,
      description: module.description,
      keywords: [module.title, module.description, module.order, folder.title, folder.audience]
    }))
  ]);

  const lessonItems = courses.map((course) => ({
    id: `lesson-${course.slug}`,
    title: course.title,
    href: getCourseHref(course),
    label: "Lesson" as const,
    category: `${course.subject} · ${course.track}`,
    description: course.description,
    keywords: [course.slug, course.title, course.subject, course.track, course.description]
  }));

  const videoItems = videoCollections.flatMap((collection) =>
    collection.videos.map((video) => ({
      id: `video-${collection.courseSlug}-${video.youtubeId}`,
      title: video.title,
      href: collection.folderHref ?? `/videos#${collection.courseSlug}`,
      label: "Video" as const,
      category: collection.audience,
      description: video.summary,
      keywords: [video.title, video.summary, video.module, collection.title, collection.audience]
    }))
  );

  return [...pageItems, ...folderItems, ...lessonItems, ...videoItems];
}
