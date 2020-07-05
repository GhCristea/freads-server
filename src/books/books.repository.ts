/* eslint-disable @typescript-eslint/camelcase */
import { Repository, EntityRepository } from 'typeorm';
import { Book } from './book.entity';
import { BookDetailsDto } from './dto/search-book.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async searchBooks(bookDetailsDto: BookDetailsDto): Promise<Book[]> {
    const { search } = bookDetailsDto;
    const query = this.createQueryBuilder('book');

    if (search) {
      query.andWhere('book.title LIKE :search', {
        search: `%${search}%`,
      });
    }

    try {
      const books = await query.getMany();
      return books;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateRating(rate: number, bookId: number): Promise<number> {
    rate = parseInt(Object.values(rate)[0] as string);
    const book = await this.findOne({ id: bookId });
    const actualRating = book.rating;

    book.rating =
      (book.ratingCount * actualRating + rate) / (book.ratingCount + 1);
    book.ratingCount = book.ratingCount + 1;

    await book.save();
    return book.rating;
  }
}
