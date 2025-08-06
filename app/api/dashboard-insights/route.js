import { getIndustryInsights } from "@/actions/dashboard";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const insights = await getIndustryInsights();
    return NextResponse.json(insights);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch insights" },
      { status: 500 }
    );
  }
} 