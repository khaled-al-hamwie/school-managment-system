import { CreateScheduleDto } from "src/modules/schedules/dto/create-schedule.dto";
import { ScheduleDayAttributes } from "../interfaces/schedule_day.interface";

export class CreateScheduleDayDto {
    schedule_id: ScheduleDayAttributes["schedule_id"];
    days: CreateScheduleDto["days"];
    start_time: ScheduleDayAttributes["start_time"];
    lecture_number: ScheduleDayAttributes["lecture_number"];
    rests: CreateScheduleDto["rests"];
}
