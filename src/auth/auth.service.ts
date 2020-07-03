import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository
  ) {}

  async signUp(userCredentials: UserCredentialsDto): Promise<string> {
    return this.userRepo.signUp(userCredentials);
  }

  async signIn(userCredentials: UserCredentialsDto): Promise<string> {
    return this.userRepo.signIn(userCredentials);
  }
}
