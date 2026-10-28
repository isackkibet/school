import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { PrismaService } from '../prisma/prisma.service';
@Module({ controllers:[NavigationController], providers:[PrismaService] })
export class NavigationModule {}
