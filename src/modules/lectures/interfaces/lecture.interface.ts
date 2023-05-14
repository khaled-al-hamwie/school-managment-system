import { Optional } from "sequelize";
import { DayType } from "src/core/common/types/day.type";
import { RoomAttributes } from "src/modules/rooms/interfaces/room.interface";
import { ScheduleDayAttributes } from "src/modules/schedule_days/interfaces/schedule_day.interface";
import { ScheduleAttributes } from "src/modules/schedules/interfaces/schedule.interface";
import { TeachAttributes } from "src/modules/teaches/interfaces/teach.interface";

export interface LectureAttributes {
    lecture_id?: number;
    schedule_day_id: ScheduleDayAttributes["schedule_day_id"];
    teach_id?: TeachAttributes["teach_id"];
    start_time: string;
    is_rest?: boolean;
}

export type LectureCreationAttributes = Optional<
    LectureAttributes,
    "lecture_id"
>;
