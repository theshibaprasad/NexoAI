import { getResume } from "@/actions/resume";
import ResumePageClient from "./ResumePageClient";

export default async function ResumePage() {
  const resume = await getResume();
  return <ResumePageClient initialContent={resume?.content} />;
}
