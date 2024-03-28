import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { artists, albums, tracks, favorites } from '../../db/db';
import { FavoritesResponse } from './interfaces/favs.interface';
import { Artist } from '../artists/interfaces/artists.interface';
import { Album } from '../albums/interfaces/albums.interface';
import { Track } from '../tracks/interfaces/tracks.interface';

@Injectable()
export class FavsService {
  findAll(): FavoritesResponse {
    const favArtists: Artist[] = favorites.artists.flatMap((id) => {
      return artists.filter((a) => a.id === id);
    });
    const favAlbums: Album[] = favorites.albums.flatMap((id) => {
      return albums.filter((a) => a.id === id);
    });
    const favTracks: Track[] = favorites.tracks.flatMap((id) => {
      return tracks.filter((t) => t.id === id);
    });
    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  async addTrack(id: string) {
    const track: Track | undefined = tracks.find((t) => t.id === id);
    if (track) {
      favorites.tracks.push(id);
      return { message: 'The track was successfully added to favorites' };
    } else {
      throw new UnprocessableEntityException(
        'The track with such ID is not found',
      );
    }
  }

  async deleteTrack(id: string) {
    const trackIndex: number = favorites.tracks.findIndex((i) => i === id);
    if (trackIndex !== -1) {
      favorites.tracks.splice(trackIndex, 1);
    } else {
      throw new NotFoundException('The track is not found in favorites');
    }
  }

  async addAlbum(id: string) {
    const album: Album | undefined = albums.find((a) => a.id === id);
    if (album) {
      favorites.albums.push(id);
      return { message: 'The album was successfully added to favorites' };
    } else {
      throw new UnprocessableEntityException(
        'The album with such ID is not found',
      );
    }
  }

  async deleteAlbum(id: string) {
    const albumIndex: number = favorites.albums.findIndex((i) => i === id);
    if (albumIndex !== -1) {
      favorites.albums.splice(albumIndex, 1);
    } else {
      throw new NotFoundException('The album is not found in favorites');
    }
  }

  async addArtist(id: string) {
    const artist: Artist | undefined = artists.find((a) => a.id === id);
    if (artist) {
      favorites.artists.push(id);
      return { message: 'The artist was successfully added to favorites' };
    } else {
      throw new UnprocessableEntityException(
        'The artist with such ID is not found',
      );
    }
  }

  async deleteArtist(id: string) {
    const artistIndex: number = favorites.artists.findIndex((i) => i === id);
    if (artistIndex !== -1) {
      favorites.artists.splice(artistIndex, 1);
    } else {
      throw new NotFoundException('The artist is not found in favorites');
    }
  }
}
