import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
