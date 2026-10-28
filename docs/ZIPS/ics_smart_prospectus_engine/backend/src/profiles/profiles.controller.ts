import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Controller('profiles')
export class ProfilesController {
  constructor(private prisma: PrismaService) {}
  @Get(':icsId') async byIcsId(@Param('icsId') icsId: string) { return this.prisma.user.findUnique({ where:{ icsId }, include:{ profile:true, roles:{ include:{ role:true }}}}); }
  @Patch(':icsId') async update(@Param('icsId') icsId: string, @Body() dto: any) {
    const user = await this.prisma.user.findUniqueOrThrow({ where:{ icsId }, include:{ profile:true }});
    return this.prisma.studentProfile.update({ where:{ userId: user.id }, data: dto });
  }
}
