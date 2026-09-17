import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Character, CharacterDocument } from './entities/character.entity.js';
import { Model } from 'mongoose';
import { CharacterResponseDto } from './dto/characters-response.dto.js';
import { PaginatedResponse } from '../common/dto/paginated-response.dto.js';
import { PaginatedQueryDto } from '../common/dto/paginated-query.dto.js';
import { DisneyApiCharacter } from '../polling/disney-api.interfaces.js';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async findSummaries(
    paginatedQueryDto: PaginatedQueryDto,
  ): Promise<PaginatedResponse<Character>> {
    const { searchTerm, pageNumber, pageSize } = paginatedQueryDto;

    const query: Record<string, any> = {};

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { films: { $regex: searchTerm, $options: 'i' } },
        { shortFilms: { $regex: searchTerm, $options: 'i' } },
        { tvShows: { $regex: searchTerm, $options: 'i' } },
        { videoGames: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const skip = (pageNumber - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.characterModel.find(query).skip(skip).limit(pageSize).lean().exec(),
      this.characterModel.countDocuments(query).exec(),
    ]);

    return {
      data,
      total,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: string): Promise<Character> {
    const foundCharacter = await this.characterModel.findById(id).lean().exec();

    if (!foundCharacter) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }

    return foundCharacter;
  }

  async upsertMany(characters: DisneyApiCharacter[]): Promise<number> {
    const operations = characters.map((character) => ({
      updateOne: {
        filter: { externalId: character._id },
        update: {
          externalId: character._id,
          name: character.name,
          imageUrl: character.imageUrl,
          films: character.films,
          shortFilms: character.shortFilms,
          tvShows: character.tvShows,
          videoGAmes: character.videoGames,
          enemies: character.enemies,
          allies: character.allies,
        },
        upsert: true,
      },
    }));

    if (operations.length === 0) {
      return 0;
    }

    const result = await this.characterModel.bulkWrite(operations);
    return result.modifiedCount + result.upsertedCount;
  }
}
