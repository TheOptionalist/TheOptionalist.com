import { notFound } from "next/navigation";
import Article from "@/components/Article";
import Breadcrumbs from "@/components/Breadcrumbs";
import StudyPanel from "@/components/StudyPanel";
import { loadRawHtml, prepareArticleHtml } from "@/lib/content";
import { getDriveCourseBySlug, getPublishedDriveCourses } from "@/lib/courseCatalog";

export function generateStaticParams() {
  return getPublishedDriveCourses().map((course) => ({
    slug: course.slug
  }));
}

export default function DriveCoursePage({
  params
}: {
  params: { slug: string };
}) {
  const course = getDriveCourseBySlug(params.slug);

  if (!course) {
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
