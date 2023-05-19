import { Optional } from "sequelize";

export interface RecordAttributes {
    record_id?: number;
    class_id: number;
    student_id: number;
    year: string;
}

export type RecordCreationAttributes = Optional<RecordAttributes, "record_id">;
