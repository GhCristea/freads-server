import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { JwtService } from '@nestjs/jwt';
// import { User } from './user.entity';

@Injectable()
export class AuthService {
  //

  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository, // private jwtService: JwtService,
  ) {}

  async signUp(userCredentials: UserCredentialsDto): Promise<string> {
    return this.userRepo.signUp(userCredentials);
  }

  async signIn(userCredentials: UserCredentialsDto): Promise<number> {
    const userExists = await this.userRepo.validateUser(userCredentials);
    if (!userExists) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { email } = userCredentials;
    const user = await this.userRepo.findOne({ email });

    return user.id;
  }

  async getBookList(userId: number): Promise<number[]> {
    const user = await this.userRepo.findOne(userId);
    return user.books;
  }

  async addBook(userCred: UserCredentialsDto, bookId: number): Promise<void> {
    return this.userRepo.addBook(userCred, bookId);
  }

  async removeBook(
    userCred: UserCredentialsDto,
    bookId: number,
  ): Promise<void> {
    const userExists = await this.userRepo.validateUser(userCred);
    if (userExists) {
      await this.userRepo.removeBook(userCred, bookId);
    }
  }
}
