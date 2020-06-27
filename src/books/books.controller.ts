import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDetailsDto } from './dto/book-details.dto';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(bookDetailsDto: BookDetailsDto): Promise<Book[]> {
    return this.booksService.getBooks(bookDetailsDto);
  }
}
