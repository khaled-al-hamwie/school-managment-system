import { Includeable } from "sequelize";
import { Class } from "src/modules/classes/entities/class.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";

export const include: Includeable | Includeable[] = [
    {
        model: Class,
    },
    {
        model: Teach,
        include: [
            {
                model: Teacher,
                attributes: { exclude: ["credential_id"] },
            },
        ],
        attributes: { exclude: ["teacher_id", "subject_id"] },
    },
];
