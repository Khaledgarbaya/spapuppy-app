import { Controller, Get, Post, Query } from '@nestjs/common';
import { WaitingListService } from './waiting-list.service';

@Controller('waiting-list')
export class WaitingListController {
  constructor(private readonly waitingListService: WaitingListService) {}

  @Get('today')
  async getTodayList() {
    return this.waitingListService.getOrCreateTodayList();
  }

  @Get('by-date')
  async getListByDate(@Query('date') dateStr: string) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return this.waitingListService.getListByDate(date);
  }

  @Get('exists')
  async doesListExist(@Query('date') dateStr: string) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return this.waitingListService.doesListExist(date);
  }

  @Post('new')
  async createNewList(@Query('date') dateStr?: string) {
    const date = dateStr ? new Date(dateStr) : new Date();
    date.setHours(0, 0, 0, 0);
    return this.waitingListService.createNewList(date);
  }
}
