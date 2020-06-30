import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * @param userCred
   */
  async signUp(userCred: UserCredentialsDto): Promise<void> {
    //
    const { username, email, password } = userCred;

    const user = new User();
    user.name = username;
    user.email = email;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'User details not saved',
        error.code,
      );
    }
  }
}
