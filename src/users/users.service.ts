import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './interfaces/user.interface';
import { users } from '../../db/db';
import { CreateUserDto, UpdatePasswordDto } from './dto/users.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}

  findAll(): User[] {
    return users;
  }

  findOneById(id: string): User {
    const user: User | undefined = users.find((u) => u.id === id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User is not found');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt: number = parseInt(this.configService.get('CRYPT_SALT'));
    const hashedPassword: string = bcrypt.hashSync(
      createUserDto.password,
      salt,
    );
    const user: User = new User({
      id: uuidv4(),
      login: createUserDto.login,
      password: hashedPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    users.push(user);
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const user: User | undefined = users.find((u) => u.id === id);
    if (user) {
      if (await bcrypt.compare(updatePasswordDto.oldPassword, user.password)) {
        const salt: number = parseInt(this.configService.get('CRYPT_SALT'));
        const hashedPassword: string = bcrypt.hashSync(
          updatePasswordDto.newPassword,
          salt,
        );
        user.password = hashedPassword;
        user.version += 1;
        user.updatedAt = Date.now();
        return user;
      } else {
        throw new ForbiddenException('Old password is incorrect!');
      }
    } else {
      throw new NotFoundException('User is not found');
    }
  }

  async delete(id: string) {
    const userIndex: number = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
    } else {
      throw new NotFoundException('User is not found');
    }
  }
}
