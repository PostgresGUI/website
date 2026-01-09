import { redirect } from "next/navigation";
import { module1 } from "@/lib/learn/lessons/module1";

// Required for static export - generates all lesson routes at build time
export function generateStaticParams() {
  return module1.lessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

// Redirect to context phase
export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = module1.lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    redirect("/learn-sql");
  }

  redirect(`/learn-sql/${lessonId}/context`);
}
