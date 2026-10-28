import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Controller('me')
export class TranscriptsController {
  constructor(private prisma: PrismaService) {}
  @Get('transcript') async get(@Query('icsId') icsId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where:{ icsId }, include:{ profile:true }});
    const items = await this.prisma.transcriptItem.findMany({ where:{ userId:user.id }, orderBy:{ createdAt:'asc' }});
    return { student: user.profile, items };
  }
}
@Controller('transcripts')
export class TranscriptWriteController {
  constructor(private prisma: PrismaService) {}
  @Post('items') async create(@Body() dto:any) {
    const user = await this.prisma.user.findUniqueOrThrow({ where:{ icsId: dto.icsId }});
    return this.prisma.transcriptItem.create({ data:{ userId:user.id, type:dto.type, title:dto.title, unitName:dto.unitName, courseOfferingId:dto.courseOfferingId, score:dto.score, grade:dto.grade, status:dto.status || 'RECORDED', evidenceUrl:dto.evidenceUrl, metadata:dto.metadata }});
  }
}
