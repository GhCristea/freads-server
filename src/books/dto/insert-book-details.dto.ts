import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class InsertBookDetailsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  authors: string[];

  @IsOptional()
  categories: string[];
}
