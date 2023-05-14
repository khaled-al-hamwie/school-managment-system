import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduleDaysService } from './schedule_days.service';
import { CreateScheduleDayDto } from './dto/create-schedule_day.dto';
import { UpdateScheduleDayDto } from './dto/update-schedule_day.dto';

@Controller('schedule-days')
export class ScheduleDaysController {
  constructor(private readonly scheduleDaysService: ScheduleDaysService) {}

  @Post()
  create(@Body() createScheduleDayDto: CreateScheduleDayDto) {
    return this.scheduleDaysService.create(createScheduleDayDto);
  }

  @Get()
  findAll() {
    return this.scheduleDaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleDaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDayDto: UpdateScheduleDayDto) {
    return this.scheduleDaysService.update(+id, updateScheduleDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleDaysService.remove(+id);
  }
}
