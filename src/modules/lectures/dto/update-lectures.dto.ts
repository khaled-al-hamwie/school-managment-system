import { PickType } from "@nestjs/swagger";
import { DayDto } from "src/modules/schedules/dto/update-schedule.dto";
import { LectureAttributes } from "../interfaces/lecture.interface";

export class UpdateLecturesDto extends PickType(DayDto, ["lectures"]) {
    schedule_day_id: LectureAttributes["schedule_day_id"];
}
// periods and schedule day id
