/* eslint-disable @typescript-eslint/camelcase */
import { Repository, EntityRepository } from 'typeorm';
import { Book } from './book.entity';
import { BookDetailsDto } from './dto/search-book.dto';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InsertBookDetailsDto } from './dto/insert-book-details.dto';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  
  //private logger = new Logger();
  
  async insertBook(
    insertBookDetails: InsertBookDetailsDto,
  ): Promise<Book> {
    const { book_name , authors, categories } = insertBookDetails;

    const book = new Book();
    book.book_name = book_name;
    book.authors = authors;
    book.categories = categories;

    try {
      await book.save();
    } catch (error) {
      //this.logger.error(`Book upload failed`, error.stack);
      throw new InternalServerErrorException();
    }

    return book;
  }

  async removeBook(id: number): Promise<string>{
    const book = this.findOne(id);
    try {
      (await book).remove();      
    } catch (error) {
      new NotFoundException(`the book with id: ${id} cannot be found`);
    }
    return `the book with id: ${id} was removed`;
  }

  async getBooks(bookDetailsDto: BookDetailsDto): Promise<Book[]> {
    const { search } = bookDetailsDto;
    const query = this.createQueryBuilder('book');

    if (search) {
      query.where('book.book_name LIKE :search', {
        search: `%${search}%`,
      });
    }

    try {
      const books = await query.getMany();
      return books;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }


}

