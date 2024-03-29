import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/user.interface';
import { users } from '../../db/db';
import * as dotenv from 'dotenv';
import process from 'process';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(login: string, password: string) {
    const user: User | undefined = users.find((u) => u.login === login);
    if (user?.password !== password) {
      throw new ForbiddenException(
        'User is not found or password is incorrect!',
      );
    }

    const payload = { userId: user.id, login: user.login };
    return {
      userId: user.id,
      login: user.login,
      accessToken: await this.jwtService.signAsync(payload, {
        secret: 'secret123123',
        expiresIn: '60s',
      }),
    };
  }
}
