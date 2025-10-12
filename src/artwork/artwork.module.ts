import { Module } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { ArtworkController } from './artwork.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ArtworkController],
  providers: [ArtworkService, PrismaService],
})
export class ArtworkModule {}
