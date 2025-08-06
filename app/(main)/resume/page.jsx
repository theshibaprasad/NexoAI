import { getResume } from "@/actions/resume";
import ResumePageClient from "./ResumePageClient";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumePageClient initialContent={resume?.content} />
    </div>
  );
}
