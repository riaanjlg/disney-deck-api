import { Exclude, Expose } from 'class-transformer';
import { IsBoolean } from 'class-validator';

@Exclude()
export class CheckGuessResponseDto {
  @Expose()
  @IsBoolean()
  correct: boolean;
}
