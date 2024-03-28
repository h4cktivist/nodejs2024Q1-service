import { Artist } from '../../artists/interfaces/artists.interface';
import { Album } from '../../albums/interfaces/albums.interface';
import { Track } from '../../tracks/interfaces/tracks.interface';

export class Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(partial: Partial<Favorites>) {
    Object.assign(this, partial);
  }
}

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(partial: Partial<FavoritesResponse>) {
    Object.assign(this, partial);
  }
}
