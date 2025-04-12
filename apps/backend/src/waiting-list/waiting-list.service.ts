import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WaitingListService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateTodayList() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let waitingList = await this.prisma.waitingList.findUnique({
      where: { date: today },
      include: {
        puppies: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!waitingList) {
      waitingList = await this.prisma.waitingList.create({
        data: { date: today },
        include: {
          puppies: {
            orderBy: { position: 'asc' },
          },
        },
      });
    }

    return waitingList;
  }

  async createNewList(date: Date = new Date()) {
    date.setHours(0, 0, 0, 0);

    try {
      // Try to create a new list for the given date
      const newList = await this.prisma.waitingList.create({
        data: { date },
        include: {
          puppies: {
            orderBy: { position: 'asc' },
          },
        },
      });
      return newList;
    } catch (error) {
      // If the error is a unique constraint violation
      if (
        error?.constructor?.name === 'PrismaClientKnownRequestError' &&
        (error as any).code === 'P2002'
      ) {
        // Return the existing list for that date
        const existingList = await this.prisma.waitingList.findUnique({
          where: { date },
          include: {
            puppies: {
              orderBy: { position: 'asc' },
            },
          },
        });

        if (!existingList) {
          throw new ConflictException(
            'Failed to create or retrieve waiting list',
          );
        }

        return existingList;
      }
      throw error;
    }
  }

  async getListByDate(date: Date) {
    return this.prisma.waitingList.findUnique({
      where: { date },
      include: {
        puppies: {
          orderBy: { position: 'asc' },
        },
      },
    });
  }
}
