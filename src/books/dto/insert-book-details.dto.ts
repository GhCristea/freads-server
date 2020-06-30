import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class InsertBookDetailsDto {
  @IsNotEmpty()
  @IsString()
  book_name: string;

  authors: string;

  @IsOptional()
  categories: string;
}
