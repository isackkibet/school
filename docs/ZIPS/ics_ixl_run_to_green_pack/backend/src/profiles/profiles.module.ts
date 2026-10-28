import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { PrismaService } from '../prisma/prisma.service';
@Module({ controllers:[ProfilesController], providers:[PrismaService] })
export class ProfilesModule {}
