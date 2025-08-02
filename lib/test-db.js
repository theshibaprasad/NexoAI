import { db } from './db';

async function testDatabase() {
  try {
    console.log('Testing MongoDB connection...');

    // Test user creation
    const testUser = await db.user.create({
      data: {
        clerkUserId: 'test-clerk-id',
        email: 'test@example.com',
        name: 'Test User',
        skills: ['JavaScript', 'React'],
        industry: 'tech-software-development'
      }
    });

    console.log('✅ User created:', testUser);

    // Test user find
    const foundUser = await db.user.findUnique({
      where: { clerkUserId: 'test-clerk-id' }
    });

    console.log('✅ User found:', foundUser);

    // Test assessment creation
    const testAssessment = await db.assessment.create({
      data: {
        userId: testUser.id,
        quizScore: 85.5,
        questions: [
          {
            question: 'What is React?',
            answer: 'A JavaScript library',
            userAnswer: 'A JavaScript library',
            isCorrect: true
          }
        ],
        category: 'Technical',
        improvementTip: 'Great job! Keep practicing.'
      }
    });

    console.log('✅ Assessment created:', testAssessment);

    // Test assessment find
    const assessments = await db.assessment.findMany({
      where: { userId: testUser.id }
    });

    console.log('✅ Assessments found:', assessments.length);

    // Test industry insight creation
    const testInsight = await db.industryInsight.create({
      data: {
        industry: 'tech-software-development',
        salaryRanges: [
          {
            role: 'Software Engineer',
            min: 80000,
            max: 150000,
            median: 120000,
            location: 'Remote'
          }
        ],
        growthRate: 15.5,
        demandLevel: 'High',
        topSkills: ['JavaScript', 'React', 'Node.js'],
        marketOutlook: 'Positive',
        keyTrends: ['Remote work', 'AI integration'],
        recommendedSkills: ['TypeScript', 'Docker']
      }
    });

    console.log('✅ Industry insight created:', testInsight);

    console.log('🎉 All database tests passed!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

// Run test if this file is executed directly
if (typeof window === 'undefined' && process.argv[1] === new URL(import.meta.url).pathname) {
  testDatabase()
    .then(() => {
      console.log('Test completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Test failed:', error);
      process.exit(1);
    });
}

export { testDatabase }; 