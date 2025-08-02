// MongoDB Collections Schema for AI Career Coach

// Users Collection
export const UserSchema = {
  _id: "ObjectId", // MongoDB ObjectId
  clerkUserId: "String", // Clerk user ID (unique)
  email: "String", // User email (unique)
  name: "String?", // User's name
  imageUrl: "String?", // Profile image URL
  industry: "String?", // Combined industry-subindustry (e.g., "tech-software-development")
  bio: "String?", // User bio
  experience: "Number?", // Years of experience
  skills: "String[]", // Array of skills
  createdAt: "Date",
  updatedAt: "Date"
};

// Assessments Collection
export const AssessmentSchema = {
  _id: "ObjectId", // MongoDB ObjectId
  userId: "String", // Reference to user ID
  quizScore: "Number", // Overall quiz score
  questions: "Object[]", // Array of {question, answer, userAnswer, isCorrect}
  category: "String", // "Technical", "Behavioral", etc.
  improvementTip: "String?", // AI-generated improvement tip
  createdAt: "Date",
  updatedAt: "Date"
};

// Resumes Collection
export const ResumeSchema = {
  _id: "ObjectId", // MongoDB ObjectId
  userId: "String", // Reference to user ID (unique per user)
  content: "String", // Markdown content
  atsScore: "Number?", // ATS score
  feedback: "String?", // AI feedback
  createdAt: "Date",
  updatedAt: "Date"
};

// Cover Letters Collection
export const CoverLetterSchema = {
  _id: "ObjectId", // MongoDB ObjectId
  userId: "String", // Reference to user ID
  content: "String", // Markdown content
  jobDescription: "String?", // Job description
  companyName: "String", // Name of the company applying to
  jobTitle: "String", // Position applying for
  status: "String", // "draft" or "completed"
  createdAt: "Date",
  updatedAt: "Date"
};

// Industry Insights Collection
export const IndustryInsightSchema = {
  _id: "ObjectId", // MongoDB ObjectId
  industry: "String", // The industry this data belongs to (unique)
  salaryRanges: "Object[]", // Array of { role: string, min: number, max: number, median: number, location: string? }
  growthRate: "Number", // Industry growth rate
  demandLevel: "String", // "High", "Medium", "Low"
  topSkills: "String[]", // Most in-demand skills
  marketOutlook: "String", // "Positive", "Neutral", "Negative"
  keyTrends: "String[]", // Array of current industry trends
  recommendedSkills: "String[]", // Skills recommended for the industry
  lastUpdated: "Date",
  nextUpdate: "Date" // Scheduled update time
};

// Indexes to create:
// users: { clerkUserId: 1 } (unique), { email: 1 } (unique)
// assessments: { userId: 1 }
// resumes: { userId: 1 } (unique)
// coverLetters: { userId: 1 }
// industryInsights: { industry: 1 } (unique), { nextUpdate: 1 } 