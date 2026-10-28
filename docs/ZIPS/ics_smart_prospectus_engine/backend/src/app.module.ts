import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { FeesController } from './fees/fees.controller';
import { FeesService } from './fees/fees.service';
import { EligibilityController } from './eligibility/eligibility.controller';
import { EligibilityService } from './eligibility/eligibility.service';
import { RecommendationsController } from './recommendations/recommendations.controller';
import { RecommendationsService } from './recommendations/recommendations.service';
import { CoursesController } from './courses/courses.controller';
@Module({imports:[ConfigModule.forRoot({isGlobal:true})],controllers:[CoursesController,FeesController,EligibilityController,RecommendationsController],providers:[PrismaService,FeesService,EligibilityService,RecommendationsService]})
export class AppModule {}
