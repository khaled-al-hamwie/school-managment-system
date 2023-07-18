import { Optional } from "sequelize";

export interface TransactionAttributes {
    transaction_id?: number;
    teacher_id: number;
    student_id: number;
    value: number;
    reason: string;
    created_at?: Date;
}

export type TransactionCreationAttributes = Optional<
    TransactionAttributes,
    "transaction_id"
>;
