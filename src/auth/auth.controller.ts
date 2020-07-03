import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(':signin')
  signIn(@Body() userCredentials: UserCredentialsDto) {
    return this.authService.signIn(userCredentials);
  }
  @Post(':signup')
  signup(@Body() userCredentials: UserCredentialsDto) {
    return this.authService.signUp(userCredentials);
  }
}
