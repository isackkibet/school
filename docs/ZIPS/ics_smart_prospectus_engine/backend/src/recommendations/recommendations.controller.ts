import { Body, Controller, Post } from '@nestjs/common'; import { RecommendationsService } from './recommendations.service';
@Controller('ai/course-recommendations') export class RecommendationsController{constructor(private svc:RecommendationsService){} @Post() recommend(@Body() body:any){return this.svc.recommend(body)}}
