import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from './interfaces/favs.interface';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.deleteArtist(id);
  }
}
