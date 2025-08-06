"use client";
import dynamic from "next/dynamic";

const ResumeBuilder = dynamic(() => import("./_components/resume-builder"), { ssr: false });

export default function ResumePageClient({ initialContent }) {
  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={initialContent} />
    </div>
  );
}