# MongoDB Migration Setup Guide

## Overview

This project has been migrated from Prisma (PostgreSQL) to MongoDB. All database operations now use the MongoDB driver directly.

## Prerequisites

1. MongoDB instance (local or cloud)
2. Node.js and npm installed

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create or update your `.env.local` file with MongoDB connection string:

```env
# Replace with your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/ai-career-coach
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-career-coach?retryWrites=true&w=majority
```

### 3. Database Setup

Run the database setup script to create collections and indexes:

```bash
node lib/setup-db.js
```

### 4. Start Development Server

```bash
npm run dev
```

## Database Schema

### Collections

#### Users

- `_id`: ObjectId (auto-generated)
- `clerkUserId`: String (unique, Clerk user ID)
- `email`: String (unique)
- `name`: String (optional)
- `imageUrl`: String (optional)
- `industry`: String (optional)
- `bio`: String (optional)
- `experience`: Number (optional, years of experience)
- `skills`: Array of Strings
- `createdAt`: Date
- `updatedAt`: Date

#### Assessments

- `_id`: ObjectId (auto-generated)
- `userId`: String (reference to user)
- `quizScore`: Number
- `questions`: Array of Objects
- `category`: String
- `improvementTip`: String (optional)
- `createdAt`: Date
- `updatedAt`: Date

#### Resumes

- `_id`: ObjectId (auto-generated)
- `userId`: String (unique per user)
- `content`: String (markdown)
- `atsScore`: Number (optional)
- `feedback`: String (optional)
- `createdAt`: Date
- `updatedAt`: Date

#### Cover Letters

- `_id`: ObjectId (auto-generated)
- `userId`: String (reference to user)
- `content`: String (markdown)
- `jobDescription`: String (optional)
- `companyName`: String
- `jobTitle`: String
- `status`: String (default: "draft")
- `createdAt`: Date
- `updatedAt`: Date

#### Industry Insights

- `_id`: ObjectId (auto-generated)
- `industry`: String (unique)
- `salaryRanges`: Array of Objects
- `growthRate`: Number
- `demandLevel`: String
- `topSkills`: Array of Strings
- `marketOutlook`: String
- `keyTrends`: Array of Strings
- `recommendedSkills`: Array of Strings
- `lastUpdated`: Date
- `nextUpdate`: Date

## Key Changes Made

### 1. Database Connection

- Replaced `lib/prisma.js` with `lib/mongodb.js`
- Created `lib/db.js` with MongoDB operations

### 2. Updated Files

- All action files now import from `@/lib/db` instead of `@/lib/prisma`
- Removed Prisma schema and migrations
- Added MongoDB schema documentation

### 3. Database Operations

- All queries now use MongoDB syntax
- ObjectId handling for document IDs
- Proper indexing for performance

## Migration Notes

### Data Migration

If you have existing data in PostgreSQL, you'll need to export it and import to MongoDB:

1. Export data from PostgreSQL
2. Transform data to match MongoDB schema
3. Import to MongoDB collections

### Environment Variables

Update your environment variables:

- Remove `DATABASE_URL` (PostgreSQL)
- Add `MONGODB_URI` (MongoDB)

### Development

The application should work exactly the same as before, but now uses MongoDB as the backend database.

## Troubleshooting

### Connection Issues

- Verify MongoDB is running
- Check connection string format
- Ensure network access to MongoDB instance

### Index Issues

- Run setup script again: `node lib/setup-db.js`
- Check MongoDB logs for index creation errors

### Data Issues

- Verify collection names match `COLLECTIONS` constant in `lib/mongodb.js`
- Check document structure matches schema
