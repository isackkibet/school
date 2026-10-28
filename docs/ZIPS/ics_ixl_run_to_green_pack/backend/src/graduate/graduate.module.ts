import { Module } from '@nestjs/common';
import { GraduateController } from './graduate.controller';
import { PrismaService } from '../prisma/prisma.service';
@Module({ controllers:[GraduateController], providers:[PrismaService] })
export class GraduateModule {}
