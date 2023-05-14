import { Optional } from "sequelize";
import { DayType } from "src/core/common/types/day.type";
import { ScheduleAttributes } from "src/modules/schedules/interfaces/schedule.interface";

export interface ScheduleDayAttributes {
    schedule_day_id?: number;
    schedule_id: ScheduleAttributes["schedule_id"];
    day: DayType;
    start_time: string;
    lecture_number: number;
}

export type ScheduleDayCreationAttributes = Optional<
    ScheduleDayAttributes,
    "schedule_day_id"
>;
