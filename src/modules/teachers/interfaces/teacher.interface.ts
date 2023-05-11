import { Optional } from "sequelize";
import { Gender } from "src/core/common/types/gender.type";
import { CredentialAttributes } from "src/modules/credentials/interfaces/credential.interface";

export interface TeacherAttributes {
    teacher_id?: number;
    credential_id: CredentialAttributes["credential_id"];
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
