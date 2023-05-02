import { Optional } from "sequelize";

export interface SubjectAttributes {
    subject_id?: number;
    class_id: number;
    name: string;
    semester: number;
}

export type SubjectCreationAttributes = Optional<
    SubjectAttributes,
    "subject_id"
>;
