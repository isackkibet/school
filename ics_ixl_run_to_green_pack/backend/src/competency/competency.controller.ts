import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Controller('me')
export class CompetencyController {
  constructor(private prisma: PrismaService) {}
  @Get('competency-passport') async get(@Query('icsId') icsId:string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where:{ icsId }, include:{ profile:true }});
    const competencies = await this.prisma.competencyPassportItem.findMany({ where:{ userId:user.id }, orderBy:{ createdAt:'asc' }});
    return { student:user.profile, competencies };
  }
}
@Controller('competency-passport')
export class CompetencyWriteController {
  constructor(private prisma: PrismaService) {}
  @Post('items') async create(@Body() dto:any) {
    const user = await this.prisma.user.findUniqueOrThrow({ where:{ icsId: dto.icsId }});
    return this.prisma.competencyPassportItem.create({ data:{ userId:user.id, category:dto.category, skillName:dto.skillName, level:dto.level, evidenceUrl:dto.evidenceUrl, verifiedBy:dto.verifiedBy, verifiedAt:dto.verifiedAt ? new Date(dto.verifiedAt) : undefined, metadata:dto.metadata }});
  }
}
