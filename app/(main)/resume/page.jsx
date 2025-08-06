import { getResume } from "@/actions/resume";
import dynamic from "next/dynamic";

const ResumeBuilder = dynamic(() => import("./_components/resume-builder"), { ssr: false });

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
