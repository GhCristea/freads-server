import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  //

  async signUp(userCred: UserCredentialsDto): Promise<string> {
    const { username, email, pass } = userCred;
    const user = new User();
    user.name = username || null;
    user.email = email;

    const salt = await bcrypt.genSalt();
    user.salt = salt;
    user.password = await bcrypt.hash(pass, salt);

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'User details not saved',
        error.stack,
      );
    }
    return user.email;
  }

  //refference: official NestJS Documentation --> https://docs.nestjs.com/techniques/authentication#login-route
  async validateUser(userCred: UserCredentialsDto): Promise<boolean> {
    const { email, pass } = userCred;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(pass))) {
      return true;
    }
    return false;
  }

  async addBook(userCred: UserCredentialsDto, bookId: number): Promise<void> {
    const userExists = await this.validateUser(userCred);
    if (userExists) {
      const { email } = userCred;
      const user = await this.findOne({ email });
      const booksList = user.books;

      if (user.books === null) {
        user.books = [bookId];
        await user.save();
      } else if (!booksList.includes(bookId)) {
        user.books.push(bookId);
        await user.save();
      }
    }
  }

  async removeBook(userCred: UserCredentialsDto, bookId: number) {
    const { email } = userCred;
    const user = await this.findOne({ email: email });
    const bookIndex = user.books.indexOf(bookId);
    if (bookIndex !== -1) {
      user.books.splice(bookIndex);
      await user.save();
    }
  }
}
