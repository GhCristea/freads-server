/* eslint-disable @typescript-eslint/camelcase */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';
import { Book } from './book.entity';
import { BookSearchDto } from './dto/search-book.dto';
import { BookDetailsDto } from './dto/insert-book-details.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}

  getAllBooks() {
    const query = this.bookRepository.createQueryBuilder('book');
    return query.getMany();
  }

  async searchBooks(searchParams: BookSearchDto) {
    return this.bookRepository.searchBooks(searchParams);
  }

  async getBookById(id: number) {
    return this.bookRepository.findOne({ id: id });
  }

  async insertBook(newBook: BookDetailsDto) {
    const { title, authors, categories } = newBook;

    const book = new Book();
    book.title = title;
    book.authors = authors;
    book.categories = categories;

    try {
      await book.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return book;
  }

  async updateRating(rate: number, bookId: number) {
    return this.bookRepository.updateRating(rate, bookId);
  }
}
