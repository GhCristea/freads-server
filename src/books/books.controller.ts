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
} from '@nestjs/common';

import { BooksService } from './books.service';
import { BookSearchDto } from './dto/search-book.dto';
import { BookDetailsDto } from './dto/insert-book-details.dto';

@Controller()
export class BooksController {
  //
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/search')
  getBooks(@Query(ValidationPipe) searchParams: BookSearchDto) {
    return this.booksService.searchBooks(searchParams);
  }

  @Get(':id')
  async getBook(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookById(id);
  }

  @Post('/insert')
  async insertBook(@Body() newBook: BookDetailsDto) {
    return this.booksService.insertBook(newBook);
  }

  @Patch('/:bookId/rating')
  async updateRating(@Body() rating: number, @Param('bookId') bookId: number) {
    return this.booksService.updateRating(rating, bookId);
  }
}
