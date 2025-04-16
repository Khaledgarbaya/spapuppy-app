import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Generate Prisma client before running tests
execSync('npx prisma generate', {
  env: {
    ...process.env,
    DATABASE_URL: 'file:./test.db',
  },
});

// This will be called once before all test files are executed
export default async function setup() {
  // Load test environment variables
  process.env.DATABASE_URL = 'file:./test.db';
  process.env.NODE_ENV = 'test';

  try {
    // Reset the database
    execSync('npx prisma migrate reset --force', {
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    });

    // Run migrations
    execSync('npx prisma migrate deploy', {
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    });
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
}

// Create a singleton instance of PrismaClient for tests
const prisma = new PrismaClient();

export async function getTestPrismaClient() {
  return prisma;
}

export async function cleanupDatabase() {
  // Clean up test data - delete puppies first due to foreign key constraint
  await prisma.puppy.deleteMany();
  await prisma.waitingList.deleteMany();
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
  
  // Delete the test database file
  try {
    const dbPath = join(process.cwd(), 'test.db');
    execSync(`rm -f ${dbPath}`);
  } catch (error) {
    console.error('Error deleting test database:', error);
  }
} 
