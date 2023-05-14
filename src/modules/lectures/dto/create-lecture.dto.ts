import { LectureAttributes } from "../interfaces/lecture.interface";

export class CreateLectureDto {
    schedule_day_id: LectureAttributes["schedule_day_id"];
    teach_id?: LectureAttributes["teach_id"];
    start_time: string;
    is_rest?: boolean;
}
