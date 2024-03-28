import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './interfaces/albums.interface';
import { CreateUpdateAlbumDto } from './dto/albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumsService.findOneById(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateUpdateAlbumDto): Promise<Album> {
    return await this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumsService.delete(id);
  }
}
