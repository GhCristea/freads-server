import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  Entity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
