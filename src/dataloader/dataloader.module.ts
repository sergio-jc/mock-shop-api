import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [PrismaModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
