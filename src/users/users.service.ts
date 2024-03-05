import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.interface';
import { users } from '../../db/users';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';

@Injectable()
export class UsersService {
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
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(newUser);
    return newUser;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const user: User | undefined = users.find((u) => u.id === id);
    if (user) {
      if (user.password === updatePasswordDto.oldPassword) {
        user.password = updatePasswordDto.newPassword;
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
