import { Includeable } from "sequelize";
import { Class } from "src/modules/classes/entities/class.entity";
import { Room } from "src/modules/rooms/entities/room.entity";

export const studentInclude: Includeable = {
    model: Room,
    attributes: ["name", "room_id"],
    include: [
        {
            model: Class,
            attributes: ["name", "class_id"],
        },
    ],
};

export const studentIncludeAttribute = [
    "student_id",
    "first_name",
    "last_name",
    "father_name",
    "mother_name",
    "gender",
    "birth_day",
    "phone_number",
    "nationality",
];

export const teacherIncludeAttribute = [
    "teacher_id",
    "first_name",
    "last_name",
    "middle_name",
    "gender",
    "birth_day",
    "phone_number",
    "nationality",
];
