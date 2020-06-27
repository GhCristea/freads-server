import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
