import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
  Post,
  Body,
  Patch,
  Put,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { Book } from './book.entity';
import { BookDetailsDto } from './dto/search-book.dto';
import { InsertBookDetailsDto } from './dto/insert-book-details.dto';
import { Logger } from '@nestjs/common';

@Controller()
export class BooksController {
  //
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/search')
  getBooks(
    @Query(ValidationPipe) bookDetails: BookDetailsDto,
  ): Promise<Book[]> {
    return this.booksService.searchBooks(bookDetails);
  }

  @Get(':id')
  async getBook(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Post('/insert')
  async insertBook(@Body() insertBookDto: InsertBookDetailsDto): Promise<Book> {
    return this.booksService.insertBook(insertBookDto);
  }

  @Patch('/:bookId/rating')
  async updateRating(
    @Body() rating: number,
    @Param('bookId') bookId: number,
  ): Promise<number> {
    const logger = new Logger();
    logger.log('Rating in controller');
    logger.log(rating);
    return this.booksService.updateRating(rating, bookId);
  }
}
