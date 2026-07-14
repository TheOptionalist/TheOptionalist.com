import { notFound, redirect } from "next/navigation";
import Article from "@/components/Article";
import Breadcrumbs from "@/components/Breadcrumbs";
import StudyPanel from "@/components/StudyPanel";
import { loadRawHtml, prepareArticleHtml } from "@/lib/content";
import { hasCourseAccess } from "@/lib/courseAccess";
import { getDriveCourseBySlug, getPublishedDriveCourses } from "@/lib/courseCatalog";
import { getProfileByUid, getServerSession } from "@/lib/firebaseServer";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getPublishedDriveCourses().map((course) => ({
    slug: course.slug
  }));
}

export default async function DriveCoursePage({
  params
}: {
  params: { slug: string };
}) {
  const { user } = await getServerSession();

  if (!user) {
    redirect(`/login?next=/courses/${params.slug}`);
  }

  const course = getDriveCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const { profile } = await getProfileByUid(user.uid);

  if (!hasCourseAccess(profile, course)) {
    notFound();
  }

  const raw = loadRawHtml(course.outputFileName);
  const html = prepareArticleHtml(raw, course.baseUrl);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: course.subject },
          { label: course.track },
          { label: course.title }
        ]}
      />
      {course.studyPanel ? (
        <StudyPanel
          title={course.studyPanel.title}
          summary={course.studyPanel.summary}
          keyPoints={course.studyPanel.keyPoints}
          prompts={course.studyPanel.prompts}
          glossary={course.studyPanel.glossary}
        />
      ) : null}
      <Article html={html} />
    </div>
  );
}
