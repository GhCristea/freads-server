import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { array: true })
  authors: string[];

  @Column('text', { array: true, default: null })
  categories: string[];

  @Column({ type: 'decimal', default: 0.0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  ratingCount: number;
}
