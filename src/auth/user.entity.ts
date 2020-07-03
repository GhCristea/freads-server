import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  Entity
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  //
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  private password: string;

  @Column()
  private salt: string;

  /**
   * User's book list
   */
  @Column('int', { array: true })
  books: number[];

  async generatePassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    const encryptedPassword = await bcrypt.hash(password, this.salt);
    const validated = encryptedPassword == this.password;
    return validated;
  }
}
