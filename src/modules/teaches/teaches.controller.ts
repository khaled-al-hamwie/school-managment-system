import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeachesService } from './teaches.service';
import { CreateTeachDto } from './dto/create-teach.dto';
import { UpdateTeachDto } from './dto/update-teach.dto';

@Controller('teaches')
export class TeachesController {
  constructor(private readonly teachesService: TeachesService) {}

  @Post()
  create(@Body() createTeachDto: CreateTeachDto) {
    return this.teachesService.create(createTeachDto);
  }

  @Get()
  findAll() {
    return this.teachesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeachDto: UpdateTeachDto) {
    return this.teachesService.update(+id, updateTeachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachesService.remove(+id);
  }
}
