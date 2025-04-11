import { Module } from '@nestjs/common';
import { PuppyService } from './puppy.service';
import { PuppyController } from './puppy.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { WaitingListModule } from '../waiting-list/waiting-list.module';

@Module({
  imports: [PrismaModule, WaitingListModule],
  controllers: [PuppyController],
  providers: [PuppyService],
  exports: [PuppyService],
})
export class PuppyModule {} 
