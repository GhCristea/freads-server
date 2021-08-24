import { IsNotEmpty, IsOptional } from 'class-validator';

export class BookSearchDto {
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
