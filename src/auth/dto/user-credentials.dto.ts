import { IsString, MinLength, IsEmail } from 'class-validator';

export class UserCredentialsDto {
  @IsString()
  @MinLength(5)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
