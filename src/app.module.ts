import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ArtistsModule } from './artists/artists.module';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';
import { AlbumsModule } from './albums/albums.module';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';
import { TracksModule } from './tracks/tracks.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';
import { FavsModule } from './favs/favs.module';
import { FavsController } from './favs/favs.controller';
import { FavsService } from './favs/favs.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ArtistsController,
    AlbumsController,
    TracksController,
    FavsController,
  ],
  providers: [
    AppService,
    UsersService,
    ArtistsService,
    AlbumsService,
    TracksService,
    FavsService,
  ],
})
export class AppModule {}
