import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfaces/artists.interface';
import { artists, albums } from '../../db/db';
import { CreateUpdateArtistDto } from './dto/artists.dto';
import { Album } from '../albums/interfaces/albums.interface';

@Injectable()
export class ArtistsService {
  findAll(): Artist[] {
    return artists;
  }
  findOneById(id: string): Artist {
    const artist: Artist | undefined = artists.find((a) => a.id === id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist is not found');
    }
  }

  async create(createUserDto: CreateUpdateArtistDto): Promise<Artist> {
    const artist: Artist = new Artist({
      id: uuidv4(),
      name: createUserDto.name,
      grammy: createUserDto.grammy,
    });
    artists.push(artist);
    return artist;
  }

  async update(id: string, updateArtistDto: CreateUpdateArtistDto): Promise<Artist> {
    const artist: Artist | undefined = artists.find((a) => a.id === id);
    if (artist) {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
      return artist;
    } else {
      throw new NotFoundException('Artist is not found');
    }
  }

  async delete(id: string) {
    const artistIndex: number = artists.findIndex((a) => a.id === id);
    if (artistIndex !== -1) {
      const refAlbum: Album | undefined = albums.find(
        (a) => a.artistId === artists[artistIndex].id,
      );
      if (refAlbum) refAlbum.artistId = null;
      artists.splice(artistIndex, 1);
    } else {
      throw new NotFoundException('Artist is not found');
    }
  }
}
