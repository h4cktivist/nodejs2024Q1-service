import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
