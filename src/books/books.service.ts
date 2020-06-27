import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';
import { BookDetailsDto } from './dto/book-details.dto';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}

  async getBooks(bookDetailsDto: BookDetailsDto): Promise<Book[]> {
    return this.bookRepository.getBooks(bookDetailsDto);
  }
}
