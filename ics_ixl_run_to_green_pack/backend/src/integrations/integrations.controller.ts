import { Controller, Get } from '@nestjs/common';
@Controller('integrations')
export class IntegrationsController {
  @Get('system-map') map() {
    return {
      IXL: ['Auth','Unified Profile','Navigation','Transcript','Competency Passport','Graduate Handoff'],
      SmartProspectus: ['Courses','Fees','Requirements','Practical Requirements'],
      ICSLive: ['Academic Operations','Student CRM','Exams','Fees Payment','HR','Finance','Governance'],
      SmartLecturer: ['AI Virtual Learning','AI Physical Classroom Support','AI Tutor'],
      AIELibrary: ['Reference Materials','Notes','Past Papers','Practical Guides'],
      YohPalBrain: ['OpenAI Gateway','AI Orchestration','Recommendations','Extraction','Assessment Generation'],
      YohPalJobsHustle: ['Employment','Internships','Gig Work','Graduate Opportunities']
    };
  }
}
