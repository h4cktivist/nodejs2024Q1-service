import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfaces/albums.interface';
import { albums, favorites, tracks } from '../../db/db';
import { CreateUpdateAlbumDto } from './dto/albums.dto';
import { Track } from '../tracks/interfaces/tracks.interface';

@Injectable()
export class AlbumsService {
  findAll(): Album[] {
    return albums;
  }

  findOneById(id: string): Album {
    const album: Album | undefined = albums.find((a) => a.id === id);
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album is not found');
    }
  }

  async create(createAlbumDto: CreateUpdateAlbumDto): Promise<Album> {
    const album: Album = new Album({
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });
    albums.push(album);
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    const album: Album | undefined = albums.find((a) => a.id === id);
    if (album) {
      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      album.artistId = updateAlbumDto.artistId;
      return album;
    } else {
      throw new NotFoundException('Album is not found');
    }
  }

  async delete(id: string) {
    const albumIndex: number = albums.findIndex((a) => a.id === id);
    if (albumIndex !== -1) {
      const refTrack: Track | undefined = tracks.find(
        (t) => t.albumId === albums[albumIndex].id,
      );
      const favIdIndex: number = favorites.albums.findIndex(
        (id) => id === albums[albumIndex].id,
      );
      if (refTrack) refTrack.albumId = null;
      if (favIdIndex) favorites.albums.splice(favIdIndex, 1);
      albums.splice(albumIndex, 1);
    } else {
      throw new NotFoundException('Album is not found');
    }
  }
}
