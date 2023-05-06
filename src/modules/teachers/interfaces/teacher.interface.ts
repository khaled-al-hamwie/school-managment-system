import { Optional } from "sequelize";
import { Gender } from "src/core/common/types/gender.type";

export interface TeacherAttributes {
    teacher_id?: number;
    credential_id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    birth_day: Date | string;
    gender: Gender;
    nationality?: string;
    phone_number: string;
    location: string;
    salary: number;
}

export type TeacherCreationAttributes = Optional<
    TeacherAttributes,
    "teacher_id"
>;
