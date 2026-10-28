import { Module } from '@nestjs/common';
import { TranscriptsController } from './transcripts.controller';
import { PrismaService } from '../prisma/prisma.service';
@Module({ controllers:[TranscriptsController], providers:[PrismaService] })
export class TranscriptsModule {}
