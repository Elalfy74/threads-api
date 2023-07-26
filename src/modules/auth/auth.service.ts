import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';

import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { TokenService } from 'src/shared/modules/token/token.service';

import { LoginDto, RegisterDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password } = registerDto;
    // Hash password and register user
    try {
      registerDto.password = await hash(password, 12);

      const user = await this.prisma.user.create({
        data: registerDto,
      });

      const { accessToken, refreshToken } = this.generateTokens(user);

      return {
        accessToken,
        refreshToken,
        user,
      };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException(
            `${e.meta?.target} is already registered!`,
          );
        }
      }
      throw e;
    }
  }

  async login({ username, password: hash }: LoginDto) {
    // Check username
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) throw new UnauthorizedException('Invalid Username or Password');

    // Check Password
    const isEqual = await compare(hash, user.password);
    if (!isEqual)
      throw new UnauthorizedException('Invalid Username or Password');

    const { accessToken, refreshToken } = this.generateTokens(user);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  private generateTokens(user: User) {
    const accessToken = this.tokenService.signToken(
      {
        userId: user.id,
        username: user.username,
      },
      'access',
    );

    const refreshToken = this.tokenService.signToken(
      {
        userId: user.id,
        username: user.username,
      },
      'refresh',
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
