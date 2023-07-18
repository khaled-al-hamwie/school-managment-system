import { Optional } from "sequelize";

export interface MessageAttributes {
    message_id?: number;
    message: string;
    group_id: number;
    student_id?: number;
    teacher_id?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export type MessageCreationAttributes = Optional<
    MessageAttributes,
    "message_id"
>;
