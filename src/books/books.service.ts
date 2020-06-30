import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';
import { BookDetailsDto } from './dto/search-book.dto';
import { Book } from './book.entity';
import { InsertBookDetailsDto } from './dto/insert-book-details.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}

  async getBooks(bookDetailsDto: BookDetailsDto): Promise<Book[]> {
    return this.bookRepository.getBooks(bookDetailsDto);
  }

  async insertBookDetails(insertBookDetails: InsertBookDetailsDto) {
    return this.bookRepository.insertBookDetails(insertBookDetails);
  }
}
