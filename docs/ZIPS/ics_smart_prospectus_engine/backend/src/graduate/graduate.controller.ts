import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Controller('graduate/handoff')
export class GraduateController {
  constructor(private prisma: PrismaService) {}
  private async buildProfile(icsId:string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where:{ icsId }, include:{ profile:true, transcripts:true, competencies:true }});
    return { icsId:user.icsId, status:user.status, profile:user.profile, transcript:user.transcripts, competencies:user.competencies };
  }
  @Post('jobs') async jobs(@Body() dto:{icsId:string}) {
    const payload = await this.buildProfile(dto.icsId);
    const handoff = await this.prisma.graduateHandoff.create({ data:{ userId: payload.profile!.userId, target:'YOHPAL_JOBS', payload }});
    return { message:'Graduate profile queued for YohPal Jobs', handoff };
  }
  @Post('hustle') async hustle(@Body() dto:{icsId:string}) {
    const payload = await this.buildProfile(dto.icsId);
    const handoff = await this.prisma.graduateHandoff.create({ data:{ userId: payload.profile!.userId, target:'YOHPAL_HUSTLE', payload }});
    return { message:'Graduate profile queued for YohPal Hustle', handoff };
  }
}
