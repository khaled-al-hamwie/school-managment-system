import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query } from '@nestjs/common';
import { FindAllBookDto } from './dto/findAll-book.dto';
import { ParseIntPagePipe } from 'src/core/common/pipes/ParseIntPage.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BOOK_TAG, PHONE_TAG, WEB_TAG } from 'src/core/swagger/constants/swagger.tags';
import ManagerGuard from 'src/core/common/guards/manager.guard';
import StudentGuard from 'src/core/common/guards/student.guard';
import TeacherGuard from 'src/core/common/guards/teacher.guard';
import { BookAttributes } from './interfaces/book.interface';

@ApiTags(BOOK_TAG, WEB_TAG, PHONE_TAG)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @ApiBearerAuth("Authorization")
  @UseGuards(ManagerGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }
  @ApiBearerAuth("Authorization")
  @UseGuards(StudentGuard, ManagerGuard, TeacherGuard)
  @Get()
  findAll(
    @Query() query: FindAllBookDto,
    @Query("page", ParseIntPagePipe) page: number
  ) {
    return this.booksService.findAll(query, page);
  }
  @ApiBearerAuth("Authorization")
  @UseGuards(StudentGuard, ManagerGuard, TeacherGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) book_id: BookAttributes["book_id"]) {
    return this.booksService.findOne({ book_id: book_id });
  }

  @ApiBearerAuth("Authorization")
  @UseGuards(ManagerGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) book_id: BookAttributes["book_id"],
    @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+book_id, updateBookDto);
  }

  @ApiBearerAuth("Authorization")
  @UseGuards(ManagerGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) book_id: BookAttributes["book_id"]) {
    return this.booksService.remove(+book_id);
  }
}
