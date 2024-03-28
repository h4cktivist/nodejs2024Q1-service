import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  artistId: string | null;
}
