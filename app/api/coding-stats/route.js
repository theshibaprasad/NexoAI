import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// GET - Get user's coding statistics
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find or create coding stats for the user
    let codingStats = await db.codingStats.findUnique({
      where: { userId },
    });

    if (!codingStats) {
      // Create new coding stats for the user
      codingStats = await db.codingStats.create({
        data: {
          userId,
          problemsSolved: 0,
          timeSpentMinutes: 0,
          currentStreak: 0,
          longestStreak: 0,
          solvedProblems: [],
        },
      });
    }

    return NextResponse.json({
      problemsSolved: codingStats.problemsSolved || 0,
      timeSpentMinutes: codingStats.timeSpentMinutes || 0,
      currentStreak: codingStats.currentStreak || 0,
      longestStreak: codingStats.longestStreak || 0,
    });
  } catch (error) {
    console.error("Error fetching coding stats:", error);
    return NextResponse.json({ error: "Failed to fetch coding stats" }, { status: 500 });
  }
}

// POST - Update user's coding statistics
export async function POST(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { problemId, timeSpentMinutes } = await request.json();

    // Find or create coding stats for the user
    let codingStats = await db.codingStats.findUnique({
      where: { userId },
    });

    if (!codingStats) {
      codingStats = await db.codingStats.create({
        data: {
          userId,
          problemsSolved: 0,
          timeSpentMinutes: 0,
          currentStreak: 0,
          longestStreak: 0,
          solvedProblems: [],
        },
      });
    }

    // Check if this problem was already solved today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const alreadySolvedToday = (codingStats.solvedProblems || []).some(problem => {
      const solvedDate = new Date(problem.solvedAt);
      solvedDate.setHours(0, 0, 0, 0);
      return solvedDate.getTime() === today.getTime();
    });

    // Update streak logic
    let newStreak = codingStats.currentStreak || 0;
    let newLongestStreak = codingStats.longestStreak || 0;
    
    if (!alreadySolvedToday) {
      // Check if user solved a problem yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      
      const solvedYesterday = (codingStats.solvedProblems || []).some(problem => {
        const solvedDate = new Date(problem.solvedAt);
        solvedDate.setHours(0, 0, 0, 0);
        return solvedDate.getTime() === yesterday.getTime();
      });

      if (solvedYesterday) {
        newStreak = (codingStats.currentStreak || 0) + 1;
      } else {
        newStreak = 1; // Reset streak
      }

      if (newStreak > (codingStats.longestStreak || 0)) {
        newLongestStreak = newStreak;
      }
    }

    // Update coding stats
    const updatedStats = await db.codingStats.update({
      where: { userId },
      data: {
        problemsSolved: (codingStats.problemsSolved || 0) + 1,
        timeSpentMinutes: (codingStats.timeSpentMinutes || 0) + (timeSpentMinutes || 0),
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastSolvedDate: new Date(),
        solvedProblems: [
          ...(codingStats.solvedProblems || []),
          {
            problemId,
            solvedAt: new Date(),
            timeSpent: timeSpentMinutes || 0,
          },
        ],
      },
    });

    return NextResponse.json({
      problemsSolved: updatedStats.problemsSolved,
      timeSpentMinutes: updatedStats.timeSpentMinutes,
      currentStreak: updatedStats.currentStreak,
      longestStreak: updatedStats.longestStreak,
    });
  } catch (error) {
    console.error("Error updating coding stats:", error);
    return NextResponse.json({ error: "Failed to update coding stats" }, { status: 500 });
  }
} 