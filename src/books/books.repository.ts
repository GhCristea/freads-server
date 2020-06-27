import { Repository, EntityRepository } from 'typeorm';
import { Book } from './book.entity';
import { BookDetailsDto } from './dto/book-details.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(bookDetailsDto: BookDetailsDto): Promise<Book[]> {
    const { search } = bookDetailsDto;
    const query = this.createQueryBuilder('book');
    if (search) {
      query.where('book.title LIKE :search OR book.author LIKE :search', {
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
}
