import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Controller('homeworks')
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) {}

  @Post()
  create(@Body() createHomeworkDto: CreateHomeworkDto) {
    return this.homeworksService.create(createHomeworkDto);
  }

  @Get()
  findAll() {
    return this.homeworksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeworkDto: UpdateHomeworkDto) {
    return this.homeworksService.update(+id, updateHomeworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeworksService.remove(+id);
  }
}
