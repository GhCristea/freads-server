import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_name: string;

  @Column("text", {array: true})
  authors: string[];

  @Column("text", {array: true})
  categories: string[];
}
