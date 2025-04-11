import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuppyModule } from './puppy/puppy.module';
import { PrismaModule } from './prisma/prisma.module';
import { WaitingListModule } from './waiting-list/waiting-list.module';

@Module({
  imports: [PrismaModule, PuppyModule, WaitingListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
