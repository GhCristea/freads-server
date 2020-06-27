import { Entity, BaseEntity, Column } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @Column()
  id: number;

  @Column()
  name: string;

  @Column()
  authors: string[];

  @Column()
  categories: string[];
}
