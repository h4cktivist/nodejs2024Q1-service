import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './interfaces/tracks.interface';
import { favorites, tracks } from '../../db/db';
import { CreateUpdateTrackDto } from './dto/tracks.dto';

@Injectable()
export class TracksService {
  findAll(): Track[] {
    return tracks;
  }

  findOneById(id: string): Track {
    const track: Track | undefined = tracks.find((t) => t.id === id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track is not found');
    }
  }

  async create(createTrackDto: CreateUpdateTrackDto): Promise<Track> {
    const track: Track = new Track({
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });
    tracks.push(track);
    return track;
  }

  async updatePassword(id: string, updateTrackDto: CreateUpdateTrackDto): Promise<Track> {
    const track: Track | undefined = tracks.find((t) => t.id === id);
    if (track) {
      track.name = updateTrackDto.name;
      track.artistId = updateTrackDto.artistId;
      track.albumId = updateTrackDto.albumId;
      track.duration = updateTrackDto.duration;
      return track;
    } else {
      throw new NotFoundException('Track is not found');
    }
  }

  async delete(id: string) {
    const trackIndex: number = tracks.findIndex((t) => t.id === id);
    if (trackIndex !== -1) {
      const favIdIndex: number = favorites.tracks.findIndex(
        (id) => id === tracks[trackIndex].id,
      );
      if (favIdIndex !== -1) favorites.tracks.splice(favIdIndex, 1);
      tracks.splice(trackIndex, 1);
    } else {
      throw new NotFoundException('Track is not found');
    }
  }
}
