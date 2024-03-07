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

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ArtistsModule, AlbumsModule],
  controllers: [
    AppController,
    UsersController,
    ArtistsController,
    AlbumsController,
  ],
  providers: [AppService, UsersService, ArtistsService, AlbumsService],
})
export class AppModule {}
