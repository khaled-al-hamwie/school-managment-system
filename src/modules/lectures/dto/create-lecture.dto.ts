import { LectureAttributes } from "../interfaces/lecture.interface";

export class CreateLectureDto {
    schedule_day_id: LectureAttributes["schedule_day_id"];
    teach_id?: LectureAttributes["teach_id"];
    start_time: LectureAttributes["start_time"];
    is_rest?: LectureAttributes["is_rest"];
    lecture_number?: LectureAttributes["lecture_number"];
}
