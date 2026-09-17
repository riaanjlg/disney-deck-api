import { Exclude, Expose, Transform } from 'class-transformer';
import { Character } from '../entities/character.entity.js';

@Exclude()
export class CharacterResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  id: string;

  @Expose()
  name: string;

  @Expose()
  imageUrl: string;

  @Expose()
  films: string[];

  @Expose()
  shortFilms: string[];

  @Expose()
  tvShows: string[];

  @Expose()
  videoGames: string[];

  @Expose()
  enemies: string[];

  @Expose()
  allies: string[];

  constructor(partial: Partial<Character>) {
    Object.assign(this, partial);
  }
}
