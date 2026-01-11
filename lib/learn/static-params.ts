import { module1 } from "./lessons/module1";

export function generateLessonStaticParams() {
  return module1.lessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export function generateChallengeStaticParams() {
  const params: Array<{ lessonId: string; challengeId: string }> = [];

  for (const lesson of module1.lessons) {
    for (const challenge of lesson.phases.challenges) {
      params.push({
        lessonId: lesson.id,
        challengeId: challenge.id,
      });
    }
  }

  return params;
}
