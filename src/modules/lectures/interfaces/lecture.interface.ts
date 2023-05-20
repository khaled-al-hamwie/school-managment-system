import { Optional } from "sequelize";
import { ScheduleDayAttributes } from "src/modules/schedule_days/interfaces/schedule_day.interface";
import { TeachAttributes } from "src/modules/teaches/interfaces/teach.interface";

export interface LectureAttributes {
    lecture_id?: number;
    schedule_day_id: ScheduleDayAttributes["schedule_day_id"];
    teach_id?: TeachAttributes["teach_id"];
    start_time: string;
    is_rest?: boolean;
    lecture_number?: number;
}

export type LectureCreationAttributes = Optional<
    LectureAttributes,
    "lecture_id"
>;
