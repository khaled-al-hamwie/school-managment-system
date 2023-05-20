import { Lecture } from "src/modules/lectures/entities/lecture.entity";
import { ScheduleDay } from "src/modules/schedule_days/entities/schedule_day.entity";
import { Schedule } from "src/modules/schedules/entities/schedule.entity";
import { Subject } from "src/modules/subjects/entities/subject.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";

export const TeachInclude = [
    {
        model: Subject,
        attributes: { exclude: ["subject_id", "semester"] },
    },
    {
        model: Teacher,
        attributes: {
            exclude: [
                "teacher_id",
                "credential_id",
                "middle_name",
                "birth_day",
                "gender",
                "nationality",
                "phone_number",
                "location",
                "salary",
            ],
        },
    },
    {
        model: Lecture,
        attributes: {
            exclude: ["lecture_id", "is_rest", "teach_id"],
        },
        include: [
            {
                model: ScheduleDay,
                attributes: {
                    exclude: [
                        "schedule_day_id",
                        "start_time",
                        "lecture_number",
                    ],
                },
                include: [
                    {
                        model: Schedule,
                        attributes: {
                            exclude: [
                                "schedule_id",
                                "lecture_length",
                                "rest_length",
                                "days_count",
                                "is_current",
                                "created_at",
                                "updated_at",
                            ],
                        },
                    },
                ],
            },
        ],
    },
];
