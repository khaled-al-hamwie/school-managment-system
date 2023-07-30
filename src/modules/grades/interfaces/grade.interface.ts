import { Optional } from "sequelize";

export interface GradeAttributes {
    grade_id?: number;
    record_id: number;
    exam_id: number;
    grade: number;
    checked: boolean;
}

export type GradeCreationAttributes = Optional<GradeAttributes, "grade_id">;
