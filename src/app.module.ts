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
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoggingModule } from './logging/logging.module';
import config from './config/configuration';
import { CustomLogger } from './logging/logging.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavsModule,
    AuthModule,
    JwtModule,
    LoggingModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ArtistsController,
    AlbumsController,
    TracksController,
    FavsController,
    AuthController,
  ],
  providers: [
    AppService,
    UsersService,
    ArtistsService,
    AlbumsService,
    TracksService,
    FavsService,
    AuthService,
    JwtService,
    CustomLogger,
  ],
})
export class AppModule {}
