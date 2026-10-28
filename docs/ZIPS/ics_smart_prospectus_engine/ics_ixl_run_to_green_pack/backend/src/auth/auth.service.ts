import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  private async nextIcsId() {
    const count = await this.prisma.user.count();
    return `ICS-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
  }

  async registerProspect(dto: any) {
    if (!dto.fullName) throw new BadRequestException('fullName is required');
    const passwordHash = dto.password ? await bcrypt.hash(dto.password, 10) : undefined;
    const user = await this.prisma.user.create({
      data: {
        icsId: await this.nextIcsId(), email: dto.email, phone: dto.phone, passwordHash,
        profile: { create: { fullName: dto.fullName, courseOfferingId: dto.courseOfferingId, courseName: dto.courseName, level: dto.level, modeOfStudy: dto.modeOfStudy, campus: dto.campus } }
      }, include: { profile: true }
    });
    await this.prisma.auditLog.create({ data: { actorUserId: user.id, action: 'REGISTER_PROSPECT', entity: 'User', entityId: user.id }});
    return { user, tokens: await this.issueTokens(user.id, user.icsId) };
  }

  async login(emailOrPhone: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { OR: [{ email: emailOrPhone }, { phone: emailOrPhone }] }, include: { roles: { include: { role: true } }, profile: true }});
    if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
    return { user, tokens: await this.issueTokens(user.id, user.icsId) };
  }

  async issueTokens(userId: string, icsId: string) {
    const accessToken = await this.jwt.signAsync({ sub: userId, icsId });
    const refreshToken = `${userId}.${crypto.randomUUID()}`;
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 30);
    await this.prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt: new Date(Date.now() + days * 86400000) }});
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const userId = refreshToken.split('.')[0];
    const user = await this.prisma.user.findUnique({ where: { id: userId }});
    if (!user) throw new UnauthorizedException('Invalid refresh token');
    return this.issueTokens(user.id, user.icsId);
  }

  async unsafeDemoMe(authHeader?: string) {
    const token = authHeader?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException('Missing token');
    const payload: any = await this.jwt.verifyAsync(token, { secret: process.env.JWT_SECRET || 'dev_secret' });
    return this.prisma.user.findUnique({ where: { id: payload.sub }, include: { profile: true, roles: { include: { role: true } } }});
  }
}
