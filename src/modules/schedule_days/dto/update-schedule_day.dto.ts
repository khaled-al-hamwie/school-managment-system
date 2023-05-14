import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDayDto } from './create-schedule_day.dto';

export class UpdateScheduleDayDto extends PartialType(CreateScheduleDayDto) {}
