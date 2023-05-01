import { Optional } from "sequelize";

export interface TeachAttributes {
    teach_id?: number;
    teacher_id: number;
    subject_id: number;
}

export type TeachCreationAttributes = Optional<TeachAttributes, "teach_id">;
