import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Controller('me')
export class NavigationController {
  constructor(private prisma: PrismaService) {}
  @Get('navigation') async navigation(@Query('icsId') icsId: string) {
    const user = await this.prisma.user.findUnique({ where:{ icsId }, include:{ profile:true }});
    const mode = user?.profile?.modeOfStudy;
    const tiles = await this.prisma.navigationTile.findMany({ where:{ isActive:true }, orderBy:{ displayOrder:'asc' }});
    return tiles.filter(t => {
      if (t.code === 'classes_ics_live') return mode === 'PHYSICAL' || mode === 'LIVE_VIRTUAL' || mode === 'HYBRID';
      if (t.code === 'ai_classroom') return mode === 'AI_VIRTUAL' || mode === 'HYBRID';
      return true;
    });
  }
  @Get('access') async access(@Query('icsId') icsId: string) {
    const user = await this.prisma.user.findUnique({ where:{ icsId }});
    if (!user) return [];
    return this.prisma.systemAccess.findMany({ where:{ userId:user.id, enabled:true }});
  }
}
