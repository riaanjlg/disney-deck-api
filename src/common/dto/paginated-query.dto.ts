import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PaginatedQueryDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  searchTerm?: string;

  @IsInt()
  @Min(1)
  pageNumber: number;

  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number;
}
