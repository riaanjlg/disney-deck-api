import { Controller, Get, Param, Query } from '@nestjs/common';
import { CharactersService } from './characters.service.js';
import { PaginatedQueryDto } from '../common/dto/paginated-query.dto.js';
import { CharacterResponseDto } from './dto/characters-response.dto.js';
import { PaginatedResponse } from '../common/dto/paginated-response.dto.js';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async findSummaries(
    @Query() paginatedQueryDto: PaginatedQueryDto,
  ): Promise<PaginatedResponse<CharacterResponseDto>> {
    const result =
      await this.charactersService.findSummaries(paginatedQueryDto);

    return {
      ...result,
      data: result.data.map((character) => new CharacterResponseDto(character)),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.charactersService.findOne(id);

    return new CharacterResponseDto(result);
  }
}
