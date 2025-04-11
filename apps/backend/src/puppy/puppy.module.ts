import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PuppyService } from './puppy.service';
import { PuppyController } from './puppy.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PuppyController],
  providers: [PuppyService],
  exports: [PuppyService],
})
export class PuppyModule {} 
