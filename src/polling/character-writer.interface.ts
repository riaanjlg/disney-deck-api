import { DisneyApiCharacter } from './disney-api.interfaces.js';

export interface CharacterWriter {
  upsertMany(characters: DisneyApiCharacter[]): Promise<number>;
}

export const CHARACTER_WRITER = Symbol('CHARACTER_WRITER');
