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
import { TracksService } from './tracks.service';
import { Track } from './interfaces/tracks.interface';
import { CreateUpdateTrackDto } from './dto/tracks.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.tracksService.findOneById(id);
  }

  @Post()
  async create(@Body() createTrackDto: CreateUpdateTrackDto): Promise<Track> {
    return await this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: CreateUpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.updatePassword(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tracksService.delete(id);
  }
}
