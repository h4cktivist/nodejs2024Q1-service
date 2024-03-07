import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './interfaces/artists.interface';
import { CreateUpdateArtistDto } from './dto/artists.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistsService.findOneById(id);
  }

  @Post()
  async create(@Body() createArtistDto: CreateUpdateArtistDto): Promise<Artist> {
    return await this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: CreateUpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistsService.delete(id);
  }
}
