import { UpdateScheduleDto } from "src/modules/schedules/dto/update-schedule.dto";
import { ScheduleAttributes } from "src/modules/schedules/interfaces/schedule.interface";
import { ScheduleDayAttributes } from "../interfaces/schedule_day.interface";

export class UpdateScheduleDayDto extends UpdateScheduleDto {
    schedule_id: ScheduleDayAttributes["schedule_id"];
    days_count: ScheduleAttributes["days_count"];
}
