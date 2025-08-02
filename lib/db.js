import clientPromise, { DB_NAME, COLLECTIONS } from './mongodb';
import { ObjectId } from 'mongodb';

// Helper function to get database instance
export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

// Helper function to get collection
export async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}

// Helper function to convert string ID to ObjectId
export function toObjectId(id) {
  if (typeof id === 'string' && ObjectId.isValid(id)) {
    return new ObjectId(id);
  }
  return id;
}

// Helper function to convert ObjectId to string
export function fromObjectId(id) {
  if (id && typeof id === 'object' && id._bsontype === 'ObjectID') {
    return id.toString();
  }
  return id;
}

// Helper function to format document for response
export function formatDocument(doc) {
  if (!doc) return null;
  
  const formatted = { ...doc };
  if (formatted._id) {
    formatted.id = formatted._id.toString();
    delete formatted._id;
  }
  
  return formatted;
}

// Helper function to format array of documents
export function formatDocuments(docs) {
  return docs.map(formatDocument);
}

// Database operations
export const db = {
  // User operations
  user: {
    async findUnique({ where }) {
      const collection = await getCollection(COLLECTIONS.USERS);
      const query = {};
      
      if (where.id) query._id = toObjectId(where.id);
      if (where.clerkUserId) query.clerkUserId = where.clerkUserId;
      if (where.email) query.email = where.email;
      
      const user = await collection.findOne(query);
      return formatDocument(user);
    },

    async create({ data }) {
      const collection = await getCollection(COLLECTIONS.USERS);
      const result = await collection.insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      const user = await collection.findOne({ _id: result.insertedId });
      return formatDocument(user);
    },

    async update({ where, data }) {
      const collection = await getCollection(COLLECTIONS.USERS);
      const query = {};
      
      if (where.id) query._id = toObjectId(where.id);
      if (where.clerkUserId) query.clerkUserId = where.clerkUserId;
      if (where.email) query.email = where.email;
      
      await collection.updateOne(query, {
        $set: {
          ...data,
          updatedAt: new Date()
        }
      });
      
      const user = await collection.findOne(query);
      return formatDocument(user);
    }
  },

  // Assessment operations
  assessment: {
    async create({ data }) {
      const collection = await getCollection(COLLECTIONS.ASSESSMENTS);
      const result = await collection.insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      const assessment = await collection.findOne({ _id: result.insertedId });
      return formatDocument(assessment);
    },

    async findMany({ where, orderBy }) {
      const collection = await getCollection(COLLECTIONS.ASSESSMENTS);
      const query = {};
      
      if (where?.userId) query.userId = where.userId;
      if (where?.category) query.category = where.category;
      
      let cursor = collection.find(query);
      
      if (orderBy) {
        const sort = {};
        sort[orderBy.createdAt || 'createdAt'] = orderBy.createdAt === 'desc' ? -1 : 1;
        cursor = cursor.sort(sort);
      }
      
      const assessments = await cursor.toArray();
      return formatDocuments(assessments);
    }
  },

  // Resume operations
  resume: {
    async upsert({ where, create, update }) {
      const collection = await getCollection(COLLECTIONS.RESUMES);
      const query = {};
      
      if (where.userId) query.userId = where.userId;
      if (where.id) query._id = toObjectId(where.id);
      
      const existingResume = await collection.findOne(query);
      
      if (existingResume) {
        // Update existing resume
        await collection.updateOne(query, {
          $set: {
            ...update,
            updatedAt: new Date()
          }
        });
        
        const resume = await collection.findOne(query);
        return formatDocument(resume);
      } else {
        // Create new resume
        const result = await collection.insertOne({
          ...create,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        const resume = await collection.findOne({ _id: result.insertedId });
        return formatDocument(resume);
      }
    },

    async findUnique({ where }) {
      const collection = await getCollection(COLLECTIONS.RESUMES);
      const query = {};
      
      if (where.userId) query.userId = where.userId;
      if (where.id) query._id = toObjectId(where.id);
      
      const resume = await collection.findOne(query);
      return formatDocument(resume);
    }
  },

  // Cover Letter operations
  coverLetter: {
    async create({ data }) {
      const collection = await getCollection(COLLECTIONS.COVER_LETTERS);
      const result = await collection.insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      const coverLetter = await collection.findOne({ _id: result.insertedId });
      return formatDocument(coverLetter);
    },

    async findMany({ where, orderBy }) {
      const collection = await getCollection(COLLECTIONS.COVER_LETTERS);
      const query = {};
      
      if (where?.userId) query.userId = where.userId;
      
      let cursor = collection.find(query);
      
      if (orderBy) {
        const sort = {};
        sort[orderBy.createdAt || 'createdAt'] = orderBy.createdAt === 'desc' ? -1 : 1;
        cursor = cursor.sort(sort);
      }
      
      const coverLetters = await cursor.toArray();
      return formatDocuments(coverLetters);
    },

    async findUnique({ where }) {
      const collection = await getCollection(COLLECTIONS.COVER_LETTERS);
      const query = {};
      
      if (where.id) query._id = toObjectId(where.id);
      
      const coverLetter = await collection.findOne(query);
      return formatDocument(coverLetter);
    },

    async delete({ where }) {
      const collection = await getCollection(COLLECTIONS.COVER_LETTERS);
      const query = {};
      
      if (where.id) query._id = toObjectId(where.id);
      
      const result = await collection.deleteOne(query);
      return result.deletedCount > 0;
    }
  },

  // Industry Insight operations
  industryInsight: {
    async findUnique({ where }) {
      const collection = await getCollection(COLLECTIONS.INDUSTRY_INSIGHTS);
      const query = {};
      
      if (where.industry) query.industry = where.industry;
      if (where.id) query._id = toObjectId(where.id);
      
      const insight = await collection.findOne(query);
      return formatDocument(insight);
    },

    async create({ data }) {
      const collection = await getCollection(COLLECTIONS.INDUSTRY_INSIGHTS);
      const result = await collection.insertOne({
        ...data,
        lastUpdated: new Date(),
        nextUpdate: new Date(data.nextUpdate || Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
      
      const insight = await collection.findOne({ _id: result.insertedId });
      return formatDocument(insight);
    },

    async findMany({ where }) {
      const collection = await getCollection(COLLECTIONS.INDUSTRY_INSIGHTS);
      const query = {};
      
      if (where?.nextUpdate) {
        query.nextUpdate = { $lte: new Date() };
      }
      
      const insights = await collection.find(query).toArray();
      return formatDocuments(insights);
    },

    async update({ where, data }) {
      const collection = await getCollection(COLLECTIONS.INDUSTRY_INSIGHTS);
      const query = {};
      
      if (where.industry) query.industry = where.industry;
      if (where.id) query._id = toObjectId(where.id);
      
      await collection.updateOne(query, {
        $set: {
          ...data,
          lastUpdated: new Date()
        }
      });
      
      const insight = await collection.findOne(query);
      return formatDocument(insight);
    }
  },

  // Transaction support (simplified for MongoDB)
  async $transaction(callback) {
    // For MongoDB, we'll run the callback without actual transaction
    // since MongoDB transactions require replica sets
    return await callback(this);
  }
}; 