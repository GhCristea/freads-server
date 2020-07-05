import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configuration/typeormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, BooksModule, TypeOrmModule.forRoot(typeOrmConfig)],
  //controllers: [AppController],
  providers: [],
})
export class AppModule {}
