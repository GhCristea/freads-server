import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import {
  InternalServerErrorException,
  Body,
  ValidationPipe
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   */
  async signIn(userCredentials: UserCredentialsDto): Promise<string> {
    const { email, password } = userCredentials;

    const user = (await this.findOne({ email })) || null;

    if (user) {
      await user.validatePassword(password);
    }

    return user.name;
  }

  async signUp(userCred: UserCredentialsDto): Promise<string> {
    //
    const { username, email, password } = userCred;
    const user = new User();

    user.name = username;
    user.email = email;
    user.generatePassword(password);

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'User details not saved',
        error.stack
      );
    }
    return user.name;
  }
}
