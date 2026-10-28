import { Module } from '@nestjs/common';
import { CompetencyController } from './competency.controller';
import { PrismaService } from '../prisma/prisma.service';
@Module({ controllers:[CompetencyController], providers:[PrismaService] })
export class CompetencyModule {}
