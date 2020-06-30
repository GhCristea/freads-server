import { Controller, Post, Body } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign')
  signup(@Body() userCredentials: UserCredentialsDto) {
    return this.authService.signUp(userCredentials);
  }
}
