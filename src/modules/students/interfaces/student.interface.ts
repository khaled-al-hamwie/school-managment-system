import { Optional } from "sequelize";
import { Gender } from "src/core/common/types/gender.type";

export interface StudentAttributes {
    student_id?: number;
    credential_id: number;
    first_name: string;
    last_name: string;
    father_name: string;
    mother_name: string;
    birth_day: Date | string;
    gender: Gender;
    nationality?: string;
    phone_number: string;
    location: string;
    registration_date?: Date | string;
}

export type StudentCreationAttributes = Optional<
    StudentAttributes,
    "student_id"
>;
