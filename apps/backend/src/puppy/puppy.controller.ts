import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PuppyService } from './puppy.service';
import { Puppy } from '@prisma/client';
@Controller('puppies')
export class PuppyController {
  constructor(private readonly puppyService: PuppyService) {}

  @Get()
  async findAll(@Query('status') status?: string): Promise<Puppy[]> {
    return this.puppyService.findAll(status);
  }

  @Get('search')
  async search(
    @Query('term') searchTerm: string,
    @Query('status') status?: string,
  ): Promise<Puppy[]> {
    return this.puppyService.search(searchTerm, status);
  }

  @Post()
  async create(@Body() data: Omit<Puppy, 'id' | 'createdAt' | 'updatedAt'>): Promise<Puppy> {
    return this.puppyService.create(data);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Puppy> {
    return this.puppyService.updateStatus(id, status);
  }

  @Put(':id/position')
  async updatePosition(
    @Param('id') id: string,
    @Body('position') position: number,
  ): Promise<Puppy> {
    return this.puppyService.updatePosition(id, position);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Puppy> {
    return this.puppyService.remove(id);
  }
} 
