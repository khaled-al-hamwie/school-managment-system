import { Optional } from "sequelize";

export interface ExamAttributes {
    exam_id?: number;
    class_id: number;
    teach_id: number;
    exam_date: string;
    exam_link: string;
}

export type ExamCreationAttributes = Optional<ExamAttributes, "exam_id">;
