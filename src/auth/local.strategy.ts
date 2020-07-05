import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(userCred: UserCredentialsDto): Promise<User> {
    const user = await this.repository.findOne({ email: userCred.email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
