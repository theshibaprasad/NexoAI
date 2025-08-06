"use client";
import dynamic from "next/dynamic";
import { SkeletonGrid, SkeletonHeader } from "@/components/skeleton-loader";

const ResumeBuilder = dynamic(() => import("./_components/resume-builder"), { 
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <SkeletonHeader />
      <SkeletonGrid cols={1} rows={3} />
    </div>
  )
});

export default function ResumePageClient({ initialContent }) {
  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={initialContent} />
    </div>
  );
}