import { Body, Controller, Post } from '@nestjs/common'; import { FeesService } from './fees.service';
@Controller('fees') export class FeesController{constructor(private svc:FeesService){} @Post('calculate') calculate(@Body() body:any){return this.svc.calculate(body)}}
