import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Puppy } from 'generated/prisma';

@Injectable()
export class PuppyService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string): Promise<Puppy[]> {
    if (status) {
      return this.prisma.puppy.findMany({
        where: { status },
        orderBy: { position: 'asc' },
      });
    }
    return this.prisma.puppy.findMany({
      orderBy: { position: 'asc' },
    });
  }

  async search(searchTerm: string, status?: string): Promise<Puppy[]> {
    const where: any = {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { breed: { contains: searchTerm, mode: 'insensitive' } },
        { ownerName: { contains: searchTerm, mode: 'insensitive' } },
        { ownerPhone: { contains: searchTerm, mode: 'insensitive' } },
        { service: { contains: searchTerm, mode: 'insensitive' } },
        { notes: { contains: searchTerm, mode: 'insensitive' } },
      ],
    };

    if (status) {
      where.status = status;
    }

    return this.prisma.puppy.findMany({
      where,
      orderBy: { position: 'asc' },
    });
  }

  async create(data: Omit<Puppy, 'id' | 'createdAt' | 'updatedAt'>): Promise<Puppy> {
    // Get the current highest position
    const lastPuppy = await this.prisma.puppy.findFirst({
      orderBy: { position: 'desc' },
    });
    
    const position = lastPuppy ? lastPuppy.position + 1 : 0;
    
    return this.prisma.puppy.create({
      data: {
        ...data,
        position,
      },
    });
  }

  async updateStatus(id: string, status: string): Promise<Puppy> {
    const data: any = { status };
    
    if (status === 'in-service') {
      data.serviceStartTime = new Date().toLocaleTimeString();
    } else if (status === 'completed') {
      data.serviceEndTime = new Date().toLocaleTimeString();
    }

    return this.prisma.puppy.update({
      where: { id },
      data,
    });
  }

  async updatePosition(id: string, newPosition: number): Promise<Puppy> {
    // Get the puppy to be moved
    const puppy = await this.prisma.puppy.findUnique({
      where: { id },
    });

    if (!puppy) {
      throw new Error('Puppy not found');
    }

    const oldPosition = puppy.position;

    // Update positions of other puppies
    if (newPosition > oldPosition) {
      // Moving down the list
      await this.prisma.puppy.updateMany({
        where: {
          position: {
            gt: oldPosition,
            lte: newPosition,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
        },
      });
    } else if (newPosition < oldPosition) {
      // Moving up the list
      await this.prisma.puppy.updateMany({
        where: {
          position: {
            gte: newPosition,
            lt: oldPosition,
          },
        },
        data: {
          position: {
            increment: 1,
          },
        },
      });
    }

    // Update the puppy's position
    return this.prisma.puppy.update({
      where: { id },
      data: { position: newPosition },
    });
  }

  async remove(id: string): Promise<Puppy> {
    // Get the puppy to be removed
    const puppy = await this.prisma.puppy.findUnique({
      where: { id },
    });

    if (!puppy) {
      throw new Error('Puppy not found');
    }

    // Update positions of puppies after the removed one
    await this.prisma.puppy.updateMany({
      where: {
        position: {
          gt: puppy.position,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    });

    // Remove the puppy
    return this.prisma.puppy.delete({
      where: { id },
    });
  }
} 
