import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from './interfaces/favs.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return this.favsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addTrack(id);
  }

  @UseGuards(AuthGuard)
  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.deleteTrack(id);
  }

  @UseGuards(AuthGuard)
  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.deleteAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addArtist(id);
  }

  @UseGuards(AuthGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.deleteArtist(id);
  }
}
