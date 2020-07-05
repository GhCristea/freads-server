import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  // UseGuards,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { AuthService } from './auth.service';
// import { GetUser } from './user.decorator';
// import { AuthGuard } from '@nestjs/passport';
// import { User } from './user.entity';

@Controller('/account')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  // @UseGuards(AuthGuard())
  async signIn(
    @Body(ValidationPipe) userCredentials: UserCredentialsDto,
  ): Promise<number> {
    return this.authService.signIn(userCredentials);
  }

  @Post('/signup')
  async signup(@Body() userCredentials: UserCredentialsDto): Promise<string> {
    return this.authService.signUp(userCredentials);
  }

  @Get('/myReadingList')
  async getBookList(userId: number): Promise<number[]> {
    return this.authService.getBookList(userId);
  }

  @Patch(':bookId')
  async addBook(
    @Body() userCredentialsDto: UserCredentialsDto,
    @Param('bookId', ParseIntPipe) bookId: number,
  ): Promise<void> {
    return this.authService.addBook(userCredentialsDto, bookId);
  }

  @Patch('/remove/:bookId')
  async removeBook(
    @Body() userCredentialsDto: UserCredentialsDto,
    @Param('bookId', ParseIntPipe) bookId: number,
  ): Promise<void> {
    return this.authService.removeBook(userCredentialsDto, bookId);
  }
}
