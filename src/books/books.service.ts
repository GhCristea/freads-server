import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';
import { Book } from './book.entity';
import { InsertBookDetailsDto } from './dto/insert-book-details.dto';
import { BookDetailsDto } from './dto/search-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}

  getAllBooks(): Promise<Book[]>{
    const query = this.bookRepository.createQueryBuilder('book');
    return query.getMany();
  }

  async insertBook(insertBookDetails: InsertBookDetailsDto) {
    return this.bookRepository.insertBook(insertBookDetails);
  }

  async getBooks(bookDetails:BookDetailsDto): Promise<Book[]>{
    return this.bookRepository.getBooks(bookDetails);
  }

  async removeBook(id: number): Promise<string>{
    return this.bookRepository.removeBook(id);
  }

  async getBookById(id: number): Promise<Book>{
    return this.bookRepository.findOne(id);
  }
}
