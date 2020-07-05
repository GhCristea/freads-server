/* eslint-disable @typescript-eslint/camelcase */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';
import { Book } from './book.entity';
import { BookDetailsDto } from './dto/search-book.dto';
import { InsertBookDetailsDto } from './dto/insert-book-details.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}

  getAllBooks(): Promise<Book[]> {
    const query = this.bookRepository.createQueryBuilder('book');
    return query.getMany();
  }

  async searchBooks(bookDetails: BookDetailsDto): Promise<Book[]> {
    return this.bookRepository.searchBooks(bookDetails);
  }

  async getBookById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ id: id });
  }

  async insertBook(insertBookDetails: InsertBookDetailsDto): Promise<Book> {
    const { title: book_name, authors, categories } = insertBookDetails;

    const book = new Book();
    book.title = book_name;
    book.authors = authors;
    book.categories = categories;

    try {
      await book.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return book;
  }

  async updateRating(rate: number, bookId: number): Promise<number> {
    const logger = new Logger();
    logger.log('rate in the service: ');
    logger.log(rate);
    return this.bookRepository.updateRating(rate, bookId);
  }
}
