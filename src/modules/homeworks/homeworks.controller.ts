import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BOOK_TAG, PHONE_TAG, WEB_TAG } from 'src/core/swagger/constants/swagger.tags';
import TeacherGuard from 'src/core/common/guards/teacher.guard';
import { HomeworkAttributes } from './interfaces/homework.interface';
import StudentGuard from 'src/core/common/guards/student.guard';
import { StudentAttributes } from '../students/interfaces/student.interface';
import { FindAllBookDto } from '../books/dto/findAll-book.dto';
import { FindAllHomeworkDto } from './dto/findAll-homework.dto';
import { ParseIntPagePipe } from 'src/core/common/pipes/ParseIntPage.pipe';

@ApiTags(BOOK_TAG, WEB_TAG, PHONE_TAG)
@Controller('homeworks')
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) { }

  @ApiBearerAuth("Authorization")
  @UseGuards(TeacherGuard)
  @Post()
  create(@Body() createHomeworkDto: CreateHomeworkDto) {
    return this.homeworksService.create(createHomeworkDto);
  }

  @ApiBearerAuth("Authorization")
  @Get()
  findAll(
    @Query() query: FindAllHomeworkDto,
    @Query("page", ParseIntPagePipe) page: number
  ) {
    return this.homeworksService.findAll(query, page);
  }

  @ApiBearerAuth("Authorization")
  @Get(':id')
  findOne(@Param("id", ParseIntPipe) homework_id: HomeworkAttributes['homework_id']) {
    return this.homeworksService.findOne({ homework_id });
  }

  @ApiBearerAuth("Authorization")
  @UseGuards(TeacherGuard)
  @Patch(':id')
  update(@Param("id", ParseIntPipe) homework_id: HomeworkAttributes['homework_id'],
    @Body() updateHomeworkDto: UpdateHomeworkDto) {
    return this.homeworksService.update(homework_id, updateHomeworkDto);
  }

  @ApiBearerAuth("Authorization")
  @UseGuards(TeacherGuard)
  @Delete(':id')
  remove(@Param("id", ParseIntPipe) homework_id: HomeworkAttributes['homework_id']) {
    return this.homeworksService.remove(+homework_id);
  }
  @ApiBearerAuth("Authorizaion")
  @UseGuards(StudentGuard)
  @Get('/student/:id')
  findStudentHomeworks(@Param("id", ParseIntPipe) student_id: StudentAttributes['student_id']) {
    return this.homeworksService.findStudentHomeworks(+student_id);
  }
}
