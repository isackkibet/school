import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
@Module({ imports:[JwtModule.register({ secret: process.env.JWT_SECRET || 'dev_secret', signOptions:{ expiresIn: process.env.JWT_EXPIRES_IN || '15m' }})], controllers:[AuthController], providers:[AuthService, PrismaService], exports:[AuthService] })
export class AuthModule {}
