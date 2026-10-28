import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('register-prospect') registerProspect(@Body() dto: any) { return this.auth.registerProspect(dto); }
  @Post('login') login(@Body() dto: { emailOrPhone: string; password: string }) { return this.auth.login(dto.emailOrPhone, dto.password); }
  @Post('refresh') refresh(@Body() dto: { refreshToken: string }) { return this.auth.refresh(dto.refreshToken); }
}

@Controller('me')
export class MeController {
  constructor(private readonly auth: AuthService) {}
  @Get() me(@Req() req: any) { return this.auth.unsafeDemoMe(req.headers.authorization); }
}
