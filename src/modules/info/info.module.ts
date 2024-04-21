import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [InfoController],
  providers: [InfoService, PrismaService],
  exports: [InfoService],
})
export class InfoModule {}
