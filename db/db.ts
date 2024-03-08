import { User } from '../src/users/interfaces/user.interface';
import { Artist } from '../src/artists/interfaces/artists.interface';
import { Album } from '../src/albums/interfaces/albums.interface';
import { Track } from '../src/tracks/interfaces/tracks.interface';
import { Favorites } from '../src/favs/interfaces/favs.interface';

export const users: User[] = [];
export const artists: Artist[] = [];

export const albums: Album[] = [];

export const tracks: Track[] = [];

export const favorites: Favorites = new Favorites({
  artists: [],
  albums: [],
  tracks: [],
});
