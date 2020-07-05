import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  Entity,
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

  @Column({ nullable: true })
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  salt: string;

  /**
   * User's book list
   */

  @Column('int', {
    array: true,
    nullable: true,
  })
  books: number[];

  async validatePassword(password: string): Promise<boolean> {
    const encryptedPassword = await bcrypt.hash(password, this.salt);
    const validated = encryptedPassword == this.password;
    return validated;
  }
}
