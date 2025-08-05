"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.log("No user authenticated for saveResume");
      return null;
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      console.log("User not found for saveResume");
      return null;
    }

    try {
      const resume = await db.resume.upsert({
        where: {
          userId: user.id,
        },
        update: {
          content,
        },
        create: {
          userId: user.id,
          content,
        },
      });

      revalidatePath("/resume");
      return resume;
    } catch (error) {
      console.error("Error saving resume:", error);
      return null;
    }
  } catch (error) {
    console.log("Auth error in saveResume:", error.message);
    return null;
  }
}

export async function getResume() {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.log("No user authenticated for getResume");
      return null;
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      console.log("User not found for getResume");
      return null;
    }

    return await db.resume.findUnique({
      where: {
        userId: user.id,
      },
    });
  } catch (error) {
    console.log("Auth error in getResume:", error.message);
    return null;
  }
}

export async function improveWithAI({ current, type }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.log("No user authenticated for improveWithAI");
      return null;
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        industryInsight: true,
      },
    });

    if (!user) {
      console.log("User not found for improveWithAI");
      return null;
    }

    const prompt = `
      As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
      Make it more impactful, quantifiable, and aligned with industry standards.
      Current content: "${current}"

      Requirements:
      1. Use action verbs
      2. Include metrics and results where possible
      3. Highlight relevant technical skills
      4. Keep it concise but detailed
      5. Focus on achievements over responsibilities
      6. Use industry-specific keywords
      
      Format the response as a single paragraph without any additional text or explanations.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const improvedContent = response.text().trim();
      return improvedContent;
    } catch (error) {
      console.error("Error improving content:", error);
      return null;
    }
  } catch (error) {
    console.log("Auth error in improveWithAI:", error.message);
    return null;
  }
}
