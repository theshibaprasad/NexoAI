import clientPromise, { DB_NAME, COLLECTIONS } from './mongodb';

export async function setupDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    console.log('Setting up MongoDB database...');

    // Create collections if they don't exist
    const collections = [
      COLLECTIONS.USERS,
      COLLECTIONS.ASSESSMENTS,
      COLLECTIONS.RESUMES,
      COLLECTIONS.COVER_LETTERS,
      COLLECTIONS.INDUSTRY_INSIGHTS
    ];

    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName);
        console.log(`Created collection: ${collectionName}`);
      } catch (error) {
        if (error.code === 48) { // Collection already exists
          console.log(`Collection already exists: ${collectionName}`);
        } else {
          console.error(`Error creating collection ${collectionName}:`, error);
        }
      }
    }

    // Create indexes
    const usersCollection = db.collection(COLLECTIONS.USERS);
    await usersCollection.createIndex({ clerkUserId: 1 }, { unique: true });
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log('Created indexes for users collection');

    const assessmentsCollection = db.collection(COLLECTIONS.ASSESSMENTS);
    await assessmentsCollection.createIndex({ userId: 1 });
    console.log('Created indexes for assessments collection');

    const resumesCollection = db.collection(COLLECTIONS.RESUMES);
    await resumesCollection.createIndex({ userId: 1 }, { unique: true });
    console.log('Created indexes for resumes collection');

    const coverLettersCollection = db.collection(COLLECTIONS.COVER_LETTERS);
    await coverLettersCollection.createIndex({ userId: 1 });
    console.log('Created indexes for cover letters collection');

    const industryInsightsCollection = db.collection(COLLECTIONS.INDUSTRY_INSIGHTS);
    await industryInsightsCollection.createIndex({ industry: 1 }, { unique: true });
    await industryInsightsCollection.createIndex({ nextUpdate: 1 });
    console.log('Created indexes for industry insights collection');

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

// Run setup if this file is executed directly
if (typeof window === 'undefined' && process.argv[1] === new URL(import.meta.url).pathname) {
  setupDatabase()
    .then(() => {
      console.log('Setup completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Setup failed:', error);
      process.exit(1);
    });
} 