import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDetailsDto } from './dto/search-book.dto';
import { Book } from './book.entity';
import { InsertBookDetailsDto } from './dto/insert-book-details.dto';

@Controller('books')
export class BooksController {
  //
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(bookDetailsDto: BookDetailsDto): Promise<Book[]> {
    return this.booksService.getBooks(bookDetailsDto);
  }

  @Post()
  insertBook(@Body() insertBookDto: InsertBookDetailsDto): Promise<Book> {
    return this.booksService.insertBookDetails(insertBookDto);
  }
}
