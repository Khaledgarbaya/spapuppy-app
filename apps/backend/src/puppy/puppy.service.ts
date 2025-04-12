import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WaitingListService } from '../waiting-list/waiting-list.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PuppyService {
  constructor(
    private prisma: PrismaService,
    private waitingListService: WaitingListService,
  ) {}

  async findAll(status?: string): Promise<Prisma.PuppyGetPayload<{}>[]> {
    const todayList = await this.waitingListService.getOrCreateTodayList();

    const where: Prisma.PuppyWhereInput = {
      waitingListId: todayList.id,
      ...(status ? { status } : {}),
    };

    return this.prisma.puppy.findMany({
      where,
      orderBy: { position: 'asc' },
    });
  }

  async search(
    searchTerm: string,
    status?: string,
  ): Promise<Prisma.PuppyGetPayload<{}>[]> {
    const todayList = await this.waitingListService.getOrCreateTodayList();

    const where: Prisma.PuppyWhereInput = {
      waitingListId: todayList.id,
      OR: [
        { name: { contains: searchTerm } },
        { breed: { contains: searchTerm } },
        { ownerName: { contains: searchTerm } },
        { ownerPhone: { contains: searchTerm } },
        { service: { contains: searchTerm } },
        { notes: { contains: searchTerm } },
      ],
      ...(status ? { status } : {}),
    };

    return this.prisma.puppy.findMany({
      where,
      orderBy: { position: 'asc' },
    });
  }

  async create(
    data: Omit<
      Prisma.PuppyCreateInput,
      'id' | 'createdAt' | 'updatedAt' | 'waitingList' | 'date'
    >,
  ): Promise<Prisma.PuppyGetPayload<{}>> {
    const todayList = await this.waitingListService.getOrCreateTodayList();

    // Get the current highest position
    const lastPuppy = await this.prisma.puppy.findFirst({
      where: { waitingListId: todayList.id },
      orderBy: { position: 'desc' },
    });

    const position = lastPuppy ? lastPuppy.position + 1 : 0;

    return this.prisma.puppy.create({
      data: {
        ...data,
        position,
        waitingListId: todayList.id,
      },
    });
  }

  async updateStatus(
    id: string,
    status: string,
  ): Promise<Prisma.PuppyGetPayload<{}>> {
    const data: Prisma.PuppyUpdateInput = { status };

    if (status === 'in_progress') {
      data.serviceStartTime = new Date().toLocaleTimeString();
    } else if (status === 'completed') {
      data.serviceEndTime = new Date().toLocaleTimeString();
    }

    return this.prisma.puppy.update({
      where: { id },
      data,
    });
  }

  async updatePosition(
    id: string,
    newPosition: number,
  ): Promise<Prisma.PuppyGetPayload<{}>> {
    const todayList = await this.waitingListService.getOrCreateTodayList();

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
          waitingListId: todayList.id,
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
          waitingListId: todayList.id,
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

  async remove(id: string): Promise<Prisma.PuppyGetPayload<{}>> {
    const todayList = await this.waitingListService.getOrCreateTodayList();

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
        waitingListId: todayList.id,
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
