import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class BookDetailsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  authors: string[];

  @IsOptional()
  categories: string[];
}
