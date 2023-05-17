import { Includeable, Order } from "sequelize";
import { Lecture } from "src/modules/lectures/entities/lecture.entity";
import { ScheduleDay } from "src/modules/schedule_days/entities/schedule_day.entity";
import { ScheduleCreationAttributes } from "../interfaces/schedule.interface";

export const scheduleAttributes: (keyof ScheduleCreationAttributes)[] = [
    "schedule_id",
    "room_id",
    "title",
    "is_current",
    "days_count",
    "created_at",
    "updated_at",
];
export const scheduleInclude: Includeable | Includeable[] = [
    {
        model: ScheduleDay,
        attributes: { exclude: ["schedule_id"] },
        include: [
            {
                model: Lecture,
                attributes: { exclude: ["schedule_day_id"] },
            },
        ],
    },
];

export const scheduleOrder: Order = [
    [{ model: ScheduleDay, as: "schedule_days" }, "day", "ASC"],
    [
        { model: ScheduleDay, as: "schedule_days" },
        { model: Lecture, as: "lectures" },
        "start_time",
        "ASC",
    ],
];
