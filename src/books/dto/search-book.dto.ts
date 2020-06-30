import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class BookDetailsDto {
  // @IsString()
  // name: string;

  // @IsString()
  // authors: string;

  // @IsArray()
  // categories: string[];

  @IsNotEmpty()
  @IsOptional()
  search: string;
}
