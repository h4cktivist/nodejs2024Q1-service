import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/users.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return await this.usersService.updatePassword(id, updatePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }
}
