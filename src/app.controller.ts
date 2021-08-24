import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books/books.service';
import { Book } from './books/book.entity';

@Controller()
export class AppController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAllBooks() {
    return this.bookService.getAllBooks();
  }
}
