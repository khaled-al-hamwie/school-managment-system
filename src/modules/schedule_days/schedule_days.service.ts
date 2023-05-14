import { Injectable } from '@nestjs/common';
import { CreateScheduleDayDto } from './dto/create-schedule_day.dto';
import { UpdateScheduleDayDto } from './dto/update-schedule_day.dto';

@Injectable()
export class ScheduleDaysService {
  create(createScheduleDayDto: CreateScheduleDayDto) {
    return 'This action adds a new scheduleDay';
  }

  findAll() {
    return `This action returns all scheduleDays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduleDay`;
  }

  update(id: number, updateScheduleDayDto: UpdateScheduleDayDto) {
    return `This action updates a #${id} scheduleDay`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduleDay`;
  }
}
