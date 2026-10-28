import { Body, Controller, Post } from '@nestjs/common'; import { EligibilityService } from './eligibility.service';
@Controller('eligibility') export class EligibilityController{constructor(private svc:EligibilityService){} @Post('check') check(@Body() body:any){return this.svc.check(body)}}
