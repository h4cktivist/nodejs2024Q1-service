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
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './interfaces/tracks.interface';
import { CreateUpdateTrackDto } from './dto/tracks.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.tracksService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTrackDto: CreateUpdateTrackDto): Promise<Track> {
    return await this.tracksService.create(createTrackDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: CreateUpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.updatePassword(id, updateTrackDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tracksService.delete(id);
  }
}
