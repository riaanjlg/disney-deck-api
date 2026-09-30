import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CharactersService } from './characters.service.js';
import { PaginatedQueryDto } from '../common/dto/paginated-query.dto.js';
import { CharacterResponseDto } from './dto/characters-response.dto.js';
import { PaginatedResponse } from '../common/dto/paginated-response.dto.js';
import { CheckGuessRequestDto } from './dto/check-guess-request.dto.js';
import { CheckGuessResponseDto } from './dto/check-guess-response.dto.js';

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

  @Get('names')
  async findNames(): Promise<string[]> {
    const result = await this.charactersService.findNames();

    return result;
  }

  @Get('random')
  async findRandom(): Promise<CharacterResponseDto> {
    const result = await this.charactersService.findRandom();

    return new CharacterResponseDto(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CharacterResponseDto> {
    const result = await this.charactersService.findOne(id);

    return new CharacterResponseDto(result);
  }

  @Post('check-guess')
  async checkGuess(
    @Body() dto: CheckGuessRequestDto,
  ): Promise<CheckGuessResponseDto> {
    const result = await this.charactersService.checkGuess(dto.id, dto.name);

    const response = new CheckGuessResponseDto();
    response.correct = result;

    return response;
  }
}
