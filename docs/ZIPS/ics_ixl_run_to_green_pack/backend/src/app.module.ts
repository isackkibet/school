import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { NavigationModule } from './navigation/navigation.module';
import { TranscriptsModule } from './transcripts/transcripts.module';
import { CompetencyModule } from './competency/competency.module';
import { GraduateModule } from './graduate/graduate.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ProfilesModule, NavigationModule, TranscriptsModule, CompetencyModule, GraduateModule, IntegrationsModule], providers: [PrismaService] })
export class AppModule {}
