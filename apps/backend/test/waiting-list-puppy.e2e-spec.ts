import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { getTestPrismaClient, cleanupDatabase, disconnectDatabase } from './test-setup';

describe('WaitingList and Puppy Controllers (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaClient;

  beforeAll(async () => {
    prismaService = await getTestPrismaClient();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await cleanupDatabase();
    await app.close();
    await disconnectDatabase();
  });

  describe('Waiting List Controller', () => {
    it('should create and get today\'s waiting list', async () => {
      const response = await request(app.getHttpServer())
        .get('/waiting-list/today')
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('date');
      expect(response.body.puppies).toEqual([]);
    });

    it('should create a new waiting list for a specific date', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const dateStr = tomorrow.toISOString();

      const response = await request(app.getHttpServer())
        .post(`/waiting-list/new?date=${dateStr}`)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('date');
      const responseDate = new Date(response.body.date);
      responseDate.setHours(0, 0, 0, 0);
      expect(responseDate.toISOString()).toBe(tomorrow.toISOString());
    });
  });

  describe('Puppy Controller', () => {
    let waitingListId: string;
    let puppyId: string;

    beforeAll(async () => {
      // Create a waiting list for testing using the API
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateStr = today.toISOString();
      
      const response = await request(app.getHttpServer())
        .post(`/waiting-list/new?date=${dateStr}`)
        .expect(201);
      
      waitingListId = response.body.id;
    });

    afterAll(async () => {
      await cleanupDatabase();
    });

    it('should create a new puppy', async () => {
      const puppyData = {
        name: 'Test Puppy',
        breed: 'Golden Retriever',
        ownerName: 'John Doe',
        ownerPhone: '1234567890',
        service: 'Grooming',
        notes: 'Test notes',
        status: 'waiting',
        arrivalTime: new Date().toLocaleTimeString(),
      };

      const response = await request(app.getHttpServer())
        .post('/puppies')
        .send(puppyData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(puppyData.name);
      expect(response.body.position).toBe(0);
      puppyId = response.body.id;
    });

    it('should get all puppies', async () => {
      const response = await request(app.getHttpServer())
        .get('/puppies')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should search puppies', async () => {
      const response = await request(app.getHttpServer())
        .get('/puppies/search?term=Test')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].name).toBe('Test Puppy');
    });

    it('should update puppy status', async () => {
      const response = await request(app.getHttpServer())
        .put(`/puppies/${puppyId}/status`)
        .send({ status: 'in_progress' })
        .expect(200);

      expect(response.body.status).toBe('in_progress');
      expect(response.body).toHaveProperty('serviceStartTime');
    });

    it('should update puppy position', async () => {
      const response = await request(app.getHttpServer())
        .put(`/puppies/${puppyId}/position`)
        .send({ position: 1 })
        .expect(200);

      expect(response.body.position).toBe(1);
    });

    it('should delete a puppy', async () => {
      await request(app.getHttpServer())
        .delete(`/puppies/${puppyId}`)
        .expect(200);

      // Verify the puppy is deleted
      const response = await request(app.getHttpServer())
        .get('/puppies')
        .expect(200);

      expect(response.body.find((p: any) => p.id === puppyId)).toBeUndefined();
    });
  });
}); 
