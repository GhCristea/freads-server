import { Transform } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class BookDetailsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @Transform((value: string) => value.split(','))
  @IsOptional()
  authors: string[];

  @Transform((value: string) => value.split(','))
  @IsOptional()
  categories: string[];
}
