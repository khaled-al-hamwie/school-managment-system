import { Includeable, Order, Sequelize } from "sequelize";
import { Lecture } from "src/modules/lectures/entities/lecture.entity";
import { ScheduleDay } from "src/modules/schedule_days/entities/schedule_day.entity";
import { Subject } from "src/modules/subjects/entities/subject.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";
import { ScheduleCreationAttributes } from "../interfaces/schedule.interface";

export const scheduleAttributes: (keyof ScheduleCreationAttributes)[] = [
    "schedule_id",
    "room_id",
    "title",
    "lecture_length",
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
                attributes: {
                    exclude: ["schedule_day_id"],
                    include: [
                        [
                            Sequelize.fn(
                                "ADDTIME",
                                Sequelize.col(
                                    "schedule_days->lectures.start_time"
                                ),
                                Sequelize.fn(
                                    "IF",
                                    Sequelize.col("is_rest"),
                                    "00:15:00",
                                    "00:45:00"
                                )
                            ),
                            "end_time",
                        ],
                    ],
                },

                include: [
                    {
                        model: Teach,
                        required: false,
                        attributes: { exclude: ["teach_id"] },
                        include: [
                            {
                                model: Teacher,
                                attributes: {
                                    exclude: [
                                        "teacher_id",
                                        "credential_id",
                                        "birth_day",
                                        "nationality",
                                        "phone_number",
                                        "location",
                                        "salary",
                                    ],
                                    include: [
                                        [
                                            Sequelize.literal(
                                                'CONCAT(first_name, " ", last_name)'
                                            ),
                                            "full_name",
                                        ],
                                    ],
                                },
                            },
                            {
                                model: Subject,
                                attributes: {
                                    exclude: ["semester", "subject_id"],
                                },
                            },
                        ],
                    },
                ],
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
