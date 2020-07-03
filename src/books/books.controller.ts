import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Query, ValidationPipe, Logger } from '@nestjs/common';
import { BooksService } from './books.service';
// import { BookDetailsDto } from './dto/search-book.dto';
import { Book } from './book.entity';
import { InsertBookDetailsDto } from './dto/insert-book-details.dto';
import { BookDetailsDto } from './dto/search-book.dto';

@Controller('books')
export class BooksController {
  //
  constructor(private booksService: BooksService) {}

  @Post(':insert')
  insertBook(@Body() insertBookDto: InsertBookDetailsDto): Promise<Book> {
    return this.booksService.insertBook(insertBookDto);
  }

  @Get()
  getAllBooks(){
    return this.booksService.getAllBooks();
  }

  @Get(':search')
  getBooks(@Query(ValidationPipe) bookDetails:BookDetailsDto): Promise<Book[]>{
    return this.booksService.getBooks(bookDetails);
  }

  @Delete(':id')
  removeBook(@Param('id', ParseIntPipe) id: number): Promise<string>{
    return this.booksService.removeBook(id);
  }

  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id: number): Promise<Book>{
    return this.booksService.getBookById(id);
  }
}
