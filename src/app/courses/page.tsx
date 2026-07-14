import Link from "next/link";
import { redirect } from "next/navigation";
import { getCourseHref } from "@/lib/courseCatalog";
import {
  getAccessibleCourseFolders,
  getAccessiblePublishedCourses
} from "@/lib/courseAccess";
import { NET_JRF_ANTHROPOLOGY_COURSE } from "@/lib/paidLearning";
import { getVideoCollectionBySlug } from "@/lib/videoLibrary";
import { getProfileByUid, getServerSession } from "@/lib/firebaseServer";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const { user } = await getServerSession();

  if (!user) {
    redirect("/login?next=/courses");
  }

  const { profile } = await getProfileByUid(user.uid);
  const courses = getAccessiblePublishedCourses(profile);
  const folders = getAccessibleCourseFolders(profile);
  const prelimsFolders = folders.filter((folder) => folder.slug.startsWith("upsc-"));
  const prelimsVideoTotal = prelimsFolders.reduce(
    (count, folder) => count + (getVideoCollectionBySlug(folder.slug)?.videos.length ?? 0),
    0
  );

  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Course library</p>
          <h1>All published study material in one place.</h1>
          <p>
            This library collects both existing lessons and future Google
            Drive-synced courses so you can manage everything from one catalog.
          </p>
        </div>
        <div className="hero-highlights" aria-label="Course overview">
          <span>{folders.length} enrolled folders</span>
          <span>{courses.length} enrolled lessons</span>
          <span>{prelimsFolders.length} prelims shelves</span>
          <span>Anthropology</span>
          <span>PSIR</span>
          <span>Sequential module flow</span>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Paid learning</p>
            <h2 className="section-title">NET JRF Anthropology modules.</h2>
          </div>
          <p className="section-copy">
            Unlock the 7-month NET JRF Anthropology course month by month. Each
            module is saved to your account after payment.
          </p>
        </div>

        <div className="resource-grid">
          <article className="resource-card">
            <p className="resource-meta">Paid Course - Rs 699 per module</p>
            <h3>{NET_JRF_ANTHROPOLOGY_COURSE.title}</h3>
            <Link className="button primary" href="/courses/net-jrf-anthropology">
              Open Course
            </Link>
          </article>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Study folders</p>
            <h2 className="section-title">Focused folders for module-by-module preparation.</h2>
          </div>
          <p className="section-copy">
            These folders are arranged for a cleaner learning flow so one module can
            be completed properly before the next one is taken up.
          </p>
        </div>

        {folders.length > 0 ? (
          <div className="folder-grid">
            {folders.map((folder) => {
              const videoCollection = getVideoCollectionBySlug(folder.slug);

              return (
                <article className="folder-card" key={folder.slug}>
                  <p className="folder-label">{folder.audience}</p>
                  <h3>{folder.title}</h3>
                  <p>{folder.description}</p>
                  <p className="folder-subtitle">
                    {folder.subtitle}
                    {videoCollection ? ` - ${videoCollection.videos.length} videos` : ""}
                  </p>
                  <Link className="button primary" href={`/courses/folders/${folder.slug}`}>
                    Open Folder
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="resource-grid">
            <article className="resource-card">
              <p className="resource-meta">No active enrollment</p>
              <h3>No course assigned yet</h3>
              <p>
                Your login is active, but no course enrollment is attached to this
                account yet.
              </p>
            </article>
          </div>
        )}
      </section>

      {prelimsFolders.length > 0 ? (
        <section>
          <div className="section-intro">
            <div>
              <p className="eyebrow">UPSC prelims</p>
              <h2 className="section-title">Objective-preparation shelves for economy and polity.</h2>
            </div>
            <p className="section-copy">
              Economy and NCERT polity prelims tracks are grouped separately so objective
              preparation can stay cleaner without mixing with the main optional folders.
            </p>
          </div>

          <div className="resource-grid">
            <article className="resource-card">
              <p className="resource-meta">Prelims library</p>
              <h3>{prelimsFolders.length} prelims folders</h3>
              <p>
                Open the prelims section for economy and polity tracks, with {prelimsVideoTotal} aligned
                lecture videos already available across these shelves.
              </p>
              <Link className="button primary" href="/upsc-prelims">
                Open UPSC Prelims
              </Link>
            </article>
          </div>
        </section>
      ) : null}

      {courses.length > 0 ? (
        <section>
          <div className="section-intro">
            <div>
              <p className="eyebrow">Published now</p>
              <h2 className="section-title">Open any course or lesson directly from the library.</h2>
            </div>
            <p className="section-copy">
              New entries added to the course catalog can appear here automatically,
              including courses you sync from Google Drive.
            </p>
          </div>

          <div className="resource-grid">
            {courses.map((course) => (
              <article className="resource-card" key={course.slug}>
                <p className="resource-meta">
                  {course.subject} - {course.track}
                </p>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <Link className="button primary" href={getCourseHref(course)}>
                  Open Material
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
