import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CheckGuessRequestDto {
  @IsMongoId()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
